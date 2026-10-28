"""
Add foundational primers for the 11 new disciplines to primer-data.json
"""
import json
import os

with open('primer-data.json', 'r', encoding='utf-8') as f:
    primers = json.load(f)

new_primers = [
    # Clinical Medicine & Health
    {
        "id": "primer-med-01",
        "title": "Randomized Controlled Trials: The Gold Standard of Clinical Evidence",
        "authors": "Prof. Austin Bradford Hill, Archie Cochrane (Foundational Series)",
        "field": "Clinical Medicine & Health",
        "doi": "https://doi.org/10.1136/bmj.318.7182.527",
        "theme": "obsidian",
        "likes": 412,
        "isPrimer": True,
        "createdAt": "2026-02-01",
        "slides": [
            {
                "type": "hero",
                "hook": "Randomized controlled trials (RCTs) eliminate selection bias and confounding factors, establishing causative therapeutic efficacy rather than mere correlation in clinical interventions."
            },
            {
                "type": "method",
                "title": "Random Allocation, Blinding & Intent-to-Treat",
                "content": "Participants are allocated to experimental or control cohorts via true random assignment, with double-blinding (neither clinician nor patient knows the treatment arm) to prevent psychological expectancy and observer bias, analyzed strictly by intention-to-treat."
            },
            {
                "type": "results",
                "title": "Quantifying Absolute & Relative Risk Reduction",
                "content": "Translates clinical endpoints into standardized effect sizes: Number Needed to Treat (NNT), Hazard Ratios (HR), and Odds Ratios with 95% confidence intervals, providing objective benchmarks for regulatory authorization and clinical guidelines."
            },
            {
                "type": "critique",
                "title": "External Validity & Population Heterogeneity",
                "content": "Strict inclusion criteria can limit generalizability to multimorbid real-world patients. Modern trials increasingly adopt adaptive platform designs and pragmatic real-world evidence (RWE) registries to complement classical RCTs."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "For centuries, clinical medicine was guided by observational anecdote, mechanistic reasoning, and clinical authority. However, observational comparisons inevitably suffer from confounding by indication: sicker patients are often prescribed different treatments than healthier patients. Without systematic random allocation, it was mathematically impossible to separate true therapeutic efficacy from natural disease remission or underlying baseline prognostic disparities."
            },
            {
                "heading": "The Core Mechanism",
                "body": "The randomized controlled trial solves this fundamental dilemma through probabilistic symmetry. By randomly assigning eligible individuals to parallel treatment and control arms, both observed characteristics (like age, biomarkers, and comorbidities) and unobserved confounders (such as lifestyle factors and genetic predispositions) are distributed identically between groups. Double-blinding further insulates subjective reporting from placebo and clinician observer expectations."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Systematic reviews synthesized under the Cochrane collaboration demonstrate that unblinded observational studies consistently overestimate treatment benefits by up to thirty to forty percent. Landmark multi-center cardiovascular, oncology, and infectious disease trials established how precise power calculations, predefined primary endpoints, and independent Data Safety Monitoring Boards safeguard scientific validity."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Mastering the mechanics of randomized trials is essential for appraising modern drug approvals and health technology assessments. While RCTs remain the gold standard of causal proof, they require significant financial investment and time. Contemporary medicine bridges these challenges through Bayesian adaptive trial designs and master protocols that evaluate multiple therapies simultaneously."
            }
        ]
    },
    {
        "id": "primer-med-02",
        "title": "Monoclonal Antibodies: Engineering Molecular Targeting in Human Immunotherapy",
        "authors": "Georges Köhler, César Milstein (Foundational Series)",
        "field": "Clinical Medicine & Health",
        "doi": "https://doi.org/10.1038/256495a0",
        "theme": "deepblue",
        "likes": 389,
        "isPrimer": True,
        "createdAt": "2026-02-05",
        "slides": [
            {
                "type": "hero",
                "hook": "Hybridoma technology and recombinant genetic engineering transform the immune system's natural antibodies into uniform, highly targeted therapeutic missiles capable of binding exact disease epitopes."
            },
            {
                "type": "method",
                "title": "Hybridoma Fusion & Humanization Architecture",
                "content": "Fusing antibody-producing B lymphocytes with immortal myeloma cells creates hybridomas that produce identical monoclonal antibodies. Recombinant engineering replaces non-human constant regions with human sequences to eliminate immunogenicity."
            },
            {
                "type": "results",
                "title": "Receptor Neutralization & Immune Checkpoint Blockade",
                "content": "Engineered monoclonal antibodies selectively neutralize oncogenic receptors (e.g., HER2, VEGF) or disinhibit exhausted cytotoxic T cells by blocking checkpoint receptors (PD-1/PD-L1, CTLA-4), driving durable cancer remissions."
            },
            {
                "type": "critique",
                "title": "Solid Tumor Penetration & Resistance Escape",
                "content": "Large immunoglobulin molecular weight (~150 kDa) restricts transport across dense tumor stroma. Next-generation modalities utilize bispecific T-cell engagers (BiTEs) and antibody-drug conjugates (ADCs) to overcome resistance."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Classical pharmacology relied predominantly on small molecules that passively diffused through tissues. While effective for simple enzyme pockets, small molecules struggle to selectively modulate extensive, flat protein-protein interaction surfaces or differentiate closely homologous cell-surface receptors without causing severe off-target cytotoxicity."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Monoclonal antibodies exploit the evolutionary specificity of the adaptive immune system. By isolating a single B-cell clone and fusing it with immortalized myeloma cells, researchers establish continuous bio-manufacturing lines for uniform immunoglobulin molecules. Complementarity-determining regions on the antibody variable fragments match three-dimensional conformational targets with nanomolar affinity."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The transition from murine to chimeric, humanized, and fully human recombinant antibodies eliminated anti-drug immune reactions and extended serum half-lives to weeks. Clinical trials confirmed dramatic survival benefits across metastatic melanoma, non-small-cell lung carcinoma, lymphoma, and autoimmune diseases such as rheumatoid arthritis."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Targeted biologic therapies have fundamentally redefined modern medical oncology and rheumatology. Ongoing developments focus on antibody-drug conjugates that deliver cytotoxic payloads directly to tumor cells, as well as multispecific constructs designed to bring immune killer cells into direct contact with malignant targets."
            }
        ]
    },

    # Economics & Quantitative Finance
    {
        "id": "primer-econ-01",
        "title": "Nash Equilibrium: Strategic Interaction and Non-Cooperative Game Theory",
        "authors": "John F. Nash Jr. (Foundational Series)",
        "field": "Economics & Quantitative Finance",
        "doi": "https://doi.org/10.1073/pnas.36.1.48",
        "theme": "emerald",
        "likes": 470,
        "isPrimer": True,
        "createdAt": "2026-02-10",
        "slides": [
            {
                "type": "hero",
                "hook": "In strategic encounters where individual outcomes depend on the choices of others, a Nash Equilibrium is a state where no participant can gain by unilaterally deviating from their chosen strategy."
            },
            {
                "type": "method",
                "title": "Payoff Matrices, Best Responses & Kakutani Fixed Points",
                "content": "Defines utility functions over action profiles. A strategy profile is an equilibrium if each agent's strategy maximizes their expected payoff given the choices of all opponents. Proven to exist in mixed strategies via Kakutani's fixed-point theorem."
            },
            {
                "type": "results",
                "title": "From Oligopoly Pricing to Mechanism Design",
                "content": "Provides the foundational mathematical framework for analyzing Cournot duopolies, spectrum auctions, wage bargaining, geopolitical deterrence, and computational algorithmic game theory."
            },
            {
                "type": "critique",
                "title": "Multiple Equilibria & Bounded Rationality",
                "content": "Many dynamic games admit multiple equilibria with no intrinsic selection rule, and empirical human players frequently exhibit behavioral biases and reciprocal fairness that diverge from hyper-rational assumptions."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Classical competitive economics assumed that individual market participants were price-takers who could ignore how their decisions affected others. However, in concentrated markets, international negotiations, and strategic environments, every agent's optimal decision directly depends on the deliberate actions chosen by their rivals."
            },
            {
                "heading": "The Core Mechanism",
                "body": "John Nash generalized von Neumann and Morgenstern's zero-sum game theory to non-zero-sum interactions with arbitrary numbers of players. A Nash Equilibrium describes a configuration of strategies in which every player's choice is an optimal response to the anticipated choices of all other players. Crucially, Nash proved that every finite game possesses at least one equilibrium in mixed (probabilistic) strategies."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Game theoretic equilibrium models transformed market design, culminating in modern multi-billion dollar FCC spectrum auctions, matching algorithms for medical residency assignments, and organ donor exchange networks. Experimental economics verified that under repeated play and learning dynamics, human subjects systematically converge toward equilibrium predictions."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Game theory provides the universal language of modern microeconomics, political science, and multi-agent artificial intelligence. Modern extensions incorporate incomplete information (Bayesian games), dynamic commitment (subgame perfection), and algorithmic complexity constraints."
            }
        ]
    },
    {
        "id": "primer-econ-02",
        "title": "The Efficient Market Hypothesis & Modern Asset Pricing",
        "authors": "Eugene F. Fama, Fischer Black (Foundational Series)",
        "field": "Economics & Quantitative Finance",
        "doi": "https://doi.org/10.1111/j.1540-6261.1970.tb00518.x",
        "theme": "obsidian",
        "likes": 425,
        "isPrimer": True,
        "createdAt": "2026-02-12",
        "slides": [
            {
                "type": "hero",
                "hook": "In liquid, competitive capital markets, asset prices instantaneously reflect all available information, meaning future price fluctuations follow a random walk driven entirely by unpredictable news."
            },
            {
                "type": "method",
                "title": "Three Forms of Efficiency & The Joint Hypothesis Problem",
                "content": "Categorizes informational efficiency into weak (past prices), semi-strong (public news), and strong (private insider knowledge). Demonstrates that testing efficiency always requires joint assumption of an equilibrium asset pricing model (e.g. CAPM or Multi-Factor models)."
            },
            {
                "type": "results",
                "title": "Passive Indexing Superiority & Factor Premiums",
                "content": "Empirical studies consistently verify that the vast majority of active mutual funds fail to outperform low-cost market indexes net of fees, confirming that excess returns (alpha) reflect systematic risk factor exposures (size, value, momentum)."
            },
            {
                "type": "critique",
                "title": "Behavioral Anomalies, Bubbles & Limits to Arbitrage",
                "content": "Market crashes, asset bubbles, and persistent momentum effects indicate that real-world capital constraints and human sentiment prevent arbitrageurs from instantly erasing mispricings."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Prior to the 1960s, financial practitioners believed that technical chart patterns and fundamental valuation heuristics allowed investors to routinely beat the market. However, early statistical analyses of stock price trajectories revealed that price changes were virtually indistinguishable from independent random variables."
            },
            {
                "heading": "The Core Mechanism",
                "body": "The Efficient Market Hypothesis explains why randomness emerges: in a market with thousands of profit-seeking participants, any predictable pattern or undervalued asset is immediately identified and traded upon until the pricing discrepancy vanishes. Consequently, prices only change in response to new information, which is, by definition, unpredictable."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Decades of empirical data tracking thousands of investment portfolios confirmed that after accounting for transaction fees and management costs, active fund managers rarely generate persistent risk-adjusted outperformance. This insight catalyzed the trillions-of-dollars revolution toward index funds, exchange-traded funds, and systematic factor investing."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Modern quantitative finance views market efficiency not as an absolute binary law, but as a dynamic equilibrium where information costs and market microstructure frictions dictate how quickly prices adjust. Behavioral finance has enriched this framework by demonstrating how institutional constraints and cognitive biases create exploitable structural anomalies."
            }
        ]
    },

    # Pure & Applied Mathematics
    {
        "id": "primer-math-01",
        "title": "The Langlands Program: Unifying Number Theory, Geometry, and Analysis",
        "authors": "Robert Langlands, Andrew Wiles (Foundational Series)",
        "field": "Pure & Applied Mathematics",
        "doi": "https://doi.org/10.1090/S0273-0979-1979-14631-0",
        "theme": "deepblue",
        "likes": 510,
        "isPrimer": True,
        "createdAt": "2026-02-15",
        "slides": [
            {
                "type": "hero",
                "hook": "Often described as the grand unified theory of mathematics, the Langlands Program establishes deep, unexpected bridges connecting Galois representations in arithmetic to automorphic forms in harmonic analysis."
            },
            {
                "type": "method",
                "title": "Automorphic Representations & L-Functions",
                "content": "Associates L-functions (complex analytic functions generalizing the Riemann zeta function) to Galois groups of algebraic number fields on one side, and to irreducible representations of reductive algebraic groups on the other."
            },
            {
                "type": "results",
                "title": "The Modularity Theorem & Proof of Fermat's Last Theorem",
                "content": "The Wiles-Taylor proof that every semistable elliptic curve over the rationals is modular resolved Fermat's 350-year-old conjecture, providing monumental verification of the Langlands correspondence."
            },
            {
                "type": "critique",
                "title": "Higher-Dimensional & Geometric Generalizations",
                "content": "While the GL(2) case over rational fields is largely understood, establishing the correspondence for general Lie groups over arbitrary number fields remains one of the deepest challenges in 21st-century mathematics."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Mathematics evolved into highly specialized disciplines: number theorists investigated discrete Diophantine equations and prime distributions, while analysts studied continuous differential equations, Fourier transforms, and symmetric spaces. For decades, these fields appeared separated by incompatible methodologies and conceptual languages."
            },
            {
                "heading": "The Core Mechanism",
                "body": "In 1967, Robert Langlands formulated a vast web of conjectures positing that the symmetries of algebraic polynomial equations (encoded by Galois representations) are mirrored by the spectral decomposition of continuous matrix groups (automorphic forms). The correspondence functions through Dirichlet L-functions, which encode arithmetic information in their coefficients and analytic symmetries in their functional equations."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The modularity theorem, proven by Andrew Wiles, Richard Taylor, and collaborators, established that every elliptic curve over the rational numbers is intimately tied to a weight-two modular form. This profound connection not only conquered Fermat's Last Theorem, but opened the floodgates for proving reciprocity laws across algebraic geometry."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Today, the Langlands Program has expanded into the Geometric Langlands correspondence, linking algebraic curves to quantum gauge field theories in mathematical physics. It stands as a master blueprint illustrating how seemingly distinct mathematical universes reflect identical underlying symmetries."
            }
        ]
    },
    {
        "id": "primer-math-02",
        "title": "Navier-Stokes Equations: Fluid Dynamics, Smoothness, and Turbulence",
        "authors": "Claude-Louis Navier, George Gabriel Stokes (Foundational Series)",
        "field": "Pure & Applied Mathematics",
        "doi": "https://doi.org/10.1007/BF02418047",
        "theme": "obsidian",
        "likes": 465,
        "isPrimer": True,
        "createdAt": "2026-02-18",
        "slides": [
            {
                "type": "hero",
                "hook": "The Navier-Stokes equations govern the flow of liquids and gases everywhere in nature, yet proving whether mathematically smooth solutions always exist remains an unsolved Millennium Prize Problem."
            },
            {
                "type": "method",
                "title": "Conservation of Momentum & Viscous Dissipation",
                "content": "Applies Newton's second law to continuum fluid elements: rho*(du/dt + u*grad(u)) = -grad(p) + mu*laplacian(u) + f, coupling advective transport with pressure gradients and internal molecular viscous friction."
            },
            {
                "type": "results",
                "title": "Global Weak Solutions via Leray Energies",
                "content": "Jean Leray proved the existence of turbulent weak solutions in 1934 satisfying kinetic energy inequalities. In two dimensions, smooth solutions exist for all time; in three dimensions, singularity blow-up remains unproven."
            },
            {
                "type": "critique",
                "title": "Energy Cascade & Kolmogorov Microscales",
                "content": "Turbulence transfers kinetic energy from large macroscopic eddies down to microscopic Kolmogorov dissipation scales where viscosity converts motion into heat, challenging analytical boundary layer predictions."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Whether simulating ocean currents, aircraft wings, or blood flowing through human arteries, engineers rely on the Navier-Stokes partial differential equations. However, non-linear advection terms can theoretically cause local fluid velocity or vorticity to grow infinitely large in finite time, causing mathematical breakdowns."
            },
            {
                "heading": "The Core Mechanism",
                "body": "The equations formulate conservation of momentum for a Newtonian fluid element. The critical tension occurs between two opposing terms: the convective acceleration term (u * grad(u)), which stretches and folds vortex filaments, amplifying gradients, and the viscous dissipation term (laplacian(u)), which diffuses velocity differences and dampens motion."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Direct numerical simulations and wind-tunnel laser Doppler velocimetry confirm that turbulent energy follows Kolmogorov's celebrated negative five-thirds power law across the inertial subrange. While mathematicians can prove global smoothness in two dimensions, three-dimensional regularity remains a fundamental open problem."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Resolving whether finite-time singularities occur in 3D incompressible Navier-Stokes will not only claim the Clay Millennium Prize, but will clarify the mathematical limits of deterministic continuum physics and refine computational fluid dynamic turbulence modeling."
            }
        ]
    },

    # Psychology & Behavioral Science
    {
        "id": "primer-psych-01",
        "title": "Prospect Theory: Behavioral Economics and Decision-Making Under Risk",
        "authors": "Daniel Kahneman, Amos Tversky (Foundational Series)",
        "field": "Psychology & Behavioral Science",
        "doi": "https://doi.org/10.2307/1914185",
        "theme": "rose",
        "likes": 485,
        "isPrimer": True,
        "createdAt": "2026-02-20",
        "slides": [
            {
                "type": "hero",
                "hook": "Humans do not maximize expected utility; our choices are governed by psychological reference points, profound loss aversion, and non-linear probability weighting."
            },
            {
                "type": "method",
                "title": "S-Shaped Value Function & Framing Effects",
                "content": "Replaces absolute wealth with perceived gains and losses relative to a neutral baseline. The value function is concave for gains (risk aversion) and convex for losses (risk seeking), with a steeper slope for losses (loss aversion ratio ~ 2.0 to 2.5)."
            },
            {
                "type": "results",
                "title": "Overweighting Rare Events & Endowment Effect",
                "content": "Explains why people simultaneously purchase lottery tickets (overweighting minuscule probabilities of huge gains) and insurance policies (overweighting tiny probabilities of catastrophic losses), and demand higher prices to part with owned goods."
            },
            {
                "type": "critique",
                "title": "Contextual Variation & Experience Gaps",
                "content": "Prospect theory was developed primarily using hypothetical text-based choice gambles. When decision-makers learn through repeated physical experience rather than descriptions, probability weighting patterns shift."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "For decades, neoclassical economics assumed that human agents made decisions by calculating expected utility across total wealth states. Under this paradigm, agents evaluated probabilistic options objectively and consistently. Yet in experimental settings, human choices systematically and repeatedly violated the axioms of expected utility theory."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Kahneman and Tversky formulated Prospect Theory to model actual human cognition. The theory introduces two fundamental innovations: first, carriers of value are changes in wealth relative to an adaptive reference point rather than absolute net worth. Second, an asymmetric S-shaped value function demonstrates that losses hurt approximately twice as much as equivalent gains feel pleasurable."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Countless empirical experiments demonstrated powerful framing effects: describing a medical surgical procedure as having a 90% survival rate leads to significantly higher patient consent than presenting it as having a 10% mortality rate, despite identical objective probabilities. Decision weighting curves confirmed that human intuition systematically overweights extreme tail risks."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Prospect Theory earned the 2002 Nobel Prize in Economic Sciences and sparked the behavioral economics revolution. It informs public policy nudge units, consumer interface architecture, financial risk assessment, and clinical communication protocols worldwide."
            }
        ]
    },

    # Ecology & Evolutionary Biology
    {
        "id": "primer-eco-01",
        "title": "The Modern Evolutionary Synthesis: Genetics Meets Natural Selection",
        "authors": "Theodosius Dobzhansky, Ernst Mayr (Foundational Series)",
        "field": "Ecology & Evolutionary Biology",
        "doi": "https://doi.org/10.1086/281691",
        "theme": "emerald",
        "likes": 440,
        "isPrimer": True,
        "createdAt": "2026-02-22",
        "slides": [
            {
                "type": "hero",
                "hook": "The Modern Synthesis unified Charles Darwin's theory of natural selection with Gregor Mendel's particulate genetics, establishing that evolution is the change in allele frequencies within populations over time."
            },
            {
                "type": "method",
                "title": "Population Genetics, Drift & Hardy-Weinberg Equilibrium",
                "content": "Models gene pools mathematically. In the absence of evolutionary forces, allele frequencies remain constant (Hardy-Weinberg). Evolution occurs via four primary mechanisms: natural selection, random genetic drift, gene flow, and mutation."
            },
            {
                "type": "results",
                "title": "Biological Species Concept & Allopatric Speciation",
                "content": "Defined species as interbreeding natural populations reproductively isolated from other groups. Demonstrates that geographical isolation drives genetic divergence and reproductive incompatibility over deep geological time."
            },
            {
                "type": "critique",
                "title": "Epigenetics, Neutral Drift & Extended Synthesis",
                "content": "Motoo Kimura's neutral theory demonstrated that most molecular variation is driven by genetic drift rather than positive selection. Modern evolutionary biology integrates transgenerational epigenetics, horizontal gene transfer, and developmental plasticity."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "In the early twentieth century, evolutionary biology faced a crisis: Darwin had proposed gradual natural selection acting on continuous phenotypic traits, but Gregor Mendel's discovered laws showed that inheritance was particulate and discrete. Many geneticists believed mutation alone drove sudden speciation, while field naturalists insisted on gradual ecological adaptation."
            },
            {
                "heading": "The Core Mechanism",
                "body": "The Modern Synthesis reconciled these disciplines by proving mathematically that continuous phenotypic variation is produced by the combined action of many discrete Mendelian genes (polygenic inheritance). Ronald Fisher, J.B.S. Haldane, and Sewall Wright formalized population genetics, demonstrating how selection pressures act on statistical allele distributions across generations."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Field studies on peppered moths, Darwin's Galapagos finches, and laboratory Drosophila populations verified that natural selection rapidly shifts genetic allele frequencies under environmental changes. Fossil strata corroborated that macroevolutionary patterns emerge from continuous microevolutionary processes operating across deep time."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "The Modern Synthesis remains the bedrock architecture of the life sciences, explaining everything from antibiotic resistance in pathogens to human ancestry. Modern evolutionary genomics enriches this foundation by studying molecular clocks, whole-genome duplications, and regulatory gene networks."
            }
        ]
    },

    # Philosophy & Ethics
    {
        "id": "primer-phil-01",
        "title": "Epistemic Justification: What Separates True Knowledge from Mere Belief?",
        "authors": "Edmund Gettier, Robert Nozick (Foundational Series)",
        "field": "Philosophy & Ethics",
        "doi": "https://doi.org/10.1093/analys/23.6.121",
        "theme": "amber",
        "likes": 395,
        "isPrimer": True,
        "createdAt": "2026-02-25",
        "slides": [
            {
                "type": "hero",
                "hook": "For two millennia, philosophy defined knowledge as Justified True Belief. In 1963, a three-page paper by Edmund Gettier demonstrated that someone can have justified true belief purely by luck, shattering the definition."
            },
            {
                "type": "method",
                "title": "Counterexamples to the Tripartite Definition",
                "content": "Gettier constructed scenarios where an agent has strong, rational justification for believing proposition P, and P is factually true, yet the truth of P depends on facts completely disconnected from the agent's justification."
            },
            {
                "type": "results",
                "title": "Foundationalism, Coherentism & Reliabilism",
                "content": "Catalyzed modern epistemology into developing fourth conditions: tracking theories of truth (Nozick's counterfactual conditionals), causal theories of knowledge, and process reliabilism (justification requires truth-conducive cognitive faculties)."
            },
            {
                "type": "critique",
                "title": "Radical Skepticism & Machine Epistemology",
                "content": "Addressing Gettier problems has gained urgency in artificial intelligence: how can we verify whether deep learning representations possess authentic causal understanding rather than justified statistical correlation?"
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Ever since Plato's Theaetetus, Western philosophy accepted that to know something, three conditions were necessary and sufficient: you must believe it, it must be true, and your belief must be justified. This tripartite account formed the bedrock for evaluating scientific evidence, legal testimony, and rational discourse."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Edmund Gettier refuted this assumption with concise counterexamples. Suppose an applicant is justified in believing that Jones will get a job and has ten coins in his pocket, inferring that the person with ten coins will get the job. Unknown to the applicant, he himself gets the job and coincidentally has ten coins in his pocket. His belief was true and justified, yet calling it genuine knowledge feels absurd."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The Gettier revelation forced epistemologists to recognize epistemic luck as a critical confounder. Alvin Goldman proposed causal theories of knowledge, while Robert Nozick introduced truth-tracking: knowledge requires that if the proposition were false, you would not believe it, and if it were true in varied circumstances, you would continue to believe it."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Modern epistemology informs the philosophy of science, cryptographic verification protocols, and algorithmic explainability. As artificial neural networks generate fluent assertions, distinguishing between stochastic mimicry and reliable epistemic justification is a defining intellectual challenge."
            }
        ]
    },

    # Law & Jurisprudence
    {
        "id": "primer-law-01",
        "title": "The Concept of Law: Primary Rules, Secondary Rules, and Legal Positivism",
        "authors": "H.L.A. Hart, Ronald Dworkin (Foundational Series)",
        "field": "Law & Jurisprudence",
        "doi": "https://doi.org/10.1093/acprof:oso/9780199644704.001.0001",
        "theme": "rose",
        "likes": 380,
        "isPrimer": True,
        "createdAt": "2026-02-28",
        "slides": [
            {
                "type": "hero",
                "hook": "Law is not merely the sovereign's command backed by threat of force; it is a unified union of primary rules of conduct and secondary rules of adjudication, change, and recognition."
            },
            {
                "type": "method",
                "title": "The Rule of Recognition & Internal Legal Attitude",
                "content": "Posits that every legal system possesses a foundational social convention—the Rule of Recognition—that judicial officials accept from an internal point of view to determine which norms are legally binding and valid."
            },
            {
                "type": "results",
                "title": "Separation of Law and Morality",
                "content": "Hart's legal positivism established that whether a law is legally valid is distinct from whether it is morally good. This analytical clarity allows scholars to critique unjust laws without denying their operational systemic reality."
            },
            {
                "type": "critique",
                "title": "Dworkin's Hard Cases & Moral Principles",
                "content": "Ronald Dworkin challenged positivism by demonstrating that in hard judicial cases, judges do not exercise unfettered discretion; they rely on embedded moral and political principles that form the law's interpretive integrity."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Early legal theorists like John Austin reduced law to commands issued by a political sovereign and enforced through threats of violence. However, this model failed to differentiate between the legitimate authority of a constitutional legal system and the coercive demands of an armed bandit, ignoring why citizens feel a normative duty to obey rules."
            },
            {
                "heading": "The Core Mechanism",
                "body": "H.L.A. Hart resolved this by analyzing law as a system of social rules. He bifurcated legal norms into primary rules (which govern human conduct, like prohibitions against theft) and secondary rules (which govern how primary rules are identified, amended, and judicially enforced). Central to this is the Rule of Recognition: an ultimate criterion of legal validity accepted by courts."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Constitutional jurisprudence worldwide reflects Hart's architecture: supreme courts routinely use formal recognition criteria (such as legislative bicameralism and presidential promulgation) to validate statutes without resolving underlying moral disagreements in the political sphere."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Hart's framework remains the foundation of modern jurisprudence and constitutional theory. It provides the analytical toolkit for interpreting statutory ambiguity, international treaties, administrative regulation, and emerging algorithmic smart contracts."
            }
        ]
    },

    # History & Archaeology
    {
        "id": "primer-hist-01",
        "title": "Stratigraphy and Radiocarbon Dating: Reconstructing Ancient Chronologies",
        "authors": "Willard F. Libby, Kathleen Kenyon (Foundational Series)",
        "field": "History & Archaeology",
        "doi": "https://doi.org/10.1126/science.110.2869.678",
        "theme": "amber",
        "likes": 410,
        "isPrimer": True,
        "createdAt": "2026-03-02",
        "slides": [
            {
                "type": "hero",
                "hook": "Modern archaeology transformed from treasure hunting into an empirical science through stratigraphic deposition analysis and isotope physics that date ancient civilizations with calendar precision."
            },
            {
                "type": "method",
                "title": "The Law of Superposition & Carbon-14 Decay",
                "content": "Excavates stratigraphic sediment layers sequentially: lower strata are deposited earlier than higher layers. Carbon-14 decay (half-life of 5,730 years) measured via accelerator mass spectrometry dates organic artifacts up to 50,000 years ago."
            },
            {
                "type": "results",
                "title": "Dendrochronological Calibration Curves",
                "content": "Calibrates radiocarbon decay fluctuations against continuous tree-ring growth records (IntCal curves), establishing absolute calendar chronologies for the Neolithic agricultural revolution and Bronze Age trade networks."
            },
            {
                "type": "critique",
                "title": "Taphonomic Disturbance & Marine Reservoir Effects",
                "content": "Bioturbation by burrowing organisms can displace artifacts across layers, and marine diets introduce older carbon signatures, requiring multi-proxy contextual analysis with ancient paleogenomics."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Before the mid-twentieth century, historians depended almost entirely on surviving royal chronicles, king lists, and ceramic typology to date ancient civilizations. When written records did not survive, chronological estimates for prehistoric human migrations and technological transitions varied by thousands of years."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Willard Libby revolutionized archaeology by discovering that cosmic rays continually generate radioactive Carbon-14 in the upper atmosphere. Living organisms assimilate C-14 alongside stable carbon. Upon death, assimilation ceases and C-14 decays exponentially into Nitrogen-14. By measuring the ratio of remaining C-14 using mass spectrometry, scientists deduce the elapsed time since death."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Stratigraphic excavations at Jericho and Çatalhöyük calibrated by radiocarbon dating proved that urban settlements and agricultural domestications began over eleven thousand years ago. When combined with tree-ring dendrochronology, archaeological dating reached annual resolution across classical antiquity."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Isotopic physics, stable isotope dietary tracking, and ancient DNA extraction have transformed archaeology into a rigorous molecular science, allowing researchers to reconstruct human migrations, ecological collapses, and ancient pandemics with unprecedented empirical clarity."
            }
        ]
    },

    # Sociology & Political Science
    {
        "id": "primer-soc-01",
        "title": "Social Capital and The Strength of Weak Ties in Institutional Networks",
        "authors": "Mark Granovetter, Robert Putnam (Foundational Series)",
        "field": "Sociology & Political Science",
        "doi": "https://doi.org/10.1086/225469",
        "theme": "emerald",
        "likes": 430,
        "isPrimer": True,
        "createdAt": "2026-03-05",
        "slides": [
            {
                "type": "hero",
                "hook": "Novel information, job opportunities, and societal innovations do not spread through close friends, but through weak acquaintances who act as bridges between disparate social cliques."
            },
            {
                "type": "method",
                "title": "Network Graph Topology & Triadic Closure",
                "content": "Models human relations as graphs: strong ties form dense, redundant triangles where everyone knows everyone. Weak ties bridge separate connected components, preventing network fragmentation and structural holes."
            },
            {
                "type": "results",
                "title": "Institutional Civic Health & Collective Action",
                "content": "Putnam demonstrated that regions with robust bridging social capital exhibit higher voter turnout, effective governance, economic productivity, and resilience against institutional corruption."
            },
            {
                "type": "critique",
                "title": "Algorithmic Echo Chambers in Digital Networks",
                "content": "Contemporary social media platforms optimize for homophily and engagement, strengthening insular bonding capital while degrading the cross-cutting weak ties essential for democratic consensus."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Classical sociological theories viewed social structure either through individual rational choice or sweeping macroeconomic class divisions. However, neither framework could explain why certain communities achieved high collective civic coordination while others with identical economic resources suffered from institutional inertia and isolation."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Mark Granovetter introduced a network topology approach to human society. In his landmark thesis 'The Strength of Weak Ties,' he demonstrated that close friends share overlapping information pools, making them redundant sources of novelty. Casual acquaintances, by contrast, inhabit different social circles, serving as bridges through which novel ideas and opportunities diffuse."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Empirical studies across thousands of professional hires verified that the majority of successful career transitions originated through casual weak connections rather than close confidants. Sociological surveys by Robert Putnam across Italian and American communities confirmed that horizontal civic networks correlate directly with governmental performance and economic growth."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Network sociology and social capital theory now underpin modern organizational design, public health epidemiology, and computational social science, providing mathematical frameworks to analyze how contagion, consensus, and polarization spread across human institutions."
            }
        ]
    },

    # Linguistics & Language Science
    {
        "id": "primer-ling-01",
        "title": "Generative Grammar and Universal Grammar: The Computational Basis of Human Language",
        "authors": "Noam Chomsky, Morris Halle (Foundational Series)",
        "field": "Linguistics & Language Science",
        "doi": "https://doi.org/10.1515/9783110857337",
        "theme": "deepblue",
        "likes": 450,
        "isPrimer": True,
        "createdAt": "2026-03-08",
        "slides": [
            {
                "type": "hero",
                "hook": "Human language is not learned by passive imitation, but by an innate biological computational system capable of generating an infinite variety of structured expressions from finite syntactic rules."
            },
            {
                "type": "method",
                "title": "Poverty of the Stimulus & Hierarchical Syntax",
                "content": "Demonstrates that children acquire complex grammatical constraints without explicit correction, despite impoverished linguistic input. Proves that syntactic rules operate on hierarchical tree structures, never on linear word order."
            },
            {
                "type": "results",
                "title": "Principles, Parameters & Recursive Merge",
                "content": "Formalizes the Minimalist Program: a core recursive operation ('Merge') combines lexical elements into set-theoretic structures, accounting for the unbounded productivity unique to human cognition."
            },
            {
                "type": "critique",
                "title": "Connectionist & Transformer Emergence",
                "content": "Modern neural language models learn fluent syntactic structures purely from statistical token prediction over massive internet corpora, challenging classical claims regarding the necessity of hardcoded innate universal grammars."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Mid-twentieth-century behavioral psychology claimed that language was acquired through operant conditioning and habit formation: children merely repeated phrases reinforced by adults. However, this could not explain how five-year-old children effortlessly produce and understand sentences they have never heard before."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Noam Chomsky launched the cognitive revolution by demonstrating the 'poverty of the stimulus': the linguistic data a child hears is noisy, incomplete, and devoid of negative feedback, yet all children develop adult grammatical competence in their native tongue. Chomsky proposed that humans are biologically endowed with a Language Acquisition Device encoding Universal Grammar."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Psycholinguistic experiments confirmed that across all six thousand human languages, syntactic operations depend strictly on hierarchical phrase structures rather than linear serial distance. Studies on deaf children creating Nicaraguan Sign Language demonstrated that human brains spontaneously generate structured grammatical syntax in a single generation."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Generative linguistics revolutionized cognitive science, formal language theory, and computer science (the Chomsky Hierarchy of grammars and automata). The ongoing dialogue between innate symbolic grammar and modern statistical deep learning continues to redefine the science of the human mind."
            }
        ]
    }
]

# Append new primers if not already present
existing_ids = set(p['id'] for p in primers)
added = 0
for p in new_primers:
    if p['id'] not in existing_ids:
        primers.append(p)
        added += 1

with open('primer-data.json', 'w', encoding='utf-8') as f:
    json.dump(primers, f, indent=2, ensure_ascii=False)

print(f"Added {added} new primers. Total primers in primer-data.json: {len(primers)}")
