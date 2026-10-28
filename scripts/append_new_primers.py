#!/usr/bin/env python3
"""
append_new_primers.py
Appends 10 new, rich first-principles 101 foundational folios across the 5 new disciplines:
- Climate & Earth Systems
- Robotics & Autonomous Systems
- Computational Chemistry
- Cryptographic Science
- Cognitive Science
"""

import json

NEW_PRIMERS = [
    # ------------------ CLIMATE & EARTH SYSTEMS ------------------
    {
        "id": "primer-climate-01",
        "title": "The Greenhouse Effect & Radiative Forcing: The Physics of Planetary Energy Balance",
        "authors": "Svante Arrhenius & Planetary Physics Foundations",
        "field": "Climate & Earth Systems",
        "theme": "emerald",
        "likes": 488,
        "isPrimer": True,
        "createdAt": "2026-02-10",
        "slides": [
            {
                "type": "hero",
                "hook": "Planetary temperature is governed by an exquisite thermodynamic equilibrium: incoming shortwave solar radiation must precisely balance outgoing longwave infrared radiation radiated back to space."
            },
            {
                "type": "method",
                "title": "The Stefan-Boltzmann Law & Molecular Dipoles",
                "content": "Earth's surface radiates heat in the thermal infrared spectrum (4–50 µm). While symmetric diatomic molecules (N2, O2) are transparent to infrared, asymmetric polyatomic molecules (H2O, CO2, CH4) have vibrational modes that create transient electric dipoles, absorbing and re-radiating thermal photons in all directions."
            },
            {
                "type": "results",
                "title": "Radiative Forcing & The Effective Emission Height",
                "content": "Adding greenhouse gases raises the average altitude from which infrared radiation escapes to space. Because the troposphere cools with altitude (lapse rate), this higher emission layer is colder and radiates less energy. To restore equilibrium, the entire lower atmosphere must warm."
            },
            {
                "type": "critique",
                "title": "Climate Sensitivity & Feedback Loops",
                "content": "While basic radiative transfer dictates ~1.2°C warming per doubling of CO2, non-linear feedback loops—such as water vapor feedback, ice-albedo loss, and cloud microphysics—amplify the equilibrium climate sensitivity to 2.5°C–4.0°C."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "In the nineteenth century, physicist Joseph Fourier calculated that a planet at Earth's distance from the Sun should possess a global surface temperature around -18°C, freezing all water into solid ice. Yet Earth's actual average temperature was approximately +15°C. Reconciling this 33-degree discrepancy required discovering how an invisible atmospheric blanket traps thermal energy while remaining transparent to visible sunlight."
            },
            {
                "heading": "The Core Mechanism",
                "body": "The atmosphere functions through selective quantum absorption. High-energy solar photons in the visible spectrum pass through nitrogen and oxygen unhindered, heating the continental surface and oceans. In turn, the warmed planet radiates energy back upward as low-energy infrared photons. When an infrared photon encounters a carbon dioxide or water vapor molecule, its wavelength matches the natural vibrational bending frequency of the chemical bonds. The molecule absorbs the photon, briefly vibrates, and re-emits the energy in a random direction, sending roughly half the radiation back toward the planetary surface."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Laboratory spectroscopy pioneered by John Tyndall and satellite measurements from NASA's AIRS instrument confirmed this mechanism with astronomical precision. Satellite instruments looking down at Earth observe massive absorption troughs corresponding exactly to the 15-micrometer vibrational band of CO2, confirming that thermal photons in this frequency range cannot escape directly to space."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Radiative transfer physics forms the rock-solid foundation of all planetary climatology and exoplanet atmospheric characterization. However, predicting regional impacts requires modeling chaotic Navier-Stokes fluid motions, cloud droplet nucleation, and ocean overturning, making long-term regional weather variability an active computational frontier."
            }
        ]
    },
    {
        "id": "primer-climate-02",
        "title": "Thermohaline Circulation: The Global Ocean Conveyor Belt and Climate Tipping Points",
        "authors": "Henry Stommel & Physical Oceanography Foundations",
        "field": "Climate & Earth Systems",
        "theme": "deepblue",
        "likes": 462,
        "isPrimer": True,
        "createdAt": "2026-02-14",
        "slides": [
            {
                "type": "hero",
                "hook": "The global climate is stabilized by a colossal underwater conveyor belt driven not by winds, but by microscopic differences in water temperature (thermo) and salinity (haline)."
            },
            {
                "type": "method",
                "title": "Deep Water Formation & The North Atlantic Sink",
                "content": "As warm tropical water flows north via the Gulf Stream, cold Arctic winds evaporate surface moisture, leaving behind saltier, denser water. Near Greenland, this hyper-dense water plummets miles downward to the ocean abyss, sucking more warm water poleward behind it."
            },
            {
                "type": "results",
                "title": "Global Heat Redistribution",
                "content": "The Atlantic Meridional Overturning Circulation (AMOC) delivers over a petawatt (10^15 watts) of heat to the Northern Hemisphere, maintaining mild climates across Northern Europe that would otherwise match the subarctic chill of Labrador."
            },
            {
                "type": "critique",
                "title": "The Freshwater Tipping Point",
                "content": "Accelerated melting of the Greenland ice sheet dumps vast quantities of buoyant freshwater into the North Atlantic, diluting surface salinity. If water cannot become dense enough to sink, the circulation risks bistable collapse."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Early navigators knew of warm ocean surface currents like the Gulf Stream, but classical fluid mechanics could not explain why surface currents did not simply cancel out at shallow depths. Oceanographers needed to map the complete three-dimensional planetary circulation that ventilates the abyssal sea floor and redistributes equatorial heat toward the poles."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Physical oceanographer Henry Stommel demonstrated that density gradients drive deep circulation. Density in seawater is governed by two parameters: temperature and salt concentration. In the polar North Atlantic and the Weddell Sea off Antarctica, intense atmospheric cooling and sea-ice brine rejection dramatically increase surface water density. When this heavy water sinks, it establishes deep boundary currents that travel along the ocean floor for thousands of miles, gradually upwelling in the Indian and Pacific Oceans over a thousand-year transit cycle."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Paleoclimatic ice cores and oceanic sediment records (such as Heinrich events and Dansgaard-Oeschger cycles) reveal that the AMOC has abruptly slowed or collapsed in Earth's geological past, triggering rapid 5°C–10°C regional temperature drops across the North Atlantic within decades. Modern moored sensor arrays (RAPID-MOCHA) continuously measure this flow, tracking subtle decadal fluctuations."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Understanding ocean overturning is essential for forecasting multi-decadal climate shifts, sea-level rise along coastlines, and marine oxygen depletion. The primary scientific frontier lies in determining the precise freshwater flux threshold that could destabilize the modern AMOC into a slower, weakened operational state."
            }
        ]
    },

    # ------------------ ROBOTICS & AUTONOMOUS SYSTEMS ------------------
    {
        "id": "primer-robot-01",
        "title": "Inverse Kinematics & Degrees of Freedom: How Robotic Limbs Navigate 3D Space",
        "authors": "Richard Paul & Robotic Kinematics Foundations",
        "field": "Robotics & Autonomous Systems",
        "theme": "obsidian",
        "likes": 530,
        "isPrimer": True,
        "createdAt": "2026-02-18",
        "slides": [
            {
                "type": "hero",
                "hook": "Telling a robot where to place its hand is easy; calculating the exact angles every joint must rotate to get it there without collision is one of the foundational challenges of robotics."
            },
            {
                "type": "method",
                "title": "Forward vs. Inverse Kinematics",
                "content": "Forward kinematics calculates the end-effector position from given joint angles using trigonometry and transformation matrices (Denavit-Hartenberg parameters). Inverse Kinematics (IK) works backwards: given a target Cartesian coordinate (X, Y, Z, roll, pitch, yaw), solve for the joint angles."
            },
            {
                "type": "results",
                "title": "The Jacobian & Kinematic Singularities",
                "content": "The Jacobian matrix maps joint velocities to Cartesian tip velocities. When the determinant of the Jacobian approaches zero, the robot hits a 'singularity'—losing one or more degrees of freedom, requiring infinite joint speed to move in certain directions."
            },
            {
                "type": "critique",
                "title": "Redundancy & Obstacle Avoidance",
                "content": "A human arm has 7 degrees of freedom, meaning infinite elbow positions can achieve the same hand grip. Modern robotics uses null-space optimization and learned trajectory policies to leverage this redundancy for real-time obstacle avoidance."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "When a human reaches for a cup of coffee, the brain effortlessly coordinates shoulder rotation, elbow flexion, and wrist orientation. For an autonomous machine, however, motion occurs entirely in 'joint space' (motor rotations in radians), while the task is specified in 'operational space' (three-dimensional coordinates in millimeters). Translating desired end-effector goals into precise motor commands requires solving highly non-linear systems of trigonometric equations in real time."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Forward kinematics maps joint angles into 3D coordinates using homogenous transformation matrices, which is always unique and straightforward. Inverse kinematics, however, is notoriously ill-posed: a 6-axis articulated arm can often reach the exact same target through multiple distinct poses (e.g., elbow-up versus elbow-down configurations). Roboticists formulate this mathematically using the Jacobian matrix, which relates differential joint velocities to Cartesian velocity vectors, iteratively stepping toward the target using damped least-squares algorithms."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Industrial automation in automotive assembly lines proved that analytical and numerical IK solvers could achieve sub-millimeter repeatable precision at high accelerations. In humanoid robotics, whole-body inverse kinematics coordinates leg joints, waist posture, and arm reaching simultaneously while guaranteeing that the robot's center of mass stays inside its dynamic polygon of support."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Inverse kinematics forms the core operating engine of surgical robots, robotic prosthetics, and space manipulator arms. Current research frontiers focus on merging classical kinematic guarantees with learned neural representations, enabling robots to dynamically adapt to unexpected physical contact without computational lag."
            }
        ]
    },
    {
        "id": "primer-robot-02",
        "title": "SLAM Decoded: How Autonomous Agents Map Unknown Worlds While Localizing Themselves",
        "authors": "Hugh Durrant-Whyte & Spatial Robotics Foundations",
        "field": "Robotics & Autonomous Systems",
        "theme": "deepblue",
        "likes": 514,
        "isPrimer": True,
        "createdAt": "2026-02-22",
        "slides": [
            {
                "type": "hero",
                "hook": "To navigate an unfamiliar room, a robot must answer two questions simultaneously: 'What does the environment look like?' and 'Where am I inside it?'—the classic chicken-or-egg problem of SLAM."
            },
            {
                "type": "method",
                "title": "Sensory Fusion & State Estimation",
                "content": "Simultaneous Localization and Mapping (SLAM) integrates noisy sensor streams: wheel odometry, inertial measurement units (IMUs), and spatial sensors (LiDAR or cameras). Extended Kalman Filters and particle filters maintain a probabilistic belief distribution over the robot's pose."
            },
            {
                "type": "results",
                "title": "Loop Closure & Drift Correction",
                "content": "As a robot travels, small sensor inaccuracies compound into catastrophic dead-reckoning drift. SLAM solves this through 'Loop Closure': recognizing a previously visited landmark and running graph optimization (pose graph SLAM) to retroactively snap the entire map into alignment."
            },
            {
                "type": "critique",
                "title": "From Sparse Points to Neural Radiance Fields",
                "content": "Traditional SLAM builds geometric point-cloud maps. Today's frontier explores Neural Radiance Fields (NeRFs) and 3D Gaussian Splatting, enabling robots to reconstruct photorealistic volumetric representations in real time."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Autonomous vehicles, planetary rovers, and indoor vacuum robots often operate in environments where GPS signals are blocked or non-existent. Without an external positioning beacon, relying solely on wheel rotations leads to cumulative errors: a tiny slip on carpet compounds over ten meters into a multi-meter navigational error, causing the robot to collide with walls or lose its orientation entirely."
            },
            {
                "heading": "The Core Mechanism",
                "body": "SLAM resolves this paradox through probabilistic state estimation. The robot extracts distinctive visual features or spatial corners from its environment, recording their relative distances and bearing angles. As the robot moves, it predicts its new position using internal physics models (odometry) and immediately checks this against new sensor sightings. By constructing a Bayesian state-space graph where nodes represent robot poses and edges represent sensor constraints, non-linear optimization algorithms (such as Levenberg-Marquardt) iteratively adjust all estimated positions to minimize total sensor discrepancy."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The success of NASA's Mars Exploration Rovers and modern autonomous vacuum cleaners validated that visual-inertial and LiDAR SLAM can operate continuously for kilometers with sub-percentage drift. Recognizing a landmark from a different angle triggers 'loop closure', which mathematically propagates corrections backward through the entire trajectory history."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "SLAM is the foundational prerequisite for self-driving vehicles, augmented reality headsets, and planetary exploration. Current engineering frontiers focus on dynamic environments where furniture moves and humans walk, requiring semantic understanding to separate permanent architectural landmarks from transient moving obstacles."
            }
        ]
    },

    # ------------------ COMPUTATIONAL CHEMISTRY ------------------
    {
        "id": "primer-chem-01",
        "title": "Molecular Dynamics & Force Fields: Simulating Atomic Motion from Newton's Laws",
        "authors": "Martin Karplus, Michael Levitt (Foundational Series)",
        "field": "Computational Chemistry",
        "theme": "obsidian",
        "likes": 479,
        "isPrimer": True,
        "createdAt": "2026-02-25",
        "slides": [
            {
                "type": "hero",
                "hook": "By treating atoms as billiard balls connected by springs, molecular dynamics uses classical physics to simulate how complex proteins and drug molecules dance on the femtosecond timescale."
            },
            {
                "type": "method",
                "title": "The Empirical Force Field",
                "content": "Direct quantum mechanics is too computationally heavy for 100,000 atoms. Force fields (such as CHARMM, AMBER) approximate atomic interactions: harmonic springs for covalent bonds, torsional potentials for dihedral angles, and Lennard-Jones/Coulomb equations for non-bonded van der Waals and electrostatic charges."
            },
            {
                "type": "results",
                "title": "Numerical Integration via Verlet Algorithms",
                "content": "Taking femtosecond time steps (10^-15 s), the simulation computes the net force on every atom using F = -∇V, applies Newton's F = ma, and steps atomic velocities and positions forward in time to generate a dynamic trajectory."
            },
            {
                "type": "critique",
                "title": "The Timescale Gap & Machine Learning Potentials",
                "content": "Biological events like drug unbinding often take milliseconds—requiring trillions of femtosecond steps. Modern computational chemistry bridges this gap using enhanced sampling techniques and equivariant neural network potentials (e.g., NequIP, MACE)."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "X-ray crystallography and cryo-electron microscopy produce stunning three-dimensional snapshots of biological macromolecules, but these static structures are frozen in time. In real cells, proteins undergo continuous conformational flexing, opening transient cryptographic pockets and catalyzing reactions through dynamic motion. Biologists needed a computational telescope capable of watching atomic motions unfold in real time."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Martin Karplus, Michael Levitt, and Arieh Warshel pioneered Molecular Dynamics (MD) by demonstrating that classical Newtonian mechanics can accurately approximate atomic trajectories when parametrized by empirical force fields. The total potential energy of the molecular system is represented as a sum of bonded terms (bond stretching, angle bending, dihedral rotations) and non-bonded terms (electrostatic attractions and short-range Pauli repulsions). By computing the spatial gradient of this potential, software determines the exact force acting on each atom and steps the entire system forward in time."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "MD simulations correctly predicted the opening of the HIV-1 protease flap, guiding the rational design of life-saving antiretroviral drugs. Simulating hundreds of nanoseconds revealed that water molecules inside ion channels form single-file water wires that facilitate ultra-rapid proton transport, matching patch-clamp experimental measurements with extraordinary fidelity."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Molecular dynamics transformed pharmacology from trial-and-error chemistry into rational structure-based drug design. The persistent limitation remains temporal scale: chemical bond vibrations dictate time steps of roughly 2 femtoseconds, meaning simulating a single millisecond of biological time requires billions of sequential force evaluations, driving specialized supercomputing hardware like Anton."
            }
        ]
    },
    {
        "id": "primer-chem-02",
        "title": "Density Functional Theory (DFT): Solving the Schrödinger Equation for Complex Molecules",
        "authors": "Walter Kohn, Pierre Hohenberg (Foundational Series)",
        "field": "Computational Chemistry",
        "theme": "emerald",
        "likes": 505,
        "isPrimer": True,
        "createdAt": "2026-03-01",
        "slides": [
            {
                "type": "hero",
                "hook": "The exact Schrödinger equation for a caffeine molecule has 300 variables—impossible to solve. Density Functional Theory proved you only need 3: the spatial electron density."
            },
            {
                "type": "method",
                "title": "The Hohenberg-Kohn Theorems",
                "content": "Instead of solving a monstrous multi-electron wave function Ψ(r1, r2, ... rN), Hohenberg and Kohn proved that the ground-state properties of any quantum system are uniquely determined by the electron density n(r), which depends only on three spatial coordinates (x, y, z)."
            },
            {
                "type": "results",
                "title": "The Kohn-Sham Formulation",
                "content": "Kohn and Sham replaced the complex interacting many-body electron problem with a fictitious system of non-interacting electrons moving in an effective local potential, making quantum chemical calculations computationally tractable for hundreds of atoms."
            },
            {
                "type": "critique",
                "title": "The Exchange-Correlation Approximation",
                "content": "The exact mathematical form of the Exchange-Correlation functional remains unknown. Computational chemists rely on Jacob's Ladder of approximations—from LDA and GGA to hybrid functionals like B3LYP—each balancing speed against chemical accuracy."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Paul Dirac famously remarked in 1929 that the fundamental laws necessary for the mathematical theory of physics and chemistry were completely known through quantum mechanics, but the resulting equations were far too complicated to solve. For a system with N interacting electrons, the wave function is a mathematical function of 3N spatial coordinates. For even a modest molecule like benzene (42 electrons), storing the wave function on a grid would require more bytes than there are subatomic particles in the observable universe."
            },
            {
                "heading": "The Core Mechanism",
                "body": "In 1964, Walter Kohn and Pierre Hohenberg proved two revolutionary theorems: first, that all ground-state electronic properties of a molecule are uniquely and completely dictated by its electron density n(r)—a simple scalar field in ordinary three-dimensional space. Second, the true electron density minimizes the total energy functional. Kohn and Sham then introduced non-interacting single-particle orbitals that reproduce this exact density, reducing the impossible 3N-dimensional partial differential equation into a set of coupled 3-dimensional single-particle equations solved iteratively until self-consistency is reached."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "DFT revolutionized solid-state physics, materials design, and catalyst discovery. Chemical reactions, bond dissociation energies, and bandgaps predicted by DFT match empirical spectroscopy and thermochemistry within 1–2 kcal/mol accuracy. Over half of all papers published across modern condensed-matter physics and inorganic chemistry cite DFT calculations."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "DFT is the bedrock engine for designing battery cathodes, photovoltaic perovskites, and industrial catalysts. Its primary challenge lies in strongly correlated electron systems (such as high-temperature cuprate superconductors) and long-range London dispersion forces, where standard exchange-correlation approximations break down."
            }
        ]
    },

    # ------------------ CRYPTOGRAPHIC SCIENCE ------------------
    {
        "id": "primer-crypto-01",
        "title": "Public-Key Cryptography & RSA: The One-Way Mathematical Trapdoors Securing the Internet",
        "authors": "Whitfield Diffie, Martin Hellman, Ronald Rivest (Foundational Series)",
        "field": "Cryptographic Science",
        "theme": "obsidian",
        "likes": 551,
        "isPrimer": True,
        "createdAt": "2026-03-05",
        "slides": [
            {
                "type": "hero",
                "hook": "How can two strangers communicate securely across a public wire without ever meeting in advance to agree on a secret key? Public-key cryptography solved this with mathematical trapdoor functions."
            },
            {
                "type": "method",
                "title": "Asymmetric Keys & Modular Trapdoors",
                "content": "Traditional ciphers use the same key to lock and unlock. Asymmetric cryptography uses a keypair: a Public Key (distributed freely to encrypt messages) and a Private Key (kept secret to decrypt). Mathematically, computing forward is trivial, but computing backwards without the secret key is practically impossible."
            },
            {
                "type": "results",
                "title": "The RSA Prime Factorization Engine",
                "content": "Multiplying two 1024-bit prime numbers (p × q = N) takes microseconds. Factoring N back into p and q without knowing the factors would take classical supercomputers billions of years. Euler's Totient Theorem φ(N) = (p-1)(q-1) acts as the private trapdoor."
            },
            {
                "type": "critique",
                "title": "The Quantum Threat: Shor's Algorithm",
                "content": "In 1994, Peter Shor proved that a sufficiently large fault-tolerant quantum computer can factor large primes in polynomial time O((log N)^3). Modern cryptography is transitioning toward Post-Quantum lattice-based cryptography (like Kyber and Dilithium)."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "For thousands of years, cryptography faced an insurmountable physical bottleneck: key distribution. If Alice wanted to send an encrypted diplomatic dispatch to Bob, they first had to meet in secret or employ a trusted courier to exchange a shared codebook. If an adversary intercepted the courier, the entire cryptographic system crumbled. In an interconnected digital world with billions of smartphones, physical key exchange is impossible."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Diffie and Hellman proposed the conceptual breakthrough of asymmetric cryptography, realized practically by Rivest, Shamir, and Adleman (RSA). The system relies on a mathematical 'trapdoor one-way function'—an operation that is easy to compute in one direction, but computationally intractable to reverse unless one possesses specific privileged information. In RSA, multiplying two massive prime numbers p and q produces a modulus N. Using modular exponentiation, anyone can encrypt a message with N and public exponent e. However, decrypting requires knowing the private exponent d, which cannot be computed without factoring N into its original prime components."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Every secure web connection (HTTPS/TLS), online banking transaction, and encrypted chat application relies on asymmetric key exchange (such as Elliptic Curve Diffie-Hellman) to bootstrap secure symmetric communication. Decades of intensive cryptanalysis have failed to discover any classical polynomial-time algorithm for general prime factorization."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Public-key cryptography underpins the modern digital economy. However, because its security relies on mathematical problems with specific algebraic group structures (factoring and discrete logarithms), it is vulnerable to quantum algorithms. Global standards bodies (NIST) have finalized post-quantum cryptographic standards based on high-dimensional geometric lattice problems that resist quantum attack."
            }
        ]
    },
    {
        "id": "primer-crypto-02",
        "title": "Zero-Knowledge Proofs (ZKPs): How to Mathematically Prove Truth Without Revealing the Secret",
        "authors": "Shafi Goldwasser, Silvio Micali, Charles Rackoff (Foundational Series)",
        "field": "Cryptographic Science",
        "theme": "deepblue",
        "likes": 537,
        "isPrimer": True,
        "createdAt": "2026-03-10",
        "slides": [
            {
                "type": "hero",
                "hook": "Can you prove to someone that you know the password to a vault without revealing a single letter of the password? Zero-Knowledge Proofs turn this paradox into rigorous mathematics."
            },
            {
                "type": "method",
                "title": "The Three Foundational Pillars",
                "content": "A Zero-Knowledge Proof must satisfy three properties: 1. Completeness (if the statement is true, an honest verifier will be convinced), 2. Soundness (a cheating prover cannot convince the verifier of a false statement), 3. Zero-Knowledge (the verifier learns absolutely nothing except that the statement is true)."
            },
            {
                "type": "results",
                "title": "The Ali Baba Cave & Interactive Challenges",
                "content": "Through repeated probabilistic challenges (e.g., exiting a circular cave via path A or B), a prover proves knowledge of the secret door. With each round, the probability of a faker guessing correctly halves; after 40 rounds, the chance of cheating is less than one in a trillion (2^-40)."
            },
            {
                "type": "critique",
                "title": "Non-Interactive zk-SNARKs & Scalability",
                "content": "Modern cryptographic systems convert interactive protocols into non-interactive proofs (zk-SNARKs) using elliptic curve pairings and polynomial commitments (KZG), allowing blockchain systems to compress thousands of transactions into a single tiny verifiable proof."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "In traditional authentication and verification, proving that you possess an identity or credential requires presenting the credential itself: entering your password, sharing your government ID, or disclosing your financial history. This paradigm creates catastrophic vulnerabilities: servers store pools of private passwords, and verifying credentials exposes confidential information to theft and surveillance."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Goldwasser, Micali, and Rackoff resolved this by formalizing Zero-Knowledge Interactive Proofs. The system models a Prover who wishes to convince a Verifier that a mathematical statement is true (for instance, that a cryptographic hash matches a preimage). Rather than showing the secret, the Prover commits to randomized cryptographic statements and responds to unpredictable challenges from the Verifier. If the Prover possesses the secret, they can always answer correctly; if they are bluffing, they will fail the challenge with high probability. By leveraging polynomial arithmetic, the Verifier can confirm truth without extracting any computational leakage."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "The invention of zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) demonstrated that proofs can be compressed into a few hundred bytes and verified in milliseconds, regardless of how computationally massive the original computation was. This unlocked privacy-preserving cryptocurrencies (Zcash), verifiable machine learning computation, and decentralized layer-2 blockchain rollups."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Zero-knowledge proofs provide the architectural foundation for verifiable, privacy-preserving computation in an era of untrusted cloud computing and AI services. The primary engineering bottleneck remains proof generation: while verifying a zk-proof takes milliseconds, generating the proof requires significant computational memory and hardware acceleration."
            }
        ]
    },

    # ------------------ COGNITIVE SCIENCE ------------------
    {
        "id": "primer-cog-01",
        "title": "Dual-Process Theory: The Cognitive Architecture of System 1 Fast and System 2 Slow",
        "authors": "Daniel Kahneman & Amos Tversky (Foundational Series)",
        "field": "Cognitive Science",
        "theme": "amber",
        "likes": 564,
        "isPrimer": True,
        "createdAt": "2026-03-15",
        "slides": [
            {
                "type": "hero",
                "hook": "Human thinking is not a single unified intellect; it is a dynamic negotiation between two cognitive agents: System 1 (fast, automatic, and intuitive) and System 2 (slow, effortful, and analytical)."
            },
            {
                "type": "method",
                "title": "System 1 vs. System 2 Mechanics",
                "content": "System 1 operates autonomously and instantaneously with little or no effort (e.g., detecting anger in a voice, reading a billboard). System 2 allocates attention to effortful mental operations (e.g., calculating 17 × 24, checking a spreadsheet, parking in a narrow space)."
            },
            {
                "type": "results",
                "title": "Heuristics & Cognitive Biases",
                "content": "Because System 2 is computationally expensive and lazy, System 1 substitutes difficult questions with simpler heuristic shortcuts. This produces systematic cognitive biases: Anchoring, Availability bias, and Loss Aversion (losses hurt twice as much as equivalent gains feel good)."
            },
            {
                "type": "critique",
                "title": "The AI Parallel: Intuition vs System 2 Reasoning",
                "content": "Standard autoregressive LLMs operate like System 1: generating intuitive token predictions instantaneously. Today's frontier explores System 2 architectures: Chain-of-Thought, search trees (MCTS), and test-time compute scaling to enable deliberate self-checking."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "Classical economic models (such as Expected Utility Theory) assumed that human beings are rational utility-maximizing agents who objectively evaluate probabilities, calculate expected payoffs, and make optimal decisions. Yet empirical experiments consistently demonstrated that humans make irrational, self-contradictory choices, falling prey to emotional framing, arbitrary numerical anchors, and perceptual illusions. Cognitive scientists needed a psychological framework to explain how biological minds actually make decisions under uncertainty."
            },
            {
                "heading": "The Core Mechanism",
                "body": "Daniel Kahneman and Amos Tversky formulated Dual-Process Theory to explain this architectural trade-off. The human brain consumes roughly 20% of the body's metabolic energy despite accounting for only 2% of body mass. To survive, biological intelligence must conserve metabolic energy by offloading as many tasks as possible to System 1: a rapid, pattern-matching associative network that creates coherent causal narratives from sparse data. When System 1 encounters surprise or ambiguity, it mobilizes System 2: a serial, rule-governed processor capable of counterfactual reasoning, formal logic, and impulse control."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Pupillometry and fMRI scans confirm the metabolic reality of System 2: when subjects perform difficult mental arithmetic or suppress an intuitive impulse (the Stroop effect), their pupils dilate, heart rates increase, and prefrontal cortex glucose consumption surges. Prospect Theory proved that human decision-making under risk follows an S-shaped value curve, exhibiting pronounced risk aversion for gains and risk seeking for losses."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Dual-Process Theory revolutionized economics, public policy, and behavioral psychology. In artificial intelligence, it provides the primary blueprint for bridging purely intuitive generative models with deliberate multi-step reasoning engines, enabling machines to pause, plan, and verify hypotheses before generating actions."
            }
        ]
    },
    {
        "id": "primer-cog-02",
        "title": "Working Memory & Miller's Law: How the Human Brain Chunks and Manipulates Information",
        "authors": "George A. Miller, Alan Baddeley (Foundational Series)",
        "field": "Cognitive Science",
        "theme": "editorial",
        "likes": 498,
        "isPrimer": True,
        "createdAt": "2026-03-20",
        "slides": [
            {
                "type": "hero",
                "hook": "The human brain can store petabytes of long-term memories, yet its active working scratchpad is constrained to roughly seven distinct items at any single instant."
            },
            {
                "type": "method",
                "title": "Miller's Law & The Art of Chunking",
                "content": "In 1956, George Miller identified the magical number seven, plus or minus two (7 ± 2). While the raw slot capacity is strictly limited, humans bypass this constraint through 'chunking': recoding individual elements into higher-order conceptual units (e.g., remembering a 10-digit phone number as three area chunks)."
            },
            {
                "type": "results",
                "title": "Baddeley's Multi-Component Model",
                "content": "Working memory is not a passive buffer, but an active multicomponent workspace: the Central Executive directs attention, coordinating between the Phonological Loop (inner speech loop lasting ~2 seconds), the Visuospatial Sketchpad (mental imagery), and the Episodic Buffer."
            },
            {
                "type": "critique",
                "title": "Working Memory Capacity and Fluid Intelligence",
                "content": "An individual's working memory capacity (WMC) correlates strongly (r ≈ 0.7) with fluid intelligence (Gf) and problem-solving ability. The modern frontier explores how attention gating mechanisms in prefrontal cortical circuits prevent distractors from corrupting active working memory."
            }
        ],
        "exposition": [
            {
                "heading": "The Underlying Problem",
                "body": "During the mid-twentieth century, communication engineers like Claude Shannon were formalizing the information capacity of telegraph wires and telephone lines in bits per second. Psychologists wondered: what is the fundamental channel capacity of the human mind? How much sensory information can a conscious observer hold and manipulate at once without degradation?"
            },
            {
                "heading": "The Core Mechanism",
                "body": "George Miller demonstrated that immediate memory is limited not by physical bits, but by cognitive 'chunks'. Whether remembering binary digits, letters, or complex words, people can recall approximately seven items. Alan Baddeley and Graham Hitch subsequently dismantled the concept of a unitary short-term memory, introducing the Working Memory Model. In this framework, the central executive serves as an attentional supervisor, coordinating the phonological loop (which articulates verbal items in a subvocal rehearsal loop) and the visuospatial sketchpad (which manipulates spatial imagery), bound together through an episodic buffer into coherent conscious experiences."
            },
            {
                "heading": "Evidence and Key Findings",
                "body": "Chess experiments by Chase and Simon proved the primacy of chunking: when presented with a mid-game chess board for 5 seconds, grandmasters could recall almost all piece locations because they perceived structured tactical chunks, whereas novices remembered only a few random pieces. If pieces were placed randomly on the board, the grandmaster advantage vanished, proving that expertise is the acquisition of organized chunks."
            },
            {
                "heading": "Scientific Implications and Limits",
                "body": "Working memory theory directly informs user interface design, instructional education, and cognitive ergonomics. In computer science and neural networks, working memory serves as the inspiration for context windows, key-value caches, and external memory mechanisms that enable models to hold intermediate computational thoughts during complex problem-solving."
            }
        ]
    }
]

def main():
    primer_path = "/media/windows/Users/PMLS/Documents/researcher-social/primer-data.json"
    with open(primer_path, "r", encoding="utf-8") as f:
        existing_primers = json.load(f)

    existing_ids = set(p["id"] for p in existing_primers)
    added = 0
    for p in NEW_PRIMERS:
        if p["id"] not in existing_ids:
            existing_primers.append(p)
            existing_ids.add(p["id"])
            added += 1

    with open(primer_path, "w", encoding="utf-8") as f:
        json.dump(existing_primers, f, ensure_ascii=False, indent=2)

    print(f"Added {added} new foundational primers. Total primers: {len(existing_primers)}")

if __name__ == "__main__":
    main()
