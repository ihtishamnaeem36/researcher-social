package com.folerio.app;

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final int PERMISSION_REQ_CODE = 4412;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        checkAndRequestStoragePermissions();
        setupNativeBridge();
        handleDeepLink(getIntent());
    }

    @Override
    protected void onNewIntent(android.content.Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleDeepLink(intent);
    }

    private void handleDeepLink(android.content.Intent intent) {
        if (intent != null && intent.getData() != null) {
            final Uri data = intent.getData();
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WebView webView = getBridge() != null ? getBridge().getWebView() : null;
                    if (webView != null) {
                        webView.loadUrl(data.toString());
                    }
                }
            });
        }
    }

    private void checkAndRequestStoragePermissions() {
        List<String> neededPermissions = new ArrayList<>();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) != PackageManager.PERMISSION_GRANTED) {
                neededPermissions.add(Manifest.permission.READ_MEDIA_IMAGES);
            }
        } else {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                neededPermissions.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            }
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                neededPermissions.add(Manifest.permission.READ_EXTERNAL_STORAGE);
            }
        }

        if (!neededPermissions.isEmpty()) {
            ActivityCompat.requestPermissions(this, neededPermissions.toArray(new String[0]), PERMISSION_REQ_CODE);
        }
    }

    private void setupNativeBridge() {
        try {
            WebView webView = getBridge() != null ? getBridge().getWebView() : null;
            if (webView != null) {
                // Remove "; wv" to allow Google OAuth inside webview without 403 disallowed_useragent
                String ua = webView.getSettings().getUserAgentString();
                if (ua != null && ua.contains("; wv")) {
                    webView.getSettings().setUserAgentString(ua.replace("; wv", ""));
                }
                webView.getSettings().setDomStorageEnabled(true);
                webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
                webView.getSettings().setSupportMultipleWindows(true);

                webView.addJavascriptInterface(new FolerioNativeBridge(), "FolerioNative");
                webView.setDownloadListener(new DownloadListener() {
                    @Override
                    public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
                        if (url != null && url.startsWith("data:image/")) {
                            saveBase64ToMediaStore(url, "folerio-slide-" + System.currentTimeMillis() + ".png");
                        }
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public class FolerioNativeBridge {
        @JavascriptInterface
        public void saveImageToGallery(final String base64Data, final String filename) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    saveBase64ToMediaStore(base64Data, filename);
                }
            });
        }

        @JavascriptInterface
        public void openExternalUrl(final String url) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        android.content.Intent intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(intent);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        }

        @JavascriptInterface
        public void requestPermissions() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    checkAndRequestStoragePermissions();
                }
            });
        }

        @JavascriptInterface
        public boolean isNative() {
            return true;
        }
    }

    private void saveBase64ToMediaStore(String dataUrl, String filename) {
        try {
            if (dataUrl == null || dataUrl.isEmpty()) return;
            String base64 = dataUrl;
            if (base64.contains(",")) {
                base64 = base64.substring(base64.indexOf(",") + 1);
            }
            byte[] decodedBytes = Base64.decode(base64, Base64.DEFAULT);
            Bitmap bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
            if (bitmap == null) {
                Toast.makeText(this, "Could not process screenshot", Toast.LENGTH_SHORT).show();
                return;
            }

            String cleanName = (filename != null && !filename.trim().isEmpty()) ? filename : ("folerio-" + System.currentTimeMillis() + ".png");
            if (!cleanName.endsWith(".png")) cleanName += ".png";

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentResolver resolver = getContentResolver();
                ContentValues contentValues = new ContentValues();
                contentValues.put(MediaStore.Images.Media.DISPLAY_NAME, cleanName);
                contentValues.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
                contentValues.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/Folerio");
                contentValues.put(MediaStore.Images.Media.IS_PENDING, 1);

                Uri imageUri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues);
                if (imageUri != null) {
                    try (OutputStream out = resolver.openOutputStream(imageUri)) {
                        bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
                    }
                    contentValues.clear();
                    contentValues.put(MediaStore.Images.Media.IS_PENDING, 0);
                    resolver.update(imageUri, contentValues, null, null);

                    Toast.makeText(this, "📸 Saved to Photos (Pictures/Folerio)", Toast.LENGTH_SHORT).show();
                }
            } else {
                File picturesDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "Folerio");
                if (!picturesDir.exists()) {
                    picturesDir.mkdirs();
                }
                File file = new File(picturesDir, cleanName);
                try (FileOutputStream fos = new FileOutputStream(file)) {
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
                    fos.flush();
                }
                MediaScannerConnection.scanFile(this, new String[]{file.getAbsolutePath()}, new String[]{"image/png"}, null);
                Toast.makeText(this, "📸 Saved to Photos (Pictures/Folerio)", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Error saving image: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }
}
