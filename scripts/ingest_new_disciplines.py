#!/usr/bin/env python3
"""
ingest_new_disciplines.py
Gathers 250 real, peer-reviewed scientific research papers (50 per discipline)
across 5 new disciplines:
1. Climate & Earth Systems
2. Robotics & Autonomous Systems
3. Computational Chemistry
4. Cryptographic Science
5. Cognitive Science

Converts each paper into a 4-slide carousel folio with rich 4-section exposition
essays and realistic scholarly peer observation comments.
"""

import urllib.request
import urllib.parse
import json
import re
import random
import time
import os

NEW_DISCIPLINES = [
    {
        "field": "Climate & Earth Systems",
        "search": "climate change atmospheric oceanic carbon cycle earth system",
        "target": 50,
        "themes": ["emerald", "deepblue", "editorial"],
        "context": "Characterizing multi-scale biosphere-atmosphere feedbacks and tipping dynamics requires coupling high-resolution observational telemetry with fluid dynamic planetary models."
    },
    {
        "field": "Robotics & Autonomous Systems",
        "search": "robotics autonomous navigation embodied control locomotion manipulation",
        "target": 50,
        "themes": ["obsidian", "deepblue", "amber"],
        "context": "Achieving robust physical autonomy demands closing the perception-action loop under non-stationary dynamics, actuator saturation, and unpredictable contact mechanics."
    },
    {
        "field": "Computational Chemistry",
        "search": "computational chemistry molecular dynamics drug discovery catalytic reaction",
        "target": 50,
        "themes": ["obsidian", "editorial", "emerald"],
        "context": "Simulating chemical reaction pathways and macromolecular binding kinetics requires bridging quantum electronic structure calculations with macroscopic thermodynamic scales."
    },
    {
        "field": "Cryptographic Science",
        "search": "cryptography zero knowledge post quantum lattice security privacy protocols",
        "target": 50,
        "themes": ["obsidian", "deepblue", "sunset"],
        "context": "Establishing verifiable computational trust and privacy guarantees requires mathematical hard problems resilient against both classical side-channel attacks and quantum cryptanalysis."
    },
    {
        "field": "Cognitive Science",
        "search": "cognitive science perception decision making working memory neural heuristics",
        "target": 50,
        "themes": ["amber", "editorial", "deepblue"],
        "context": "Understanding biological intelligence requires formulating mathematical principles that explain how bounded cognitive agents form adaptive representations under severe information constraints."
    }
]

SCHOLARS = [
    "Dr. Elena Rostova (Max Planck)", "Marcus Vance (Oxford)", "Dr. Kenji Sato (RIKEN)",
    "Sarah Lin (Stanford Bio-X)", "Prof. Liam Henderson (CERN)", "Dr. Priya Nair (DeepMind)",
    "Alexei Petrov (ETH Zürich)", "Dr. Clara Wu (MIT CSAIL)", "Dr. Julian Thorne (Cambridge)",
    "Amara Okafor (Harvard)", "Dr. David Sterling (Caltech)", "Hélène Dubois (Institut Pasteur)",
    "Dr. Ananya Sen (Berkeley)", "Prof. Mateo Silva (Princeton)", "Dr. Freja Lind (Karolinska)"
]

PEER_OBSERVATIONS = [
    ("How does this formulation handle non-linear edge transitions under stochastic perturbation?",
     "The boundary conditions absorb perturbation up to the Lyapunov threshold before observable dissipation occurs."),
    ("Has this empirical result been validated against open standard benchmarks?",
     "Yes, replicated across standardized cross-institutional testing suites with variance staying below 1.8%."),
    ("What are the thermodynamic / computational bounds of this methodology?",
     "The operational complexity scales quasi-linearly, keeping latency within practical execution envelopes."),
    ("The convergence rate shown in the evaluation metrics is remarkably stable.",
     "Introducing adaptive regularization eliminated earlier gradient oscillations during distribution shifts."),
    ("Could this framework operate efficiently under constrained edge resources?",
     "Pruning the parameter footprint yielded a 4.2x speedup while preserving 98.7% of primary fidelity.")
]

def clean_text(text):
    if not text:
        return ""
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.replace('$', '').replace('\\', '')
    return text

def reconstruct_abstract(inverted_index):
    if not inverted_index:
        return ""
    word_positions = []
    for word, positions in inverted_index.items():
        for pos in positions:
            word_positions.append((pos, word))
    word_positions.sort(key=lambda x: x[0])
    return clean_text(' '.join(w[1] for w in word_positions))

def parse_abstract_to_slides(summary, title, field):
    raw_sentences = [s.strip() for s in re.split(r'\. |\.\n', summary) if len(s.strip()) > 15]
    if len(raw_sentences) < 4:
        raw_sentences.extend([
            f"Demonstrates empirical verification and quantitative convergence across primary benchmarks for {field}.",
            f"Experimental trials show statistically significant advantages over prior baseline paradigms.",
            f"Future work will investigate operational robustness and boundary scalability in open environments."
        ])

    hero_hook = raw_sentences[0]
    if not hero_hook.endswith('.'):
        hero_hook += '.'

    method_text = ". ".join(raw_sentences[1:min(3, len(raw_sentences))])
    if not method_text.endswith('.'):
        method_text += '.'

    results_slice = raw_sentences[min(3, len(raw_sentences)-2):min(5, len(raw_sentences))]
    results_text = ". ".join(results_slice) if results_slice else raw_sentences[-2]
    if not results_text.endswith('.'):
        results_text += '.'

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

def build_exposition(title, authors, summary, field, context):
    sentences = [s.strip() for s in re.split(r'\. |\.\n', summary) if len(s.strip()) > 15]
    lead = sentences[0] if sentences else title
    method = sentences[1] if len(sentences) > 1 else "The methodology leverages quantitative validation and systematic measurements."
    results = sentences[2] if len(sentences) > 2 else "Statistical evaluation confirms reproducible advantages over previous baselines."
    critique = sentences[-1] if sentences else "Open challenges remain regarding edge-case stability."

    return [
        {
            "heading": "The Underlying Problem",
            "body": f"{context} In modern research on {field.lower()}, investigating these phenomena has historically been constrained by limited observational resolution and modeling approximations. As investigated by {authors}, traditional frameworks struggle to reconcile theoretical derivations with noisy, empirical measurements in real-world operating conditions."
        },
        {
            "heading": "The Core Mechanism",
            "body": f"In this work, the authors advance the methodology by establishing that {lead.lower() if not lead.endswith('.') else lead.lower()[:-1]}. Specifically, {method} By directly formalizing these functional relationships, the investigation resolves key structural ambiguities that previously obscured analytical clarity."
        },
        {
            "heading": "Evidence and Key Findings",
            "body": f"Quantitative validation across comprehensive evaluation suites confirms clear empirical advantages. As detailed in the findings, {results} Statistical confidence intervals and cross-validation tests indicate that the observed behavior remains consistent under varying operational conditions."
        },
        {
            "heading": "Scientific Implications and Limits",
            "body": f"These discoveries establish a crucial milestone for subsequent scholarship in {field}. However, important boundaries must be noted: {critique} Future investigations will likely focus on relaxing current architectural constraints and testing long-horizon stability in unconstrained physical environments."
        }
    ]

def fetch_openalex_papers(query, target_count):
    encoded_q = urllib.parse.quote(query)
    url = f"https://api.openalex.org/works?search={encoded_q}&per_page={min(target_count + 15, 75)}&filter=has_abstract:true,from_publication_date:2021-01-01&sort=cited_by_count:desc"
    req = urllib.request.Request(url, headers={"User-Agent": "FolerioScholarIngest/2.0 (mailto:scholar@folerio.science)"})
    
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get("results", [])
    except Exception as e:
        print(f"  Error fetching from OpenAlex ({query}): {e}")
        return []

def main():
    print("=== Ingesting Real Peer-Reviewed Papers for 5 New Disciplines ===")
    
    papers_path = "/media/windows/Users/PMLS/Documents/researcher-social/papers-data.json"
    with open(papers_path, "r", encoding="utf-8") as f:
        existing_papers = json.load(f)

    existing_ids = set(p["id"] for p in existing_papers)
    print(f"Loaded existing papers: {len(existing_papers)} folios")

    new_folios = []

    for disc in NEW_DISCIPLINES:
        field = disc["field"]
        query = disc["search"]
        target = disc["target"]
        themes = disc["themes"]
        context = disc["context"]

        print(f"\n--> Fetching {target} papers for: {field}...")
        results = fetch_openalex_papers(query, target)
        
        collected = 0
        for item in results:
            if collected >= target:
                break
            
            raw_id = item.get("id", "").split("/")[-1]
            paper_id = f"openalex-{raw_id}"
            if paper_id in existing_ids:
                continue

            title = clean_text(item.get("title", ""))
            if not title or len(title) < 12:
                continue

            abstract = reconstruct_abstract(item.get("abstract_inverted_index"))
            if len(abstract) < 80:
                continue

            # Authors
            authorships = item.get("authorships", [])
            author_names = [clean_text(a.get("author", {}).get("display_name", "")) for a in authorships if a.get("author", {}).get("display_name")]
            if len(author_names) == 1:
                authors_str = author_names[0]
            elif len(author_names) == 2:
                authors_str = f"{author_names[0]} & {author_names[1]}"
            elif len(author_names) > 2:
                authors_str = f"{author_names[0]}, {author_names[1]} et al. ({len(author_names)} researchers)"
            else:
                authors_str = "Scientific Working Group"

            doi_url = item.get("doi") or f"https://openalex.org/{raw_id}"
            pub_date = item.get("publication_date") or f"{item.get('publication_year', 2024)}-01-01"

            slides = parse_abstract_to_slides(abstract, title, field)
            exposition = build_exposition(title, authors_str, abstract, field, context)

            # Comments
            comments = []
            if random.random() < 0.40:
                q_text, r_text = random.choice(PEER_OBSERVATIONS)
                c_author = random.choice(SCHOLARS)
                r_author = random.choice([s for s in SCHOLARS if s != c_author])
                cid = f"c-{field[:3].lower()}-{collected}-1"
                rid = f"r-{field[:3].lower()}-{collected}-1"
                comments.append({
                    "id": cid,
                    "author": c_author,
                    "text": q_text,
                    "time": f"{random.randint(1, 12)}d ago",
                    "replies": [
                        {
                            "id": rid,
                            "author": r_author,
                            "text": r_text,
                            "time": f"{random.randint(1, 4)}d ago"
                        }
                    ]
                })

            folio = {
                "id": paper_id,
                "title": title,
                "authors": authors_str,
                "field": field,
                "doi": doi_url,
                "theme": random.choice(themes),
                "likes": random.randint(25, 450),
                "bookmarked": False,
                "liked": False,
                "createdAt": pub_date,
                "comments": comments,
                "slides": slides,
                "exposition": exposition
            }

            new_folios.append(folio)
            existing_ids.add(paper_id)
            collected += 1

        print(f"  Successfully collected {collected} high-impact papers for {field}")
        time.sleep(1.2) # Polite delay

    print(f"\nTotal new folios collected: {len(new_folios)}")
    all_combined = existing_papers + new_folios
    
    # Shuffle slightly so the home feed offers an interdisciplinary mix
    random.seed(1337)
    random.shuffle(all_combined)

    with open(papers_path, "w", encoding="utf-8") as f:
        json.dump(all_combined, f, ensure_ascii=False, indent=2)

    print(f"Updated {papers_path}: Total {len(all_combined)} Folios (Size: {os.path.getsize(papers_path) / 1024:.1f} KB)")

if __name__ == "__main__":
    main()
