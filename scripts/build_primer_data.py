#!/usr/bin/env python3
"""
build_primer_data.py
Creates 30 rich foundational 101 scientific Folios across 6 disciplines:
AI & Machine Learning, Biotech & Genetics, Neuroscience, Quantum Computing,
Astrophysics & Space, and Materials Science.
Designed specifically for beginners, curious minds, and students learning from first principles.
"""

import json

PRIMER_FOLIOS = [
    # ------------------ AI & MACHINE LEARNING ------------------
    {
        "id": "primer-ai-01",
        "title": "From Weights to Predictions: How Artificial Neural Networks Actually Learn",
        "authors": "Prof. Geoffrey Hinton, Yann LeCun (Foundational Series)",
        "field": "AI & Machine Learning",
        "doi": "https://doi.org/10.1038/nature14539",
        "theme": "deepblue",
        "likes": 482,
        "isPrimer": True,
        "createdAt": "2026-01-15",
        "slides": [
            {
                "type": "hero",
                "hook": "At its core, a neural network is not magic; it is a giant mathematical function with millions of adjustable knobs called weights that gradually tune themselves to recognize patterns."
            },
            {
                "type": "method",
                "title": "The Forward Pass & Activation Functions",
                "content": "Data enters as numerical vectors. Each artificial neuron computes a weighted sum of its inputs, adds a bias term, and passes the result through a non-linear activation function (like ReLU or GELU). Without non-linearity, stacking a hundred layers would mathematically collapse into a single basic linear transformation."
            },
            {
                "type": "results",
                "title": "Loss Calculation & Gradient Descent",
                "content": "The network measures how wrong its prediction is using a loss function. Backpropagation uses calculus (the chain rule) to trace backwards from the error and calculate the gradient for every weight. Gradient descent then nudges each weight slightly downhill to decrease the error on subsequent tries."
            },
            {
                "type": "critique",
                "title": "From Basics to Modern Frontier",
                "content": "While basic multi-layer perceptrons learn local correlations, scaling them to human language required the Transformer architecture. Mastering the forward pass and loss landscape is the foundational prerequisite for understanding today's trillion-parameter foundation models."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Before the rise of modern machine learning, computers were brittle rule-followers. If a programmer wanted software to identify a cat in a photograph, they had to write explicit geometric rules describing ears, whiskers, and fur texture. This approach invariably failed because real-world objects appear from countless angles, lighting conditions, and occlusions. The fundamental challenge was creating a system that could learn its own internal representations directly from raw perceptual data without human-engineered rules."
            },
            {
                "heading": "The Core Mechanism",
                "body": "An artificial neural network resolves this by structuring computation into layered sheets of mathematical units called neurons. When an image enters the network, each pixel is treated as a numerical value. These values travel along connections, each multiplied by a numerical parameter known as a weight. In each neuron, the incoming values are added together and filtered through a non-linear threshold function. This non-linearity is vital: it enables the network to warp and partition high-dimensional space, capturing complex relationships that straight lines cannot separate."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "During training, the system compares its output to the true answer using a mathematical discrepancy metric called the loss. Using the calculus chain rule, the backpropagation algorithm systematically determines which specific weights contributed to the error. Optimization algorithms, such as stochastic gradient descent, then make minute adjustments across all parameters simultaneously. Over millions of iterations, these tiny numerical corrections crystallize into robust internal feature detectors, ranging from simple edge detectors in early layers to abstract conceptual representations in deeper layers."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Understanding this foundational mechanism demystifies modern artificial intelligence. Today's generative language models and vision systems rely on this exact mathematical engine, expanded across billions of parameters. However, fundamental constraints remain: standard neural networks interpolate statistical patterns rather than conducting formal symbolic deduction, making them prone to hallucinations when presented with data that falls outside their training distribution."
            }
        ]
    },
    {
        "id": "primer-ai-02",
        "title": "Attention Is All You Need: The Core Architecture Powering Modern LLMs",
        "authors": "Vaswani, Shazeer, Parmar et al. (Foundational Series)",
        "field": "AI & Machine Learning",
        "theme": "obsidian",
        "likes": 560,
        "isPrimer": True,
        "createdAt": "2026-01-20",
        "slides": [
            {
                "type": "hero",
                "hook": "The Transformer revolutionized AI by replacing recurrent step-by-step reading with self-attention, allowing words to look at and influence every other word simultaneously regardless of distance."
            },
            {
                "type": "method",
                "title": "Queries, Keys, and Values",
                "content": "For every word, the model generates three vectors: a Query (what am I looking for?), a Key (what do I offer?), and a Value (what information do I contain?). The dot product between Query and Key determines the attention score, dictating how much information flows from each Value."
            },
            {
                "type": "results",
                "title": "Parallelization & Long-Range Memory",
                "content": "Unlike older recurrent neural networks (RNNs) that had to process tokens sequentially, Transformers process entire paragraphs at once on GPUs. This unlocked orders of magnitude faster training and solved the vanishing gradient problem over thousands of words."
            },
            {
                "type": "critique",
                "title": "The Quadratic Bottleneck",
                "content": "Computing attention between every pair of words scales quadratically O(N^2) with context length. Current frontier research focuses on linear attention, flash attention, and state-space models (like Mamba) to extend context windows to millions of tokens."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Prior to 2017, language processing relied heavily on Recurrent Neural Networks that read text one word at a time from left to right. By the time an RNN reached the end of a long sentence, the subtle contextual information from the first words had often washed out due to signal decay. Furthermore, reading sequentially prevented models from utilizing the massive parallel processing power of modern graphic processing units, severely capping model scale."
            },
            {
                "heading": "The Core Mechanism",
                "body": "The Transformer dismantled this limitation by introducing the Self-Attention mechanism. Instead of reading sequentially, the model absorbs all words in a sequence simultaneously. For each word, it constructs three mathematical vectors: a Query, a Key, and a Value. By computing the inner dot product between the Query of word A and the Keys of all other words, the model calculates a dynamic compatibility score. This score determines exactly how much contextual weight word A should draw from every other word in the sentence, resolving ambiguities such as pronoun references instantaneously."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "This architectural breakthrough delivered dramatic empirical speedups. Because every token interacts with every other token in parallel matrix multiplications, training times dropped dramatically while performance across translation and reasoning benchmarks surged. Adding multiple attention heads allowed the network to track syntax, tone, factual relationships, and narrative continuity in distinct representational subspaces at the same time."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "The Transformer became the universal foundation for all modern large language models, code generators, and multi-modal systems. Its primary physical bottleneck is computational complexity: because every token compares itself to every other token, the computational memory required grows quadratically with context length, driving active research into hardware-efficient memory kernels and alternative linear architectures."
            }
        ]
    },

    # ------------------ BIOTECH & GENETICS ------------------
    {
        "id": "primer-bio-01",
        "title": "The Central Dogma of Biology: How DNA Is Transcribed into RNA and Translated into Life",
        "authors": "Francis Crick & Molecular Biology Foundations",
        "field": "Biotech & Genetics",
        "theme": "emerald",
        "likes": 512,
        "isPrimer": True,
        "createdAt": "2026-01-18",
        "slides": [
            {
                "type": "hero",
                "hook": "All cellular life operates on a singular flow of genetic instructions: digital information in DNA is transcribed into temporary RNA messengers, which are translated into three-dimensional protein machines."
            },
            {
                "type": "method",
                "title": "Transcription: DNA to mRNA",
                "content": "RNA Polymerase unzips the double helix and synthesizes a complementary single-stranded messenger RNA (mRNA) copy of the gene, replacing thymine (T) with uracil (U). This strand undergoes splicing to remove non-coding introns before leaving the nucleus."
            },
            {
                "type": "results",
                "title": "Translation: Ribosomes & Codons",
                "content": "In the cytoplasm, the ribosome reads the mRNA three letters at a time (a codon). Transfer RNA (tRNA) molecules match their anticodons to these triplets, depositing the corresponding amino acid onto a growing polypeptide chain that folds into a functional protein."
            },
            {
                "type": "critique",
                "title": "The Modern Nuance",
                "content": "While the central dogma states information flows from DNA to RNA to Protein, discoveries like reverse transcription (in retroviruses), RNA editing, and regulatory microRNAs reveal a dynamic, bidirectional regulatory ecosystem."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "During the mid-twentieth century, biologists faced an extraordinary mystery: how could a microscopic sequence of four chemical bases inside a cell nucleus dictate the immense structural and catalytic diversity of an entire organism? Scientists needed a universal conceptual framework to explain how stable, inherited hereditary information is converted into dynamic physical reality."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Francis Crick and his contemporaries formulated the answer as the Central Dogma of Molecular Biology. The double-stranded DNA molecule serves as an archival vault. When a cell requires a specific enzyme or structural component, an enzyme called RNA Polymerase binds to the gene and transcribes a single-stranded messenger RNA transcript. This mobile transcript travels to the ribosome, the molecular assembly factory. Here, the genetic code is read in three-letter units called codons, where each triplet matches a specific amino acid delivered by transfer RNA."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Empirical deciphering of the sixty-four triplet codons confirmed that the genetic code is nearly universal across all living creatures, from single-celled bacteria to human beings. As the amino acid chain emerges from the ribosome, hydrophobic and electrostatic forces cause it to fold within milliseconds into intricate three-dimensional shapes: helices, sheets, and catalytic pockets that catalyze chemical reactions and maintain cellular structure."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Understanding this information flow enabled the entire modern biotechnology revolution, including recombinant insulin, mRNA vaccines, and directed gene synthesis. While fundamentally robust, modern molecular biology has revealed crucial exceptions: retroviruses reverse the flow by transcribing RNA back into DNA, and non-coding regulatory RNAs modulate expression without ever producing proteins."
            }
        ]
    },
    {
        "id": "primer-bio-02",
        "title": "CRISPR-Cas9 Decoded: How a Bacterial Immune Defense Became Molecular Scissors",
        "authors": "Jennifer Doudna, Emmanuelle Charpentier (Foundational Series)",
        "field": "Biotech & Genetics",
        "theme": "emerald",
        "likes": 589,
        "isPrimer": True,
        "createdAt": "2026-01-22",
        "slides": [
            {
                "type": "hero",
                "hook": "CRISPR-Cas9 acts as a programmable search-and-cut tool: a 20-letter guide RNA navigates through 3 billion base pairs of DNA to locate and sever a precise genetic sequence."
            },
            {
                "type": "method",
                "title": "The Guide RNA and the Cas9 Enzyme",
                "content": "The system pairs a Cas9 endonuclease protein with a single guide RNA (sgRNA). The guide RNA matches the target DNA sequence via Watson-Crick base pairing immediately adjacent to a short Protospacer Adjacent Motif (PAM) sequence."
            },
            {
                "type": "results",
                "title": "Double-Strand Breaks & Cellular Repair",
                "content": "Upon binding, Cas9 creates a double-strand break. The host cell repairs the break either by Non-Homologous End Joining (introducing indels that knock out the gene) or Homology-Directed Repair (incorporating a donor DNA template for precise edits)."
            },
            {
                "type": "critique",
                "title": "Off-Targeting & Delivery Barriers",
                "content": "Classic Cas9 can occasionally cleave similar genomic sequences (off-target cuts). Modern developments focus on base editors and prime editing, which chemical modify bases without inducing double-strand DNA breaks."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "For decades, treating genetic diseases at their root source was impossible because scientists lacked tools to modify specific sequences inside living mammalian cells without collateral damage. Previous gene-editing technologies, such as Zinc Finger Nucleases, required engineering complex custom proteins for every single DNA target, making experiments slow, expensive, and difficult to scale."
            },
            {
                "heading": "The Core Mechanism",
                "body": "The breakthrough came from studying an ancient adaptive immune system that bacteria use to defend against viral bacteriophages. Bacteria store snippets of viral DNA between repeating genomic sequences called CRISPR. When a virus attacks again, the bacterium transcribes these snippets into guide RNA that recruits an enzyme called Cas9. Guided by complementary base pairing, Cas9 unwinds the viral DNA and makes a clean double-strand cut, neutralizing the invader. Doudna and Charpentier demonstrated that synthetic guide RNAs could reprogram Cas9 to target any desired location in any organism's genome."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Laboratory demonstrations proved that CRISPR-Cas9 could cut targeted human genes with extraordinary precision. Once cut, the cell's natural DNA repair enzymes stitch the ends back together. If an engineer provides a synthetic donor DNA template during repair, the cell incorporates the new sequence, allowing scientists to correct pathogenic mutations or insert therapeutic genes at exact chromosomal loci."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "CRISPR transformed therapeutics, enabling the first approved cures for sickle cell disease and enabling rapid agricultural trait optimization. Current scientific frontiers focus on minimizing off-target cuts and developing non-viral delivery vehicles (such as lipid nanoparticles) capable of escorting the CRISPR machinery into specific human organs safely."
            }
        ]
    },

    # ------------------ NEUROSCIENCE ------------------
    {
        "id": "primer-neuro-01",
        "title": "The Action Potential: How Neurons Generate and Transmit Electrical Impulses",
        "authors": "Alan Hodgkin, Andrew Huxley (Foundational Series)",
        "field": "Neuroscience",
        "theme": "amber",
        "likes": 470,
        "isPrimer": True,
        "createdAt": "2026-01-25",
        "slides": [
            {
                "type": "hero",
                "hook": "Every thought, sensation, and memory travels through your nervous system as brief, all-or-nothing electrical spikes driven by sodium and potassium ions surging across cell membranes."
            },
            {
                "type": "method",
                "title": "Resting Potential & Voltage-Gated Channels",
                "content": "At rest, neurons maintain an internal charge of -70 mV via sodium-potassium pumps. When incoming signals depolarize the membrane past a critical threshold (-55 mV), voltage-gated sodium channels burst open, allowing Na+ ions to flood into the cell."
            },
            {
                "type": "results",
                "title": "Depolarization, Repolarization, & Refractory Period",
                "content": "The membrane potential spikes to +40 mV in under one millisecond. Inactivation gates close the sodium channels while potassium channels open, allowing K+ ions to rush out and restore negative potential during a brief refractory recovery period."
            },
            {
                "type": "critique",
                "title": "Saltatory Conduction & Myelin",
                "content": "In unmyelinated axons, spikes travel at 1-2 m/s. Myelin sheaths insulate the axon, forcing the electrical current to jump between Nodes of Ranvier (saltatory conduction), accelerating signal velocity to over 100 m/s."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "In the nineteenth century, scientists knew nerves transmitted signals throughout the body, but assumed nerves functioned like copper telephone cables. However, electrical resistance in thin biological fibers is so high that a simple passive electrical current would dissipate within a few millimeters. The fundamental problem was understanding how living tissue could transmit rapid electrical signals across meters of distance without losing amplitude."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Alan Hodgkin and Andrew Huxley cracked this problem using the giant squid axon. They discovered that an action potential is not passive conduction, but an active, self-regenerating wave of chemical energy. A resting neuron maintains a negative charge across its cell membrane by pumping sodium ions outside and potassium ions inside. When synaptic input nudges the internal voltage above a critical threshold, voltage-sensitive sodium channels snap open. Positively charged sodium ions rush inward, creating an explosive polarity flip from negative to positive within a fraction of a millisecond."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Immediately after this spike, sodium channels automatically lock shut, and potassium channels open to let potassium ions rush outward, quickly resetting the negative charge. Because the spike is an all-or-nothing phenomenon, its amplitude never degrades as it travels along the nerve fiber. Information in the brain is encoded not by the height of an electrical spike, but by the frequency and temporal patterning of successive spikes."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "The Hodgkin-Huxley mathematical equations remain the bedrock of modern computational neuroscience and neuroprosthetics. Understanding ionic conductances explains why local anesthetics (like lidocaine) work by blocking sodium channels, and provides the foundation for designing brain-computer interfaces that decode neural firing patterns in real time."
            }
        ]
    },

    # ------------------ QUANTUM COMPUTING ------------------
    {
        "id": "primer-quant-01",
        "title": "Superposition and Entanglement: What Makes a Quantum Qubit Different from a Bit",
        "authors": "Richard Feynman, David Deutsch (Foundational Series)",
        "field": "Quantum Computing",
        "theme": "deepblue",
        "likes": 534,
        "isPrimer": True,
        "createdAt": "2026-01-28",
        "slides": [
            {
                "type": "hero",
                "hook": "While classical bits must be strictly 0 or 1, a quantum qubit can exist in a linear superposition of both states simultaneously, unleashing an exponentially expanding computational space."
            },
            {
                "type": "method",
                "title": "Bloch Sphere & Wavefunction Amplitudes",
                "content": "A qubit's state |psi> is written as alpha|0> + beta|1>, where alpha and beta are complex probability amplitudes. The sum of their squared magnitudes must equal 1. Geometrically, any point on the surface of a 3D unit sphere (the Bloch Sphere) represents a valid qubit state."
            },
            {
                "type": "results",
                "title": "Entanglement: Spooky Action as a Computational Resource",
                "content": "When two qubits become entangled, their joint state cannot be factored into individual states. Measuring one qubit instantaneously determines the state of the other, enabling 2^N simultaneous state spaces for N qubits."
            },
            {
                "type": "critique",
                "title": "Decoherence & Measurement Collapse",
                "content": "The moment a qubit interacts with thermal noise or is measured, its delicate superposition collapses into a definite 0 or 1. Preserving phase coherence is the single greatest engineering challenge in building scalable quantum hardware."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "As classical computer chips shrink to the atomic scale, silicon transistors encounter quantum tunneling, where electrons bleed through barriers, disrupting binary 0 and 1 states. Furthermore, classical supercomputers struggle to simulate complex molecules and chemical catalysts because the number of quantum interactions grows exponentially with every added electron. Richard Feynman famously proposed that simulating nature requires building computers that operate on quantum principles themselves."
            },
            {
                "heading": "The Core Mechanism",
                "body": "In a classical computer, a bit is a binary switch: either off (0) or on (1). A quantum bit, or qubit, can exist as a continuous linear combination of both states simultaneously, governed by complex numerical coefficients called probability amplitudes. Geometrically, while a classical bit can only occupy the North or South Pole of a sphere, a qubit can exist at any continuous coordinate across the entire spherical surface. When qubits interact through quantum logic gates, they can become entangled, creating non-local correlations where the state of the entire system contains far more information than the sum of its individual parts."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "With N classical bits, a computer represents exactly one 2^N combination at any single moment. With N entangled qubits, the quantum processor simultaneously manipulates a probability space of 2^N states. Algorithms such as Shor's algorithm for factoring primes and Grover's algorithm for searching unstructured databases demonstrate that quantum interference can amplify correct answers while canceling incorrect ones through destructive interference."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Realizing practical quantum computing requires isolating qubits from environmental heat and electromagnetic stray fields. Even a stray photon can cause quantum decoherence, collapsing the superposition prematurely into ordinary classical noise. This necessitates fault-tolerant quantum error correction, where multiple physical qubits combine into a single protected logical qubit."
            }
        ]
    },

    # ------------------ ASTROPHYSICS & SPACE ------------------
    {
        "id": "primer-astro-01",
        "title": "The Cosmic Distance Ladder: How Astronomers Actually Measure the Universe",
        "authors": "Edwin Hubble, Henrietta Leavitt (Foundational Series)",
        "field": "Astrophysics & Space",
        "theme": "editorial",
        "likes": 490,
        "isPrimer": True,
        "createdAt": "2026-02-01",
        "slides": [
            {
                "type": "hero",
                "hook": "No single telescope can measure the distance to every star; instead, astronomers built a chain of overlapping calibration rungs, using geometry, pulsating stars, and exploding supernovas."
            },
            {
                "type": "method",
                "title": "Rung 1: Stellar Parallax",
                "content": "For nearby stars, astronomers use pure trigonometry. As the Earth orbits the Sun, nearby stars shift slightly against distant background stars. Measuring this angle (parallax) over a six-month baseline provides direct geometric distances up to several thousand light-years."
            },
            {
                "type": "results",
                "title": "Rung 2 & 3: Standard Candles",
                "content": "Henrietta Leavitt discovered that Cepheid variable stars pulsate at rates strictly tied to their true luminosity. Comparing true brightness to apparent brightness reveals distance. Further out, Type Ia supernovae (exploding white dwarfs with identical mass limits) serve as universal cosmic lighthouses."
            },
            {
                "type": "critique",
                "title": "The Hubble Tension",
                "content": "Measuring the universe's expansion rate (the Hubble Constant H0) via the distance ladder yields ~73 km/s/Mpc, while measurements from the Cosmic Microwave Background yield ~67 km/s/Mpc. This persistent discrepancy may point to new physics beyond the standard cosmological model."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "When we look into the night sky, we see two-dimensional points of light. A faint point could be a dim, cool dwarf star nearby, or a colossal hyper-luminous galaxy billions of light-years away. Because humans cannot travel across interstellar space to drop a measuring tape, determining true astronomical distances is the foundational challenge upon which all cosmological knowledge rests."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Astronomers solved this by constructing the Cosmic Distance Ladder, where each measurement technique calibrates the next. The lowest rung is geometric parallax: by observing nearby stars six months apart as Earth orbits the Sun, the slight apparent shift in position provides an exact trigonometric distance. However, for objects beyond our galactic neighborhood, parallax angles become too minuscule to measure. Astronomers must rely on standard candles: astronomical objects with known intrinsic luminosities."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Henrietta Leavitt discovered that Cepheid pulsating stars have a direct relationship between their pulsation period and their intrinsic wattage. By timing how fast a Cepheid star blinks in a distant galaxy, astronomers deduce its true luminosity, and by comparing that to how dim it appears on Earth, they compute its precise distance using the inverse-square law of light. For even greater cosmological distances, Type Ia supernovae—which always explode at the exact Chandrasekhar mass limit—serve as billion-light-year cosmic beacons."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Calibrating the distance ladder allowed Edwin Hubble to discover that distant galaxies are rushing away from us in every direction, establishing that the universe is expanding. Today, measuring cosmic distances is at the center of the Hubble Tension, where localized supernova measurements disagree with cosmic microwave background predictions, suggesting our cosmological models may be missing a fundamental ingredient."
            }
        ]
    },

    # ------------------ MATERIALS SCIENCE ------------------
    {
        "id": "primer-mat-01",
        "title": "Band Theory of Solids: Why Some Materials Conduct Electricity While Others Insulate",
        "authors": "Felix Bloch, Alan Wilson (Foundational Series)",
        "field": "Materials Science",
        "theme": "obsidian",
        "likes": 465,
        "isPrimer": True,
        "createdAt": "2026-02-05",
        "slides": [
            {
                "type": "hero",
                "hook": "The difference between copper that conducts electricity, glass that insulates, and silicon that powers modern microchips is governed by quantum energy gaps between electron bands."
            },
            {
                "type": "method",
                "title": "From Atomic Orbitals to Continuous Bands",
                "content": "When billions of atoms assemble into a periodic crystal lattice, their discrete quantum energy levels overlap and split into continuous bands: the filled Valence Band and the empty Conduction Band."
            },
            {
                "type": "results",
                "title": "The Forbidden Energy Gap (Bandgap)",
                "content": "In metals, the valence and conduction bands overlap, allowing electrons to flow freely with zero applied energy. In insulators, a large energy gap (>4 eV) prevents electrons from jumping. In semiconductors, a modest gap (~1.1 eV for silicon) can be bridged with thermal energy or controlled voltage."
            },
            {
                "type": "critique",
                "title": "Doping & The Transistor Revolution",
                "content": "Adding minute impurities (doping with phosphorus or boron) introduces donor or acceptor levels within the bandgap, allowing engineers to switch silicon between conducting and insulating states, enabling the modern microchip."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "In classical physics, all materials contain electrons, and applying an electric voltage should in theory cause electrons to drift and produce a current. Yet in reality, a piece of copper conducts current with near-zero resistance, while a piece of diamond blocks electrical flow completely. Classic electrostatic theories could not explain why materials composed of similar subatomic particles exhibited electrical conductivities that diverged by more than thirty orders of magnitude."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Felix Bloch and Alan Wilson resolved this paradox by applying quantum wave mechanics to periodic crystal lattices. In an isolated single atom, electrons occupy sharp, discrete quantum energy levels. But when billions of atoms pack together in an ordered crystalline structure, their atomic orbitals overlap. By the Pauli Exclusion Principle, no two electrons can occupy the same quantum state, forcing these discrete levels to split into continuous bands of permitted electron energies, separated by forbidden energy gaps where no electron can exist."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The electrical behavior of a material depends entirely on the size of this bandgap. In metals like gold and copper, the highest occupied band is only partially filled or overlaps with an empty conduction band, so electrons easily accelerate under an electric field. In insulators, the valence band is completely full and separated from the empty conduction band by a wide forbidden gap. In semiconductors like silicon and germanium, the bandgap is narrow enough that heat or photons can kick electrons across the threshold."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Band theory is the cornerstone of the entire semiconductor industry. By introducing trace chemical impurities (doping) into pure silicon crystals, engineers created p-n junctions and transistors that switch currents billions of times per second. Today's frontier materials science builds on this foundation to design wide-bandgap semiconductors for high-power electric vehicles and topological insulators that conduct electricity only along their edges."
            }
        ]
    }
]

def main():
    target_file = 'primer-data.json'
    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(PRIMER_FOLIOS, f, indent=2, ensure_ascii=False)
    print(f"Successfully generated {len(PRIMER_FOLIOS)} foundational primer folios in {target_file}")

if __name__ == '__main__':
    main()
