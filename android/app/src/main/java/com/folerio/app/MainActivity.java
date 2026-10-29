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
                    if (webView == null) return;

                    // If incoming intent has OAuth tokens or query/fragment from Supabase
                    String fullStr = data.toString();
                    String fragment = data.getFragment();
                    String query = data.getQuery();
                    if ((fragment == null || fragment.isEmpty()) && fullStr.contains("#")) {
                        fragment = fullStr.substring(fullStr.indexOf('#') + 1);
                    }
                    if ((query == null || query.isEmpty()) && fullStr.contains("?")) {
                        int qStart = fullStr.indexOf('?');
                        int qEnd = fullStr.contains("#") ? fullStr.indexOf('#') : fullStr.length();
                        if (qEnd > qStart) {
                            query = fullStr.substring(qStart + 1, qEnd);
                        }
                    }

                    if (fragment != null && !fragment.isEmpty()) {
                        webView.evaluateJavascript("window.location.hash = '" + fragment.replace("'", "\\'") + "'; if (window.SupabaseBridge) { SupabaseBridge.handleAuthRedirect(); }", null);
                    } else if (query != null && (query.contains("access_token") || query.contains("code=") || query.contains("error="))) {
                        webView.evaluateJavascript("if (window.SupabaseBridge) { SupabaseBridge.handleAuthQuery('" + query.replace("'", "\\'") + "'); }", null);
                    }
                    // NEVER call webView.loadUrl() with remote or localhost:3000 URLs, keep app 100% on local offline assets
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
                webView.getSettings().setSupportMultipleWindows(false);

                // Note: Do NOT call webView.setWebViewClient() here!
                // Capacitor uses its own BridgeWebViewClient to intercept https://localhost/ and serve
                // bundled offline assets from the APK. Overriding it breaks offline standalone mode!

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

    private android.app.Dialog mAuthDialog = null;

    private void openInAppAuthDialog(final String authUrl) {
        try {
            if (mAuthDialog != null && mAuthDialog.isShowing()) {
                mAuthDialog.dismiss();
            }

            final android.app.Dialog dialog = new android.app.Dialog(this, android.R.style.Theme_DeviceDefault_NoActionBar);
            mAuthDialog = dialog;

            android.widget.LinearLayout root = new android.widget.LinearLayout(this);
            root.setOrientation(android.widget.LinearLayout.VERTICAL);
            root.setBackgroundColor(0xFF0F172A);

            // Header layout
            android.widget.RelativeLayout header = new android.widget.RelativeLayout(this);
            header.setPadding(36, 28, 36, 28);
            header.setBackgroundColor(0xFF1E293B);

            android.widget.TextView title = new android.widget.TextView(this);
            title.setText("Scholar Account Sign-In");
            title.setTextColor(0xFFF8FAFC);
            title.setTextSize(16);
            title.setTypeface(null, android.graphics.Typeface.BOLD);
            android.widget.RelativeLayout.LayoutParams titleLp = new android.widget.RelativeLayout.LayoutParams(
                android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
                android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT
            );
            titleLp.addRule(android.widget.RelativeLayout.ALIGN_PARENT_START);
            titleLp.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
            header.addView(title, titleLp);

            android.widget.TextView closeBtn = new android.widget.TextView(this);
            closeBtn.setText("✕ Cancel");
            closeBtn.setTextColor(0xFF38BDF8);
            closeBtn.setTextSize(14);
            closeBtn.setPadding(16, 12, 16, 12);
            android.widget.RelativeLayout.LayoutParams closeLp = new android.widget.RelativeLayout.LayoutParams(
                android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
                android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT
            );
            closeLp.addRule(android.widget.RelativeLayout.ALIGN_PARENT_END);
            closeLp.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
            closeBtn.setOnClickListener(new android.view.View.OnClickListener() {
                @Override
                public void onClick(android.view.View v) {
                    dialog.dismiss();
                }
            });
            header.addView(closeBtn, closeLp);
            root.addView(header);

            // In-App WebView
            final WebView authWebView = new WebView(this);
            authWebView.setLayoutParams(new android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT
            ));

            android.webkit.WebSettings settings = authWebView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setSupportMultipleWindows(false);
            settings.setJavaScriptCanOpenWindowsAutomatically(true);

            // Remove "; wv" from User Agent to avoid Google disallowed_useragent
            String defaultUa = settings.getUserAgentString();
            if (defaultUa != null) {
                settings.setUserAgentString(defaultUa.replace("; wv", ""));
            }

            android.webkit.CookieManager cookieManager = android.webkit.CookieManager.getInstance();
            cookieManager.setAcceptCookie(true);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                cookieManager.setAcceptThirdPartyCookies(authWebView, true);
            }

            authWebView.setWebViewClient(new android.webkit.WebViewClient() {
                private boolean handleUrlIntercept(String url) {
                    if (url == null || url.isEmpty()) return false;

                    // Intercept any tokens or redirects
                    boolean hasTokens = url.contains("access_token=") || url.contains("refresh_token=") || url.contains("code=") || url.contains("error_description=");
                    boolean isLocalhost = url.startsWith("http://localhost") || url.startsWith("https://localhost") || url.startsWith("http://127.0.0.1");
                    boolean isFolerioScheme = url.startsWith("folerio://");
                    boolean isGithubPages = url.startsWith("https://ihtishamnaeem36.github.io/researcher-social");

                    if (hasTokens || isLocalhost || isFolerioScheme || isGithubPages) {
                        try {
                            String fragment = null;
                            String query = null;
                            if (url.contains("#")) {
                                fragment = url.substring(url.indexOf('#') + 1);
                            }
                            if (url.contains("?")) {
                                int qStart = url.indexOf('?');
                                int qEnd = url.contains("#") ? url.indexOf('#') : url.length();
                                if (qEnd > qStart) {
                                    query = url.substring(qStart + 1, qEnd);
                                }
                            }

                            final String finalFrag = fragment;
                            final String finalQuery = query;

                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    WebView mainWeb = getBridge() != null ? getBridge().getWebView() : null;
                                    if (mainWeb != null) {
                                        if (finalFrag != null && !finalFrag.isEmpty()) {
                                            mainWeb.evaluateJavascript("window.location.hash = '" + finalFrag.replace("'", "\\'") + "'; if (window.SupabaseBridge) { SupabaseBridge.handleAuthRedirect(); }", null);
                                        } else if (finalQuery != null && !finalQuery.isEmpty()) {
                                            mainWeb.evaluateJavascript("if (window.SupabaseBridge) { SupabaseBridge.handleAuthQuery('" + finalQuery.replace("'", "\\'") + "'); }", null);
                                        }
                                    }
                                }
                            });
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }

                        // Close dialog cleanly without network error
                        dialog.dismiss();
                        return true;
                    }
                    return false;
                }

                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    if (handleUrlIntercept(url)) return true;
                    return super.shouldOverrideUrlLoading(view, url);
                }

                @android.annotation.TargetApi(Build.VERSION_CODES.N)
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, android.webkit.WebResourceRequest request) {
                    if (request != null && request.getUrl() != null) {
                        if (handleUrlIntercept(request.getUrl().toString())) return true;
                    }
                    return super.shouldOverrideUrlLoading(view, request);
                }

                @Override
                public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                    if (failingUrl != null && (failingUrl.contains("localhost") || failingUrl.contains("access_token"))) {
                        handleUrlIntercept(failingUrl);
                        return;
                    }
                    super.onReceivedError(view, errorCode, description, failingUrl);
                }
            });

            root.addView(authWebView);
            dialog.setContentView(root);
            dialog.show();

            authWebView.loadUrl(authUrl);
        } catch (Exception e) {
            e.printStackTrace();
            openExternalUrl(authUrl);
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
        public void openInAppAuth(final String url) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    openInAppAuthDialog(url);
                }
            });
        }

        @JavascriptInterface
        public void openExternalUrl(final String url) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        String cleanUrl = url;
                        if (cleanUrl != null) {
                            if (cleanUrl.startsWith("http://arxiv.org/")) {
                                cleanUrl = cleanUrl.replace("http://arxiv.org/", "https://arxiv.org/");
                            } else if (cleanUrl.startsWith("http://doi.org/")) {
                                cleanUrl = cleanUrl.replace("http://doi.org/", "https://doi.org/");
                            }
                        }
                        android.content.Intent intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, Uri.parse(cleanUrl));
                        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
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
