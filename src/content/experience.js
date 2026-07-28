export const experience = [
  {
    role: 'Software Engineering Intern',
    company: 'Crcle',
    location: 'West Lafayette, IN',
    date: 'June 2026 – Present',
    bullets: [
      'Architected a multimodal RAG pipeline fusing Whisper ASR, Llama 3.2 3B, LLaVA 7B, ArcFace, and ECAPA-TDNN with cosine-similarity gating over ChromaDB ONNX vector store, enabling zero-touch HCI via cross-app voice control with sub-20s latency and zero cloud dependency',
      'Engineered a schema-constrained NLP intent router with 3-tier fuzzy/regex/LLM fallback and semantic vector search, achieving 95% deterministic routing across 500+ fuzz invariants and 12+ query types in production',
      'Optimized always-on wearable ASR pipeline with adaptive windowing and CPU-routed Whisper inference, cutting transcription latency 50% (12s to 6s) and wake-word activation 90% (2s to <200ms) via offline-first ONNX detection with parallel ASR fallback',
    ],
    type: 'work',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Pololu Robotics',
    location: 'Las Vegas, NV',
    date: 'June 2026 – Aug. 2026',
    bullets: [
      'Engineered an automated production test system in Arduino with serial CLI and fault handling, validating dual H-bridge MOSFET output, current thresholds, and fault flags across 15+ ADC channels, cutting QA cycle time by 10%',
      'Designed a robot-arm-compatible DUT fixture for a dual motor driver carrier with current sensing, relay-multiplexed load switching, and mixed-decay PWM verification; modeled enclosure in SolidWorks',
      'Refactored 500+ line legacy embedded codebase, resolved a critical timing race condition in PWM chopping logic, and validated power-on-reset sequencing for long-term maintainability',
    ],
    type: 'work',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Summer Business Institute Program (SBI)',
    location: 'Las Vegas, NV',
    date: 'June 2024 – Aug. 2024',
    bullets: [
      'Resolved 25+ IT issues for the City of Henderson across multiple departments, improving operational uptime',
      'Automated and organized datasets for Police & Fire Departments, improving data accessibility and efficiency',
    ],
    type: 'work',
  },
]

export const research = [
  {
    role: 'Team Lead – Equine Airway Fluid Mechanics',
    company: 'Vertically Integrated Projects, Purdue University',
    location: 'West Lafayette, IN',
    date: 'Aug. 2025 – Dec. 2025',
    bullets: [
      'Led a cross-disciplinary team in designing a particle image velocimetry (PIV) experiment to visualize airflow and particle deposition in a life-sized PDMS negative-mold equine airway phantom for studying recurrent airway obstruction (RAO)',
      'Conducted fluid dynamics simulations to extract velocity, pressure, and turbulence data, performing mesh independence studies and generating streamline/contour plots for validation against experimental PIV results',
      'Applied Reynolds number scaling to replicate equine respiratory dynamics in a water-based flow system, enabling lower-velocity experiments with improved optical clarity for high-speed camera particle tracking',
    ],
  },
]

export const education = {
  school: 'Purdue University',
  location: 'West Lafayette, IN',
  degree: 'Bachelor of Science in Computer Science',
  date: 'Aug. 2025 – May 2029',
  coursework: 'Programming in C, Object-Oriented Programming, Linear Algebra, Discrete Mathematics',
}

export const honors = [
  'Claude Builder Hackathon: 1st place in the healthcare track for VEDA',
  'Databricks Generative AI Fundamentals',
  'Deloitte Data Analytics Certificate',
]
