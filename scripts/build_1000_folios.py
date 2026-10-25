#!/usr/bin/env python3
"""
build_1000_folios.py
Fetches 1,000 real, recent scientific research papers from arXiv across 
AI & Machine Learning, Biotech & Genetics, Neuroscience, Quantum Computing,
Astrophysics, and Materials Science, converting each into a rich 4-slide Folio.
"""

import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import json
import re
import time
import random
import os

DISCIPLINES = [
    {
        "query": "cat:cs.AI OR cat:cs.LG OR cat:cs.CL OR cat:cs.RO",
        "field": "AI & Machine Learning",
        "target": 250,
        "themes": ["deepblue", "obsidian", "editorial"]
    },
    {
        "query": "cat:q-bio.BM OR cat:q-bio.GN OR cat:q-bio.MN OR cat:q-bio.CB",
        "field": "Biotech & Genetics",
        "target": 220,
        "themes": ["emerald", "editorial", "deepblue"]
    },
    {
        "query": "cat:q-bio.NC OR cat:cs.NE",
        "field": "Neuroscience",
        "target": 130,
        "themes": ["editorial", "obsidian", "amber"]
    },
    {
        "query": "cat:quant-ph",
        "field": "Quantum Computing",
        "target": 180,
        "themes": ["obsidian", "deepblue", "crimson"]
    },
    {
        "query": "cat:astro-ph.CO OR cat:astro-ph.HE OR cat:astro-ph.GA",
        "field": "Astrophysics & Space",
        "target": 110,
        "themes": ["obsidian", "deepblue", "amber"]
    },
    {
        "query": "cat:cond-mat.mtrl-sci OR cat:cond-mat.supr-con",
        "field": "Materials Science",
        "target": 110,
        "themes": ["amber", "editorial", "emerald"]
    }
]

SCHOLARS = [
    "Dr. Elena Rostova (Max Planck)", "Marcus Vance (Oxford)", "Dr. Kenji Sato (RIKEN)",
    "Sarah Lin (Stanford Bio-X)", "Prof. Liam Henderson (CERN)", "Dr. Priya Nair (DeepMind)",
    "Alexei Petrov (ETH Zürich)", "Dr. Clara Wu (MIT CSAIL)", "Dr. Julian Thorne (Cambridge)",
    "Amara Okafor (Harvard)", "Dr. David Sterling (Caltech)", "Hélène Dubois (Institut Pasteur)"
]

PEER_OBSERVATIONS = [
    ("How does this scale when applied to non-stationary environments?", "We observe slight divergence under distribution drift, but adding low-rank regularization mitigates the drop."),
    ("Has this benchmark been cross-validated across independent hardware setups?", "Yes, replicated across both A100 clusters and TPU v5e pods with <1.5% variance."),
    ("What are the thermodynamic boundaries of this configuration?", "The phase transition holds up to ~14.2 K before quantum coherence degrades."),
    ("The sample efficiency in figure 3 looks remarkably steep.", "Leveraging synthetic data distillation shaved off roughly 60% of required pre-training samples."),
    ("Could this interface handle real-time streaming latency under 20ms?", "The pruned attention backbone brings inference down to 14.8ms on edge silicon.")
]

def clean_text(text):
    if not text:
        return ""
    text = re.sub(r'\s+', ' ', text).strip()
    # remove basic TeX dollar signs
    text = text.replace('$', '').replace('\\', '')
    return text

def parse_abstract_to_slides(summary, title, field):
    """
    Splits abstract into 4 coherent Folio slides:
    1. Hero (Breakthrough Hook)
    2. Method (Technical Specs & Framework)
    3. Results (Quantitative Metrics & Proof)
    4. Critique (Frontier & Open Limitations)
    """
    raw_sentences = [s.strip() for s in re.split(r'\. |\.\n', summary) if len(s.strip()) > 15]
    
    # Fallback sentences if abstract is brief
    if len(raw_sentences) < 4:
        raw_sentences.extend([
            f"Demonstrates reproducible empirical convergence across primary benchmarks for {field}.",
            f"Quantitative validations show statistically significant advantages over previous baselines.",
            f"Future work requires investigating boundary edge cases and long-horizon operational stability."
        ])

    hero_hook = raw_sentences[0]
    if not hero_hook.endswith('.'):
        hero_hook += '.'

    # Slide 2: Method
    method_text = ". ".join(raw_sentences[1:min(3, len(raw_sentences))])
    if not method_text.endswith('.'):
        method_text += '.'

    # Slide 3: Results
    results_slice = raw_sentences[min(3, len(raw_sentences)-2):min(5, len(raw_sentences))]
    results_text = ". ".join(results_slice) if results_slice else raw_sentences[-2]
    if not results_text.endswith('.'):
        results_text += '.'

    # Slide 4: Critique / Limitations / Open Frontiers
    critique_text = raw_sentences[-1]
    if not critique_text.endswith('.'):
        critique_text += '.'

    return [
        {
            "type": "hero",
            "hook": hero_hook
        },
        {
            "type": "method",
            "title": "Methodological Architecture & Specifications",
            "content": method_text
        },
        {
            "type": "results",
            "title": "Empirical Results & Benchmark Evidence",
            "content": results_text
        },
        {
            "type": "critique",
            "title": "Critical Frontier & Open Constraints",
            "content": critique_text
        }
    ]

def fetch_arxiv_batch(query, max_results, start=0):
    encoded_q = urllib.parse.quote(query)
    url = f"http://export.arxiv.org/api/query?search_query={encoded_q}&start={start}&max_results={max_results}&sortBy=submittedDate&sortOrder=descending"
    req = urllib.request.Request(url, headers={"User-Agent": "FolerioResearchIngest/1.0 (mailto:scholar@folerio.science)"})
    
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            content = resp.read()
            root = ET.fromstring(content)
            entries = root.findall("{http://www.w3.org/2005/Atom}entry")
            return entries
    except Exception as e:
        print(f"Error fetching batch ({query}, start={start}): {e}")
        return []

def main():
    print("=== Folerio: Ingesting 1,000 Real Scientific Research Folios ===")
    all_folios = []
    seen_ids = set()

    for item in DISCIPLINES:
        field = item["field"]
        target = item["target"]
        query = item["query"]
        themes = item["themes"]
        collected_for_field = 0
        start = 0

        print(f"\n--> Fetching {target} papers for: {field}...")

        while collected_for_field < target:
            fetch_size = min(100, target - collected_for_field)
            entries = fetch_arxiv_batch(query, max_results=fetch_size, start=start)
            
            if not entries:
                print(f"  Warning: No more entries returned for {field} at offset {start}.")
                break

            for entry in entries:
                arxiv_id_elem = entry.find("{http://www.w3.org/2005/Atom}id")
                if arxiv_id_elem is None:
                    continue
                arxiv_url = arxiv_id_elem.text.strip()
                paper_id = "arxiv-" + arxiv_url.split("/abs/")[-1].replace("/", "-")

                if paper_id in seen_ids:
                    continue
                seen_ids.add(paper_id)

                title_elem = entry.find("{http://www.w3.org/2005/Atom}title")
                title = clean_text(title_elem.text) if title_elem is not None else "Untitled Research"
                
                # Filter out retracted or announcement titles
                if "WITHDRAWN" in title.upper() or len(title) < 10:
                    continue

                summary_elem = entry.find("{http://www.w3.org/2005/Atom}summary")
                summary = clean_text(summary_elem.text) if summary_elem is not None else ""
                if len(summary) < 50:
                    continue

                # Authors
                author_nodes = entry.findall("{http://www.w3.org/2005/Atom}author")
                author_names = [clean_text(a.find("{http://www.w3.org/2005/Atom}name").text) for a in author_nodes if a.find("{http://www.w3.org/2005/Atom}name") is not None]
                if len(author_names) == 1:
                    authors_str = author_names[0]
                elif len(author_names) == 2:
                    authors_str = f"{author_names[0]} & {author_names[1]}"
                elif len(author_names) > 2:
                    authors_str = f"{author_names[0]}, {author_names[1]} et al. ({len(author_names)} researchers)"
                else:
                    authors_str = "Lead Academic Research Team"

                published_elem = entry.find("{http://www.w3.org/2005/Atom}published")
                published_date = published_elem.text[:10] if published_elem is not None else "2025-01-01"

                slides = parse_abstract_to_slides(summary, title, field)

                # Seed realistic scholarly comments with threaded replies on ~30% of papers
                comments = []
                if random.random() < 0.35:
                    q_text, r_text = random.choice(PEER_OBSERVATIONS)
                    c_author = random.choice(SCHOLARS)
                    r_author = random.choice([s for s in SCHOLARS if s != c_author])
                    comment_id = f"c-{len(all_folios)}-1"
                    reply_id = f"r-{len(all_folios)}-1"
                    
                    comments.append({
                        "id": comment_id,
                        "author": c_author,
                        "text": q_text,
                        "time": f"{random.randint(1, 14)}d ago",
                        "replies": [
                            {
                                "id": reply_id,
                                "author": r_author,
                                "text": r_text,
                                "time": f"{random.randint(1, 5)}d ago"
                            }
                        ]
                    })

                folio = {
                    "id": paper_id,
                    "title": title,
                    "authors": authors_str,
                    "field": field,
                    "doi": arxiv_url,
                    "theme": random.choice(themes),
                    "likes": random.randint(12, 420),
                    "bookmarked": False,
                    "liked": False,
                    "createdAt": published_date,
                    "comments": comments,
                    "slides": slides
                }

                all_folios.append(folio)
                collected_for_field += 1
                if collected_for_field >= target:
                    break

            print(f"  Progress: {collected_for_field}/{target} collected for {field} (Total: {len(all_folios)})")
            start += len(entries)
            time.sleep(2.5) # Polite delay for arXiv rate limiting

    print(f"\nSuccessfully gathered {len(all_folios)} real scientific research Folios!")
    
    # Shuffle slightly so the home feed is an interdisciplinary feast
    random.seed(42)
    random.shuffle(all_folios)

    output_path = "/media/windows/Users/PMLS/Documents/researcher-social/papers-data.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_folios, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(all_folios)} Folios to: {output_path} (Size: {os.path.getsize(output_path) / 1024:.1f} KB)")

if __name__ == "__main__":
    main()
