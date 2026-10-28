"""
Script to add comprehensive Foundational Primers for Life Sciences (Modules 3.1 to 3.7)
and foundational masterclasses for other disciplines to primer-data.json.
"""
import json
import os

with open('primer-data.json', 'r', encoding='utf-8') as f:
    primers = json.load(f)

existing_ids = {p['id'] for p in primers}

new_foundations = [
    # -------------------------------------------------------------
    # 3.1 Origin of Life (Abiogenesis, Miller-Urey, Hydrothermal Vents, RNA World)
    # -------------------------------------------------------------
    {
        "id": "primer-bio-origin-01",
        "title": "Abiogenesis and the Origin of Life: Primordial Soup, Hydrothermal Vents, and the RNA World",
        "authors": "Alexander Oparin, Stanley Miller, Harold Urey, Walter Gilbert (Foundational Series)",
        "field": "Biotech & Genetics",
        "doi": "https://doi.org/10.1126/science.117.3046.528",
        "theme": "ocean",
        "likes": 528,
        "isPrimer": True,
        "createdAt": "2026-03-01",
        "slides": [
            {
                "type": "hero",
                "hook": "Abiogenesis is the natural transition from non-living organic chemistry to self-sustaining metabolic replicators, bridging prebiotic synthesis and the dawn of cellular life on early Earth."
            },
            {
                "type": "method",
                "title": "Miller-Urey Spark Simulation & Hydrothermal Vents",
                "content": "Simulates early reducing atmospheres (CH4, NH3, H2O, H2) with electric discharges, generating racemic amino acids. Alternatively, deep-sea alkaline hydrothermal vents provide continuous mineral proton gradients (Fe-S catalysed) driving primitive chemiosmotic phosphorylation."
            },
            {
                "type": "results",
                "title": "RNA World Hypothesis & Catalytic Ribozymes",
                "content": "Resolves the molecular chicken-and-egg dilemma: RNA acts simultaneously as an informational genetic polymer (genotype) and a catalytic enzyme (phenotype via ribozymes), capable of self-cleavage and template-directed polymerization."
            },
            {
                "type": "critique",
                "title": "Homochirality & Protocell Membrane Enclosure",
                "content": "Prebiotic synthesis yields racemic (50:50 L/D) enantiomers, yet biological polymers require homochiral purity. Modern research investigates how amphiphilic fatty acid vesicles encapsulated fragile RNA replicators without disrupting ion permeability."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "All contemporary terrestrial life depends on an interdependent molecular loop: DNA stores genetic information, but cannot replicate without enzymatic protein catalysts, while proteins possess exquisite catalytic capacity, but cannot reproduce without DNA templates. Explaining how this reciprocal architecture arose spontaneously on the prebiotic Earth 3.8 to 4.1 billion years ago constitutes the fundamental question of abiogenesis."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Alexander Oparin and J.B.S. Haldane proposed the Primordial Soup hypothesis, positing that Earth's early reducing atmosphere, energized by solar ultraviolet radiation and electrical storms, accumulated simple organic monomers in warm oceans. In 1953, Stanley Miller and Harold Urey confirmed this experimentally, synthesizing glycine, alanine, and aspartic acid. Concurrently, Günter Wächtershäuser and Michael Russell established that deep-sea alkaline hydrothermal vents provide constant chemical disequilibria, where inorganic iron-sulfur micropores catalyze metabolic redox reactions powered by natural proton gradients."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The discovery of catalytic RNA ribozymes by Thomas Cech and Sidney Altman validated Walter Gilbert's RNA World Hypothesis. RNA can simultaneously store nucleotide sequences and fold into tertiary catalytic conformations capable of peptide bond formation inside the ribosome. Furthermore, analysis of the Murchison meteorite confirmed that carbonaceous chondrites deliver extraterrestrial extraterrestrial amino acids and nucleobases (panspermia delivery), proving organic synthesis is pervasive across the cosmos."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Deconstructing abiogenesis bridges geochemistry, thermodynamics, and molecular evolution. While individual chemical reactions—from cyanide polymerization to lipid vesicle self-assembly—are verified in vitro, reconstructing the exact thermodynamic cascade that transitioned prebiotic geochemical fluxes into the first living LUCA (Last Universal Common Ancestor) remains an active empirical frontier in synthetic biology."
            }
        ]
    },

    # -------------------------------------------------------------
    # 3.1 Evolution of Life (Natural Selection, Modern Synthesis, Transitional Fossils, Geological Timeline)
    # -------------------------------------------------------------
    {
        "id": "primer-bio-evol-01",
        "title": "The Evolutionary Continuum: Natural Selection, Transitional Paleontology, and Earth's Geological Epochs",
        "authors": "Charles Darwin, Alfred Russel Wallace, Stephen Jay Gould (Foundational Series)",
        "field": "Ecology & Evolutionary Biology",
        "doi": "https://doi.org/10.1038/nature.darwin1859",
        "theme": "forest",
        "likes": 594,
        "isPrimer": True,
        "createdAt": "2026-03-01",
        "slides": [
            {
                "type": "hero",
                "hook": "Evolution by natural selection is the single organizing law of the biological sciences: heritable variation coupled with differential reproductive success shapes all organisms across deep geological time."
            },
            {
                "type": "method",
                "title": "Descent with Modification & Radiometric Chronology",
                "content": "Integrates Darwinian differential survival with population genetics (allelic mutation and recombination) and absolute geochronology using uranium-lead and potassium-argon radioisotopic decay in sedimentary and volcanic strata."
            },
            {
                "type": "results",
                "title": "Transitional Morphologies & Chronostratigraphic Horizons",
                "content": "Uncovers definitive anatomical transitions in the fossil record (e.g., Archaeopteryx spanning theropods and avians; Tiktaalik bridging sarcopterygian fish and tetrapods) across the Precambrian, Paleozoic, Mesozoic, and Cenozoic eras."
            },
            {
                "type": "critique",
                "title": "Gradualism vs. Punctuated Equilibrium",
                "content": "Eldredge and Gould challenged strict phyletic gradualism, demonstrating that species often experience prolonged morphological stasis punctuated by rapid allopatric cladogenesis during environmental disruptions."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Before Charles Darwin and Alfred Russel Wallace, the biological world was viewed as an immutable catalog of static species created de novo. Naturalists struggled to explain homologous skeletal structures across wildly divergent species (such as the pentadactyl limb shared by bats, whales, and humans), the presence of non-functional vestigial organs, and the sequential layering of increasingly complex organisms in stratigraphic rock formations."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Darwin formulated three foundational postulates: 1) Individuals within a population exhibit heritable phenotypic variations; 2) Organisms produce more offspring than environmental carrying capacity can support, creating a struggle for existence; 3) Individuals possessing phenotypic traits that confer superior environmental adaptation have higher reproductive fitness, passing those traits to progeny. Over deep time, this descent with modification drives morphological divergence and speciation."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The fossil record provides an unbroken geological timeline: the Precambrian (prokaryotes 3.5 Ga, cyanobacteria Great Oxygenation Event, eukaryogenesis ~2.0 Ga); the Paleozoic (541 Ma Cambrian Explosion of metazoan body plans, terrestrial plant and amphibian colonization); the Mesozoic (252–66 Ma dinosaur dominance, origins of mammals and birds); and the Cenozoic (66 Ma–present mammalian radiation and modern Homo sapiens emergence ~300,000 years ago). Comparative genomic sequencing reveals an identical 64-codon genetic cipher across all living taxa, mathematically proving single common descent."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Evolutionary theory informs antimicrobial stewardship, agricultural crop resilience, and cancer phylodynamics (where malignant tumors evolve resistance through somatic natural selection). Current debates focus on integrating non-genetic epigenetic inheritance, horizontal gene transfer in microbial lineages, and evolutionary developmental biology (evo-devo) into an Extended Evolutionary Synthesis."
            }
        ]
    },

    # -------------------------------------------------------------
    # 3.2 Cell Biology & Energetics (Cell Theory, Organelles, Respiration, Photosynthesis, Division)
    # -------------------------------------------------------------
    {
        "id": "primer-cell-01",
        "title": "Cell Architecture and Bioenergetics: Organellar Coordination, Cellular Respiration, and Photosynthesis",
        "authors": "Peter Mitchell, Christian de Duve, Lynn Margulis (Foundational Series)",
        "field": "Biotech & Genetics",
        "doi": "https://doi.org/10.1016/0005-2728(66)90181-4",
        "theme": "emerald",
        "likes": 631,
        "isPrimer": True,
        "createdAt": "2026-03-02",
        "slides": [
            {
                "type": "hero",
                "hook": "The cell is the irreducible functional unit of biology: a self-assembling chemical engine that maintains non-equilibrium order via endomembrane trafficking and chemiosmotic ATP synthesis."
            },
            {
                "type": "method",
                "title": "Ultrastructural Compartmentalization & Bioenergetics",
                "content": "Contrasts nucleoid-based prokaryotes with compartmentalized eukaryotes. Maps organellar flux: nuclear chromatin transcription, rough ER ribosomal translation, Golgi vesicle sorting, lysosomal macromolecular digestion, and mitochondrial/chloroplast energy harvesting."
            },
            {
                "type": "results",
                "title": "Chemiosmotic Coupling: Glycolysis, Krebs & Photosynthesis",
                "content": "Cellular respiration (C6H12O6 + 6O2 -> 6CO2 + 6H2O + 30-32 ATP) couples electron transport chains to proton motive force across inner mitochondrial cristae. In plant chloroplast thylakoids, light reactions photolyze H2O to drive NADPH/ATP synthesis for the Calvin cycle."
            },
            {
                "type": "critique",
                "title": "Mitotic Fidelity vs. Meiotic Recombination",
                "content": "Mitosis produces identical diploid daughter cells for tissue homeostasis, whereas meiosis introduces mandatory genetic variation via prophase I homologous crossover and independent chromosomal assortment, with checkpoint failures leading to aneuploidy."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Thermodynamics dictates that isolated chemical systems inevitably decay toward maximum entropy. Living organisms evade this thermodynamic equilibrium by operating as open, highly organized systems that consume free energy to maintain electrochemical gradients, synthesize complex biomacromolecules, and replicate with near-perfect fidelity. Explaining how biochemical reactions are spatially separated and coordinated at the nanoscale is the central objective of cell biology."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Classical Cell Theory (Schleiden, Schwann, and Virchow) established that all living organisms consist of cells arising from pre-existing cells. In eukaryotic cells, lipid bilayers segregate conflicting chemical reactions: the nucleus protects genetic chromatin; the rough endoplasmic reticulum and ribosomes synthesize polypeptides; the smooth ER manufactures lipids; and the Golgi apparatus sorts and post-translationally modifies proteins. In lysosomes, acid hydrolases degrade cellular waste at low pH without harming the cytoplasm."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Peter Mitchell's Nobel-winning chemiosmotic hypothesis proved that energy conversion in mitochondria and chloroplasts relies on an electrochemical proton gradient (proton motive force) rather than high-energy chemical intermediates. As high-energy electrons flow down cytochrome complexes, protons are actively pumped into the intermembrane space or thylakoid lumen. Their thermodynamic return through the molecular rotary turbine of ATP synthase condenses ADP and inorganic phosphate into ATP. Cryo-electron microscopy now visualizes this molecular motor rotating at over 6,000 RPM."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Understanding cellular architecture is foundational for pharmacological intervention, oncology (where metabolic reprogramming known as the Warburg effect redirects oxidative phosphorylation to aerobic glycolysis), and mitochondrial replacement therapy. Physical transport constraints governed by surface-area-to-volume ratios (r^2 versus r^3) place strict upper limits on cell size in the absence of internal vascularization."
            }
        ]
    },

    # -------------------------------------------------------------
    # 3.3 Genetics & Heredity (DNA Structure, Replication, Mendelian Laws, Punnett, CRISPR)
    # -------------------------------------------------------------
    {
        "id": "primer-genetics-01",
        "title": "Molecular Genetics and Human Heredity: Watson-Crick DNA Architecture, Mendelian Segregation, and CRISPR Editing",
        "authors": "Gregor Mendel, James Watson, Francis Crick, Rosalind Franklin (Foundational Series)",
        "field": "Biotech & Genetics",
        "doi": "https://doi.org/10.1038/171737a0",
        "theme": "amethyst",
        "likes": 712,
        "isPrimer": True,
        "createdAt": "2026-03-02",
        "slides": [
            {
                "type": "hero",
                "hook": "Genetics decodes the transmission of biological information across generations, from the nanoscale geometry of the DNA double helix to probabilistic Mendelian inheritance and targeted CRISPR gene therapeutics."
            },
            {
                "type": "method",
                "title": "Antiparallel Complementarity & Central Dogma",
                "content": "Two antiparallel deoxyribose phosphate strands pair via strict hydrogen bonding (A=T, G=C). DNA polymerase drives semiconservative replication. RNA polymerase transcribes genetic codons into mRNA, translated at ribosomes into polypeptide primary structures."
            },
            {
                "type": "results",
                "title": "Mendelian Segregation & Monogenic Disease Modeling",
                "content": "Formalizes the Law of Segregation and Independent Assortment via Punnett matrices. Explains recessive pathologies (e.g., CFTR DeltaF508 in cystic fibrosis; HBB Glu6Val in sickle cell anemia) and dominant autosomal phenotypes in human pedigrees."
            },
            {
                "type": "critique",
                "title": "CRISPR-Cas9 Endonucleases & Epigenetic Modulations",
                "content": "Bacterial adaptive immunity repurposed as single-guide RNA directed molecular scissors. Enables curative non-homologous end joining (NHEJ) and homology-directed repair (HDR), balanced against off-target cleavages and epigenetic mosaicism."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Prior to modern genetics, heredity was thought to occur through blending inheritance, an assumption that would inevitably dilute novel phenotypic traits until populations became completely uniform. Naturalists could not reconcile how distinct hereditary traits (such as eye color or metabolic enzymes) could disappear in one generation and re-emerge intact in subsequent lineages, nor could they identify the physical material substrate carrying this biological blueprint."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Gregor Mendel demonstrated that traits are inherited as discrete particulate units (genes) governed by mathematical rules: the Law of Segregation (alleles separate during gametogenesis so each gamete carries one allele) and the Law of Independent Assortment (genes for unlinked traits sort independently). In 1953, James Watson, Francis Crick, and Rosalind Franklin revealed the physical structure of DNA: a right-handed antiparallel double helix where adenine pairs exclusively with thymine (two hydrogen bonds) and guanine with cytosine (three hydrogen bonds), providing an immediate mechanism for copying genetic code."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The deciphering of the universal genetic code (64 nucleotide triplets coding for 20 amino acids) proved that DNA is transcribed into messenger RNA by RNA polymerase and translated into functional enzymatic proteins by transfer RNAs at the ribosome. Sequencing of the Human Genome Project cataloged 3.1 billion base pairs, identifying the precise molecular etiology of thousands of monogenic conditions—such as the single nucleotide transversion in beta-globin that precipitates sickle cell anemia."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "The advent of CRISPR-Cas9 programmable endonucleases by Emmanuelle Charpentier and Jennifer Doudna transformed genetics from an observational science into an active therapeutic discipline, achieving FDA approval for ex vivo curative gene correction. Contemporary challenges center on in vivo delivery systems (lipid nanoparticles vs. adeno-associated viruses), precise prime editing without double-strand DNA breaks, and polygenic risk scoring."
            }
        ]
    },

    # -------------------------------------------------------------
    # 3.4 Microbiology (Bacteria, Archaea, Viruses, Microbiome, Resistance, Biotech)
    # -------------------------------------------------------------
    {
        "id": "primer-microbio-01",
        "title": "Microbiology and the Unseen Biosphere: Bacteria, Archaea, Viral Pathogenicity, and the Human Microbiome",
        "authors": "Louis Pasteur, Robert Koch, Carl Woese (Foundational Series)",
        "field": "Clinical Medicine & Health",
        "doi": "https://doi.org/10.1073/pnas.74.11.5088",
        "theme": "teal",
        "likes": 489,
        "isPrimer": True,
        "createdAt": "2026-03-03",
        "slides": [
            {
                "type": "hero",
                "hook": "Microorganisms constitute the majority of biological diversity on Earth, driving global biogeochemical cycles, human symbiotic health, and critical industrial biotechnology."
            },
            {
                "type": "method",
                "title": "Phylogenetic Tripartite Tree & Viral Taxonomies",
                "content": "Carl Woese's 16S rRNA analysis classified life into Bacteria, Archaea, and Eukarya. Characterizes peptidoglycan bacterial walls, ether-linked archaeal extremophiles, non-living protein-capsid viral parasites (Influenza, HIV, SARS-CoV-2), and eukaryotic fungi/protists."
            },
            {
                "type": "results",
                "title": "Symbiotic Gut Microbiome & Industrial Fermentation",
                "content": "Trillions of gastrointestinal commensal microbes synthesize vitamin K, ferment dietary fiber into neuroactive short-chain fatty acids, and educate naive immune cells. Genetically engineered microbes produce recombinant human insulin and clean environmental oil spills."
            },
            {
                "type": "critique",
                "title": "Antimicrobial Resistance (AMR) & Plasmid Transfer",
                "content": "Overuse of beta-lactam antibiotics drives natural selection of multidrug-resistant pathogens (MRSA, CRE) via horizontal plasmid transfer, requiring phage therapy and novel antimicrobial peptides to avert post-antibiotic clinical crises."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "For millennia, infectious pandemics—from the Black Death to cholera—decimated human populations under the superstition of atmospheric miasmas. Even after Antonie van Leeuwenhoek observed microscopic animalcules in 1676, the biological community lacked experimental proof linking specific microscopic entities to systemic physiological pathology or global mineral recycling."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Louis Pasteur and Robert Koch established the Germ Theory of Disease, demonstrating that distinct pathogens cause specific infectious illnesses (Koch's Postulates). Carl Woese revolutionized microbiology by using ribosomal RNA sequencing to reveal that Archaea are distinct from Bacteria, capable of thriving in extreme hydrothermal and hypersaline ecological niches. Unlike cellular life, viruses exist as obligate intracellular genetic parasite assemblies requiring host cellular translation machinery to replicate."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Metagenomic sequencing revealed that the human body harbors an internal ecological biome of over 30 trillion commensal bacteria and fungi. This gut microbiome performs vital metabolic functions, synthesizing vitamin B12, bile acid transformations, and modulating systemic inflammatory tone via the gut-brain axis. In biotechnology, microbes serve as living chemical factories: Saccharomyces cerevisiae drives industrial bioethanol fermentation, and recombinant Escherichia coli synthesizes clinical-grade human insulin."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "The rapid emergence of antimicrobial resistance (AMR) in superbugs like methicillin-resistant Staphylococcus aureus (MRSA) and carbapenem-resistant Enterobacteriaceae illustrates rapid Darwinian selection under clinical antibiotic pressure. Combating AMR demands narrow-spectrum bactericidal agents, engineered bacteriophages, and synthetic biology platforms for environmental bioremediation of industrial pollutants."
            }
        ]
    },

    # -------------------------------------------------------------
    # 3.5 Physiology & Anatomy (8 Systems, Homeostasis, Feedback Loops)
    # -------------------------------------------------------------
    {
        "id": "primer-physio-01",
        "title": "Human Physiology and Systemic Homeostasis: Integrated Organ Networks, Neural Circuits, and Hormonal Feedback Loops",
        "authors": "Claude Bernard, Walter Cannon, Arthur Guyton (Foundational Series)",
        "field": "Clinical Medicine & Health",
        "doi": "https://doi.org/10.1152/physrev.1926.6.3.400",
        "theme": "crimson",
        "likes": 564,
        "isPrimer": True,
        "createdAt": "2026-03-03",
        "slides": [
            {
                "type": "hero",
                "hook": "Physiology explains how trillions of specialized cells collaborate across eight organ systems to maintain dynamic homeostatic equilibrium within narrow thermodynamic tolerances."
            },
            {
                "type": "method",
                "title": "Systemic Integration of the Eight Body Networks",
                "content": "Maps cross-talk: CNS/PNS rapid electrical impulse conduction, cardiovascular hydrodynamic transport, respiratory gas exchange, gastrointestinal nutrient uptake, musculoskeletal biomechanics, endocrine chemical signaling, and renal excretion."
            },
            {
                "type": "results",
                "title": "Negative vs. Positive Feedback Loops in Action",
                "content": "Negative feedback stabilizes core parameters: pancreatic insulin/glucagon cycles govern blood glucose (70-99 mg/dL), and hypothalamic thermosensors maintain 37 deg C core temperature. Positive feedback amplifies discrete physiological events: oxytocin labor contractions and the thrombin clotting cascade."
            },
            {
                "type": "critique",
                "title": "Allostatic Load & Systemic Decompensation",
                "content": "Chronic physiological stress elevates allostatic load, exhausting regulatory feedback mechanisms and driving hypertension, metabolic syndrome, and systemic chronic inflammation when homeostatic set points undergo irreversible pathological drift."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Complex multicellular organisms must insulate their internal cells from unpredictable external environmental volatility—including fluctuations in ambient temperature, osmotic water loss, nutrient scarcity, and toxic accumulation. Understanding how diverse specialized tissues coordinate their metabolic activities without catastrophic system failure was the foundational challenge of modern physiology."
            },
            {
                "heading": "The Core Mechanism",
                "body": "French physiologist Claude Bernard conceptualized the milieu intérieur (internal environment), which Walter Cannon formalized as homeostasis: the coordinated physiological processes that maintain internal physical-chemical steady states. Homeostasis relies on negative feedback control loops comprising three mandatory components: a sensor that detects deviations from a set point, an integrating control center that processes error signals, and an effector that executes counteractive responses."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Homeostatic regulation operates continuously across all eight organ systems. In the endocrine system, rising blood glucose triggers pancreatic beta cells to secrete insulin, promoting cellular glucose uptake and glycogen storage; falling glucose triggers alpha-cell glucagon release to stimulate hepatic gluconeogenesis. In the nervous system, baroreceptors in the carotid sinus modulate autonomic sympathetic and parasympathetic vascular tone within milliseconds to preserve cerebral arterial perfusion pressure."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "All human clinical pathology—from diabetic ketoacidosis and congestive heart failure to septic shock—represents the decompensation of homeostatic feedback loops. Modern critical care medicine uses pharmacologic and mechanical interventions (such as vasopressors, dialysis, and mechanical ventilators) to artificially re-establish homeostatic equilibrium during acute organ failure."
            }
        ]
    },

    # -------------------------------------------------------------
    # 3.6 Ecology & Environmental Science (Trophic Pyramids, 10% Rule, Keystone, Conservation)
    # -------------------------------------------------------------
    {
        "id": "primer-eco-systems-01",
        "title": "Ecology and Earth Systems: Trophic Energy Flow, Keystone Species, Food Webs, and Biosphere Conservation",
        "authors": "Raymond Lindeman, Eugene Odum, Robert Paine, E.O. Wilson (Foundational Series)",
        "field": "Climate & Earth Systems",
        "doi": "https://doi.org/10.2307/1930126",
        "theme": "deepblue",
        "likes": 512,
        "isPrimer": True,
        "createdAt": "2026-03-04",
        "slides": [
            {
                "type": "hero",
                "hook": "Ecology investigates the thermodynamic flows of energy and nutrient biogeochemical cycles that link individual organisms to planetary-scale biosphere stability."
            },
            {
                "type": "method",
                "title": "Lindeman's 10% Trophic Efficiency & Energy Pyramids",
                "content": "Quantifies energy dissipation across trophic cascades: autotrophic primary producers, herbivorous consumers, secondary predators, and saprophytic decomposers. Approximately 90% of thermodynamic chemical energy is lost as metabolic heat between successive trophic tiers."
            },
            {
                "type": "results",
                "title": "Keystone Species & Trophic Cascades",
                "content": "Demonstrates that top apex predators (e.g., Pisaster sea stars, Canis lupus in Yellowstone) exert disproportionate top-down regulation over ecosystem architecture, preventing herbivore overgrazing and preserving landscape biodiversity."
            },
            {
                "type": "critique",
                "title": "Planetary Boundaries & Anthropogenic Disruption",
                "content": "Quantifies human impacts: greenhouse gas radiative forcing, nitrogen cycle disruption via synthetic fertilizers, habitat fragmentation, and microplastic pollution driving sixth mass extinction risks beyond Earth system safe operating spaces."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Early natural history cataloged plants and animals as isolated entities, failing to recognize the systemic dependencies governing their abundance. Without mathematical frameworks for energy dissipation and nutrient cycling, conservationists could not explain why apex predators are naturally rare, why removing a single marine invertebrate could collapse an entire coastal kelp forest, or how industrial emissions disrupt biosphere homeostasis."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Raymond Lindeman formalized ecological energetics, establishing that ecosystems are thermodynamic engines. Solar radiation is captured by photoautotrophs (plants and phytoplankton) via photosynthesis. As energy flows through food webs from primary producers to herbivores and carnivores, the Second Law of Thermodynamics enforces Lindeman's 10% efficiency rule: approximately 90% of biological energy is dissipated as metabolic respiration and heat, strictly limiting the length of food chains to 4 or 5 trophic levels."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Robert Paine's landmark experiments proved the concept of keystone species: removing the predatory starfish Pisaster ochraceus from intertidal zones caused mussel monocultures to outcompete all other species, cutting biodiversity in half. Similar trophic cascades were documented upon the reintroduction of gray wolves to Yellowstone National Park, which altered ungulate grazing behavior, restored riparian willow communities, and physically stabilized riverbank geomorphology."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Contemporary conservation biology operates through the framework of planetary boundaries, establishing critical ecological tipping points in climate stability, land-system conversion, and biosphere integrity. Preservation strategies now prioritize connected wildlife corridors, marine protected networks, and wetland restoration to safeguard genetic, species, and functional ecosystem resilience against global environmental change."
            }
        ]
    },

    # -------------------------------------------------------------
    # 3.7 Developmental Biology & Stem Cells (Embryogenesis, Potency, Yamanaka Factors)
    # -------------------------------------------------------------
    {
        "id": "primer-devbio-01",
        "title": "Developmental Biology and Stem Cell Pluripotency: Embryogenesis, Morphogen Gradients, and Regenerative Medicine",
        "authors": "Hans Spemann, Shinya Yamanaka, Lewis Wolpert (Foundational Series)",
        "field": "Biotech & Genetics",
        "doi": "https://doi.org/10.1016/j.cell.2006.07.024",
        "theme": "sunset",
        "likes": 620,
        "isPrimer": True,
        "createdAt": "2026-03-04",
        "slides": [
            {
                "type": "hero",
                "hook": "Developmental biology deciphers how a single fertilized zygote executes a genomic program to generate hundreds of differentiated cell types organized into functional anatomical tissues."
            },
            {
                "type": "method",
                "title": "Embryogenesis & Morphogen Concentration Gradients",
                "content": "Traces the developmental trajectory: gametic fertilization, zygote cleavage, blastocyst inner cell mass segregation, and gastrulation into three primary germ layers (ectoderm, mesoderm, endoderm) orchestrated by morphogen signaling gradients (Wnt, BMP, Sonic Hedgehog)."
            },
            {
                "type": "results",
                "title": "Stem Cell Potency Hierarchy & Yamanaka iPSCs",
                "content": "Classifies cellular potency: totipotent zygotic cells, pluripotent embryonic stem cells (ESCs), and lineage-restricted multipotent adult stem cells. Shinya Yamanaka proved that retroviral expression of four transcription factors (Oct4, Sox2, Klf4, c-Myc) reprograms mature adult somatic cells back to naive pluripotency."
            },
            {
                "type": "critique",
                "title": "Epigenetic Memory & Oncogenic Teratoma Risks",
                "content": "Induced pluripotent stem cells retain subtle donor epigenetic memory and carry oncogenic risks if undifferentiated cells form teratomas. Modern regenerative therapies focus on chemically defined small-molecule differentiation and 3D organoid microenvironments."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Every somatic cell in an adult human organism contains virtually identical genomic DNA sequences. How, then, does a single spherical fertilized egg reliably produce rod photoreceptors, beating cardiomyocytes, hepatobiliary cells, and myelinated motor neurons in exact spatial coordinates without a central external architect directing assembly?"
            },
            {
                "heading": "The Core Mechanism",
                "body": "Development proceeds through differential gene expression regulated by spatial morphogen gradients. Lewis Wolpert's French Flag Model demonstrated that cells determine their anatomical fate based on the local concentration of diffusible signaling proteins (such as Sonic Hedgehog and Bone Morphogenetic Proteins). Following fertilization and blastocyst formation, gastrulation choreographs massive cellular migrations that establish the three fundamental embryonic germ layers: ectoderm (neural system, epidermis), mesoderm (muscle, skeleton, circulatory system), and endoderm (gut, liver, respiratory tract)."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Stem cell biology establishes a potency continuum: totipotent zygotes can form an entire organism including extraembryonic placenta; pluripotent cells (from the blastocyst inner cell mass) can generate all embryonic lineages; and multipotent somatic stem cells replenish specific adult tissue lineages. In 2006, Shinya Yamanaka shattered the biological dogma that cellular differentiation is an irreversible one-way street by proving that four core transcription factors (Oct3/4, Sox2, Klf4, c-Myc) are sufficient to reset adult fibroblasts into patient-matched induced pluripotent stem cells (iPSCs)."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "The mastery of pluripotency enables patient-derived human organoids for high-throughput pharmacological screening, cell replacement therapies for Parkinson's disease and type 1 diabetes, and in vitro gametogenesis. Ongoing challenges involve eliminating teratoma tumorigenesis, mastering vascularization in 3D bioprinted solid organs, and dissecting epigenetic aging clocks during reprogramming."
            }
        ]
    },

    # -------------------------------------------------------------
    # Second Foundational Primers for Other Major Disciplines
    # -------------------------------------------------------------
    # Psychology & Behavioral Science
    {
        "id": "primer-psych-02",
        "title": "Conditioning, Neurobehavioral Plasticity, and Social Learning: From Pavlov and Skinner to Bandura",
        "authors": "Ivan Pavlov, B.F. Skinner, Albert Bandura (Foundational Series)",
        "field": "Psychology & Behavioral Science",
        "doi": "https://doi.org/10.1037/h0047395",
        "theme": "obsidian",
        "likes": 472,
        "isPrimer": True,
        "createdAt": "2026-03-05",
        "slides": [
            {
                "type": "hero",
                "hook": "Behavioral science discovers the empirical laws through which environmental stimuli, reinforcement contingencies, and observational modeling shape organismal action and neural plasticity."
            },
            {
                "type": "method",
                "title": "Classical vs. Operant Conditioning Paradigms",
                "content": "Contrasts Pavlovian stimulus-stimulus association (conditioned stimulus eliciting involuntary conditioned reflex) with Skinnerian operant conditioning, where voluntary emitted behaviors are modulated by reinforcement schedules (ratio/interval) and punishment contingencies."
            },
            {
                "type": "results",
                "title": "Observational Modeling & Self-Efficacy Mechanisms",
                "content": "Albert Bandura's Social Learning Theory established that humans acquire complex behavioural repertoires through vicarious observational modeling without direct reinforcement, mediated by cognitive expectations and perceived self-efficacy."
            },
            {
                "type": "critique",
                "title": "Biological Preparedness & The Cognitive Revolution",
                "content": "Strict behaviorism treated the mind as an unobservable black box. Chomskyan linguistics and the Garcia taste-aversion effect proved that evolutionary biological preparedness and internal mental computational representations strictly constrain learning."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "In the nineteenth century, psychology was dominated by speculative introspectionism, which lacked reproducible empirical measurement. Scientists needed objective, falsifiable methodologies to study how animals and humans adapt their behavioural repertoire to survival challenges across the lifespan."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Ivan Pavlov discovered classical conditioning by pairing neutral auditory cues with unconditioned food stimuli, demonstrating that temporal contiguity builds new synaptic associative reflexes. B.F. Skinner extended this to voluntary motor actions via the operant conditioning chamber (Skinner Box), proving that behaviors followed by positive reinforcement increase in frequency, while variable-ratio schedules induce the highest resistance to behavioral extinction."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Albert Bandura's seminal Bobo Doll experiments proved that children spontaneously reproduce novel aggressive motor actions observed in adult models without any direct reward, validating observational learning. Eric Kandel subsequently elucidated the biophysical mechanism of conditioning in Aplysia californica, showing that behavioral sensitization involves cyclic AMP-dependent protein kinase A phosphorylation that enhances presynaptic calcium influx and neurotransmitter release."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Behavioral conditioning principles underwrite cognitive behavioral therapy (CBT), exposure therapy for anxiety and PTSD, modern digital habit architecture, and reinforcement learning in artificial intelligence algorithms. Limitations emerge when behaviorist principles neglect social-emotional contexts, neurodevelopmental variations, and internal cognitive appraisals."
            }
        ]
    },

    # Philosophy & Ethics
    {
        "id": "primer-phil-02",
        "title": "Normative Ethics: Consequentialism, Deontology, and Aristotelian Virtue Ethics",
        "authors": "Immanuel Kant, John Stuart Mill, Aristotle (Foundational Series)",
        "field": "Philosophy & Ethics",
        "doi": "https://doi.org/10.1093/0198246443.001.0001",
        "theme": "amethyst",
        "likes": 505,
        "isPrimer": True,
        "createdAt": "2026-03-05",
        "slides": [
            {
                "type": "hero",
                "hook": "Normative ethics provides rigorous rational frameworks for evaluating moral duty, good consequences, and virtuous character in human action and autonomous technologies."
            },
            {
                "type": "method",
                "title": "The Tripartite Architecture of Moral Philosophy",
                "content": "Compares Utilitarian Consequentialism (maximizing aggregate utility across sentient beings), Kantian Deontology (unconditional moral duties derived from the Categorical Imperative), and Virtue Ethics (cultivating eudaimonic excellence and practical wisdom)."
            },
            {
                "type": "results",
                "title": "Resolving Moral Dilemmas & Trolley Problems",
                "content": "Analyzes edge cases: the Doctrine of Double Effect, rights-based constraints against utility maximization, and contemporary machine ethics dilemmas in autonomous vehicles and medical triage algorithms."
            },
            {
                "type": "critique",
                "title": "Moral Relativism vs. Meta-Ethical Realism",
                "content": "Examines whether moral truths reflect objective mind-independent facts, subjective evolutionary social heuristics, or constructivist reflective equilibrium in public reason."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Human societies face persistent moral disagreements: When, if ever, is it permissible to sacrifice the rights of a minority to protect the safety of the majority? Can ethical reasoning be grounded in universal rational logic, or is morality merely an emotional expression of cultural convention and evolutionary tribal survival?"
            },
            {
                "heading": "The Core Mechanism",
                "body": "Normative ethics resolves these questions through three systematic frameworks: Jeremy Bentham and John Stuart Mill formulated Utilitarianism, which judges an action's moral worth strictly by its consequences in maximizing aggregate well-being and minimizing net suffering. Immanuel Kant formulated Deontology, asserting that actions have intrinsic moral worth; moral agents must act according to the Categorical Imperative—act only according to maxims you could rationally will to become universal laws, never treating human beings merely as means to an end. Aristotle formulated Virtue Ethics, focusing on character cultivation, practical wisdom (phronesis), and the Golden Mean between extremes of excess and deficiency."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Philosophical thought experiments like Philippa Foot and Judith Jarvis Thomson's Trolley Problem revealed systematic cognitive divergences between deontological side-constraints and utilitarian calculations. Contemporary empirical neuroethics demonstrates that distinct neurological circuits (the ventromedial prefrontal cortex versus dorsolateral prefrontal cortex) engage when humans weigh visceral emotional moral violations against calculated utilitarian trade-offs."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Ethical frameworks are no longer purely theoretical: they govern bioethics committees, gene-editing regulations, international humanitarian law, and algorithmic alignment in artificial general intelligence. Bridging conflicting moral intuitions remains vital for building trustworthy autonomous systems that respect fundamental human dignity."
            }
        ]
    },

    # Law & Jurisprudence
    {
        "id": "primer-law-02",
        "title": "Constitutionalism, Separation of Powers, and Judicial Review: The Structural Rule of Law",
        "authors": "John Locke, Montesquieu, Chief Justice John Marshall (Foundational Series)",
        "field": "Law & Jurisprudence",
        "doi": "https://doi.org/10.2307/1322124",
        "theme": "crimson",
        "likes": 461,
        "isPrimer": True,
        "createdAt": "2026-03-06",
        "slides": [
            {
                "type": "hero",
                "hook": "Constitutionalism establishes that sovereign governmental authority is strictly bounded by foundational higher law, protecting fundamental individual liberties through structural checks and balances."
            },
            {
                "type": "method",
                "title": "Tripartite Separation of Powers & Checks and Balances",
                "content": "Montesquieu's doctrine divides state monopoly over force into independent legislative (law-making), executive (law-enforcing), and judicial (law-interpreting) branches, ensuring no single organ exercises unchecked tyrannical power."
            },
            {
                "type": "results",
                "title": "Judicial Review: Marbury v. Madison & Constitutional Supremacy",
                "content": "Establishes that written constitutions are paramount supreme law. Independent judicial courts hold the authority and solemn duty to void legislative statutes and executive decrees that conflict with constitutional rights."
            },
            {
                "type": "critique",
                "title": "The Counter-Majoritarian Difficulty & Democratic Legitimacy",
                "content": "Debates the tension between unelected judges overturning laws passed by democratically elected legislatures, contrasting originalism with the Living Constitution doctrine of evolving fundamental rights."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Historically, political power was concentrated in absolute monarchs whose sovereign decrees were immune to institutional challenge. The central dilemma of constitutional political thought was how to construct a government strong enough to maintain domestic civil peace, yet legally constrained enough not to become an instrument of tyranny against its own citizenry."
            },
            {
                "heading": "The Core Mechanism",
                "body": "John Locke established that legitimate government derives solely from the consent of the governed to protect natural rights to life, liberty, and property. Baron de Montesquieu articulated the Tripartite Separation of Powers, demonstrating that liberty flourishes only when legislative, executive, and judicial powers reside in distinct, co-equal institutional branches equipped with constitutional checks to resist encroachment."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "In the landmark 1803 decision Marbury v. Madison, Chief Justice John Marshall established the doctrine of Judicial Review in the United States, affirming that 'an act of the legislature repugnant to the Constitution is void.' This principle of constitutional supremacy was subsequently adopted by constitutional courts globally—from post-war Germany's Federal Constitutional Court to the Supreme Court of India's Basic Structure Doctrine—ensuring that statutory majorities cannot dismantle core constitutional democracy."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Constitutional legal structures provide the predictability, property rights, and freedom of expression essential for scientific inquiry, technological innovation, and economic prosperity. Contemporary challenges focus on the expansion of administrative regulatory states, judicial appointments in polarized polities, and protecting digital sovereignty in transnational cyberspace."
            }
        ]
    },

    # History & Archaeology
    {
        "id": "primer-hist-02",
        "title": "The Neolithic Revolution: Sedentism, Agricultural Domestication, and the Rise of Urban Civilization",
        "authors": "V. Gordon Childe, Jared Diamond, Kathleen Kenyon (Foundational Series)",
        "field": "History & Archaeology",
        "doi": "https://doi.org/10.1086/200003",
        "theme": "sunset",
        "likes": 530,
        "isPrimer": True,
        "createdAt": "2026-03-06",
        "slides": [
            {
                "type": "hero",
                "hook": "The Neolithic Transition from nomadic foraging to agricultural food production around 10,000 BCE represents the most transformative economic and ecological rupture in human history."
            },
            {
                "type": "method",
                "title": "Domestication Syndromes & Archaeological Stratigraphy",
                "content": "Combines archaeobotanical macroremains (non-shattering wheat rachis), zooarchaeological faunal skeletal profiles, and radiocarbon AMS dating across the Fertile Crescent, Yangtze River, and Mesoamerica."
            },
            {
                "type": "results",
                "title": "Surplus Extraction, Social Stratification & Cities",
                "content": "Dense sedentary farming created storable grain surpluses, driving the Urban Revolution: specialized artisans, bureaucratic cuneiform accounting, monumental public architecture, and centralized state taxation in early Jericho and Uruk."
            },
            {
                "type": "critique",
                "title": "The Paleopathological Paradox & Coercive Labor",
                "content": "Skeletal bioarchaeology reveals that early farmers suffered higher dental caries, infectious zoonoses, and nutritional enamel hypoplasias compared to foragers, with early states relying on coercive corvée labor."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "For over 95 percent of human evolutionary existence, Homo sapiens lived in mobile, small-scale egalitarian hunter-gatherer bands. Why, following the termination of the Last Glacial Maximum roughly 12,000 years ago, did disparate human populations independently abandon foraging in favour of sedentary farming, permanently altering human demography and social structures?"
            },
            {
                "heading": "The Core Mechanism",
                "body": "V. Gordon Childe coined the term Neolithic Revolution to designate the transition from extractive food procurement to agricultural food production. Warmer post-glacial Holocene climates enabled communities in the Fertile Crescent to cultivate wild cereals (einkorn, emmer wheat, and barley) and domesticate wild ungulates (sheep, goats, cattle, and pigs). Artificial selection systematically altered plant morphologies, favouring tough non-shattering seed rachises that required human harvesting for propagation."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Excavations at Tell es-Sultan (Jericho), Çatalhöyük, and Göbekli Tepe revealed massive stone towers, communal architecture, and permanent mudbrick residences dating to 9000–7000 BCE. The generation of storable grain surpluses fueled the Urban Revolution: occupational specialization, trade networks, cuneiform writing for accounting grain inventories, and centralized institutional authority in Mesopotamian cities like Uruk."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Neolithic archaeology overturns simplistic civilizational progression narratives. Bioarchaeological analysis of skeletons reveals that the agricultural transition caused an immediate decline in individual dietary variety and introduced epidemic zoonotic diseases from livestock. However, the resulting exponential population expansion provided the demographic foundation for writing, metallurgy, science, and modern globalized society."
            }
        ]
    },

    # Sociology & Political Science
    {
        "id": "primer-soc-02",
        "title": "Bureaucracy, Rationalization, and the Modern State: Max Weber and Institutional Power",
        "authors": "Max Weber, Theda Skocpol, Charles Tilly (Foundational Series)",
        "field": "Sociology & Political Science",
        "doi": "https://doi.org/10.2307/2088842",
        "theme": "teal",
        "likes": 479,
        "isPrimer": True,
        "createdAt": "2026-03-07",
        "slides": [
            {
                "type": "hero",
                "hook": "The modern state is defined by its monopoly of legitimate physical violence and coordinated through bureaucratic rationalization—the most efficient yet constraining organizational machinery ever devised."
            },
            {
                "type": "method",
                "title": "Weberian Ideal-Type Bureaucracy & Tripartite Authority",
                "content": "Distinguishes traditional, charismatic, and legal-rational authority. Identifies core bureaucratic parameters: jurisdictional competency, hierarchical office structure, written documentation (the files), and specialized technical credentialing."
            },
            {
                "type": "results",
                "title": "State Formation: Tilly's War-Making Paradigm",
                "content": "Demonstrates how interstate European geopolitical conflict drove state capacity: 'War made the state, and the state made war.' Financing standing armies mandated centralized fiscal taxation, standardized civil laws, and national census administration."
            },
            {
                "type": "critique",
                "title": "The Iron Cage of Rationality & Goal Displacement",
                "content": "Weber warned that total rationalization traps humanity in an 'iron cage' (stahlhartes Gehäuse) of calculating functional efficiency stripped of moral meaning, where rigid institutional rules displace real organizational objectives."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Pre-modern political governance was characterized by patrimonial fiefdoms, nepotistic patronage, and fragmented local warlords. How did complex modern societies succeed in organizing millions of citizens across vast continental territories into predictable, functioning economic and social orders governed by standardized laws?"
            },
            {
                "heading": "The Core Mechanism",
                "body": "Max Weber provided the foundational sociological definition of the state: a human community that successfully claims the monopoly of the legitimate use of physical force within a given territory. Weber demonstrated that modernization is fundamentally a process of rationalization, wherein magical and religious worldviews are supplanted by calculable, systematic legal-rational procedures embodied in bureaucracy. An ideal-type bureaucracy operates according to impersonal rules, meritocratic exams, and strictly separated private and public resources."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Historical comparative sociologists like Charles Tilly corroborated Weber's thesis, demonstrating how European warfare between 1500 and 1800 forced sovereigns to replace venal mercenary companies with professional state bureaucracies capable of regularized tax extraction and public infrastructure construction. Empirical studies across modern developmental states in East Asia confirmed that meritocratic, insulated Weberian bureaucracies correlate strongly with rapid economic growth and reduced corruption."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Weberian sociological analysis remains critical for diagnosing institutional failure, administrative gridlock, and modern democratic disaffection. Contemporary scholars examine how algorithmic governance, automated digital public services, and corporate platform monopolies represent the next historical evolution of the bureaucratic iron cage."
            }
        ]
    },

    # Linguistics & Language Science
    {
        "id": "primer-ling-02",
        "title": "Acoustic Phonetics and Phonology: The Vocal Tract Mechanics and Structural Sound Systems of Human Speech",
        "authors": "Ferdinand de Saussure, Roman Jakobson, Peter Ladefoged (Foundational Series)",
        "field": "Linguistics & Language Science",
        "doi": "https://doi.org/10.1121/1.1906989",
        "theme": "amethyst",
        "likes": 448,
        "isPrimer": True,
        "createdAt": "2026-03-07",
        "slides": [
            {
                "type": "hero",
                "hook": "Human spoken language transforms continuous acoustic pressure waves into discrete mental phonological representations through the aerodynamic modulation of the human vocal tract."
            },
            {
                "type": "method",
                "title": "Vocal Tract Aerodynamics & Formant Acoustics",
                "content": "Uses the Source-Filter Model: pulmonic egressive airflow vibrates vocal folds (source fundamental frequency F0), while the pharyngeal and oral cavities act as acoustic resonance filters producing distinctive formants (F1, F2)."
            },
            {
                "type": "results",
                "title": "Phonemes vs. Allophones & Distinctive Feature Theory",
                "content": "Maps sound inventories using the International Phonetic Alphabet (IPA). Proves that sounds exist in contrastive phonemic opposition in mental grammar (e.g., minimal pairs /p/ vs /b/), categorized by binary articulatory features [+/- voice, +/- nasal]."
            },
            {
                "type": "critique",
                "title": "Categorical Perception & Non-Auditory Sign Languages",
                "content": "Speech perception is categorical: human brains warp continuous acoustic transitions into discrete perceptual buckets. Furthermore, natural sign languages verify that phonological duality of patterning operates independently of vocal acoustics."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "When a human speaks, the physical sound wave striking a listener's eardrum is an unbroken, continuous stream of fluid pressure variations without physical pauses between words. How does the human auditory cortex instantly parse this chaotic continuous physical waveform into discrete, recognizable sequences of words, syntax, and abstract meaning?"
            },
            {
                "heading": "The Core Mechanism",
                "body": "Linguistics differentiates phonetics (the physical acoustics and articulatory mechanics of speech sounds) from phonology (the abstract cognitive sound grammar of a language). Gunnar Fant's Source-Filter Theory demonstrated that pulmonic airflow passing through oscillating vocal folds provides a periodic harmonic acoustic source, which is filtered by dynamic changes in vocal tract shape (tongue position, lip rounding, velum lowering). Formant frequencies (F1 indicating tongue height and F2 indicating tongue backness) uniquely characterize vowel timbres across all human languages."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Roman Jakobson formulated Distinctive Feature Theory, showing that all speech sounds across the world's 7,000 languages decompose into universal binary articulatory coordinates (such as voicing, nasality, and place of articulation). Psychological experiments on categorical perception proved that human infants perceive phonetic boundaries (such as the voice onset time boundary between /ba/ and /pa/) long before acquiring lexical vocabularies, demonstrating specialized cognitive adaptations for speech processing."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Acoustic phonetics and phonology form the mathematical foundation for modern automatic speech recognition (ASR), text-to-speech synthesis, and clinical speech-language pathology. The discovery of rich phonological systems in deaf signed languages proved that phonological organization is an abstract mental faculty of human cognition rather than a mere consequence of vocal cord biology."
            }
        ]
    },

    # Aerospace & Mechanical Engineering
    {
        "id": "primer-aero-02",
        "title": "Engineering Thermodynamics and Heat Engines: The Carnot Cycle, Entropy, and Propulsion Physics",
        "authors": "Sadi Carnot, Rudolf Clausius, Ludwig Boltzmann (Foundational Series)",
        "field": "Aerospace & Mechanical Engineering",
        "doi": "https://doi.org/10.1098/rstl.1854.0004",
        "theme": "deepblue",
        "likes": 580,
        "isPrimer": True,
        "createdAt": "2026-03-08",
        "slides": [
            {
                "type": "hero",
                "hook": "Thermodynamics defines the inviolable physical laws governing energy conversion, placing hard thermodynamic upper limits on the maximum efficiency of all heat engines, gas turbines, and rocket propulsion systems."
            },
            {
                "type": "method",
                "title": "The Four Thermodynamic Laws & Carnot Cycle",
                "content": "Formalizes the First Law (conservation of energy) and Second Law (irreversible entropy production). Solves the reversible Carnot engine between hot (Th) and cold (Tc) reservoirs, establishing maximum theoretical thermal efficiency: eta = 1 - (Tc / Th)."
            },
            {
                "type": "results",
                "title": "Brayton Gas Turbine Cycles & Jet Propulsion",
                "content": "Applies thermodynamic cycles to aerospace engineering: the open Brayton cycle (isentropic compression, isobaric combustion, isentropic expansion) powers turbojets and turbofans, maximizing thrust-to-weight and specific impulse."
            },
            {
                "type": "critique",
                "title": "Exergy Destruction & Real-World Irreversibilities",
                "content": "Real mechanical systems operate far below Carnot limits due to aerodynamic skin friction, turbulent boundary layer losses, shock wave formation, and heat conduction, requiring computational fluid dynamics (CFD) optimization."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "During the Industrial Revolution, engineers built increasingly large steam engines through trial and error without understanding the theoretical upper limits of fuel conversion. Early industrial innovators believed that with better mechanical machining, an engine could convert 100 percent of heat into mechanical work without wasting any thermal energy to the surrounding environment."
            },
            {
                "heading": "The Core Mechanism",
                "body": "French military engineer Sadi Carnot proved in 1824 that work is produced not by the simple consumption of caloric heat, but by its transfer from a higher to a lower temperature reservoir. Rudolf Clausius formulated the Second Law of Thermodynamics and defined entropy: in any cyclic process, heat cannot spontaneously flow from a colder to a hotter body without external work. The ideal Carnot cycle (two reversible isothermal stages and two reversible adiabatic stages) proves that thermal efficiency is strictly limited by reservoir temperatures: eta_max = 1 - (T_cold / T_hot), regardless of the working fluid used."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Applying thermodynamic principles revolutionized aerospace propulsion. George Brayton's continuous combustion cycle enabled Sir Frank Whittle and Hans von Ohain to engineer the jet aircraft engine: atmospheric air is isentropically compressed in compressor stages, mixed with aviation fuel and combusted at constant pressure, and expanded through turbines that power the compressor while expelling high-velocity exhaust to generate forward thrust."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Thermodynamics governs every energy conversion system on Earth and in space, from hypersonic scramjets and cryogenic liquid-propellant rocket engines to combined-cycle power plants and refrigeration heat pumps. Modern aerospace engineering focuses on raising turbine inlet temperatures using single-crystal superalloys and thermal barrier ceramic coatings to approach maximum thermodynamic Carnot efficiency."
            }
        ]
    }
]

added = 0
for primer in new_foundations:
    if primer['id'] not in existing_ids:
        primers.append(primer)
        existing_ids.add(primer['id'])
        added += 1

print(f"Adding {added} new primers to primer-data.json...")

with open('primer-data.json', 'w', encoding='utf-8') as f:
    json.dump(primers, f, indent=2, ensure_ascii=False)

print(f"Successfully updated primer-data.json. Total primers now: {len(primers)}")
