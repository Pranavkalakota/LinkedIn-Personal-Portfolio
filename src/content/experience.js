export const experience = [
  {
    role: 'Software Engineering Intern',
    company: 'Crcle',
    location: 'West Lafayette, IN',
    date: 'June 2026 – Present',
    summary: 'Architected a multimodal RAG pipeline fusing Whisper ASR, Llama 3.2 3B, LLaVA 7B, ArcFace, and ECAPA-TDNN with cosine-similarity gating over ChromaDB ONNX vector store, enabling zero-touch HCI via cross-app voice control with sub-20s latency and zero cloud dependency. Engineered a schema-constrained NLP intent router with 3-tier fuzzy/regex/LLM fallback and semantic vector search, achieving 95% deterministic routing across 500+ fuzz invariants and 12+ query types in production. Optimized always-on wearable ASR pipeline with adaptive windowing and CPU-routed Whisper inference, cutting transcription latency 50% and wake-word activation 90% via offline-first ONNX detection.',
    type: 'work',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Pololu Robotics',
    location: 'Las Vegas, NV',
    date: 'June 2026 – August 2026',
    summary: 'Engineered an automated production test system in Arduino with serial CLI and fault handling, validating dual H-bridge MOSFET output, current thresholds, and fault flags across 15+ ADC channels, cutting QA cycle time by 10%. Designed a robot-arm-compatible DUT fixture for a dual motor driver carrier with current sensing, relay-multiplexed load switching, and mixed-decay PWM verification. Refactored 500+ line legacy embedded codebase, resolved a critical timing race condition in PWM chopping logic.',
    type: 'work',
  },
  {
    role: 'Team Lead — Equine Airway Fluid Mechanics',
    company: 'Purdue VIP Program',
    location: 'West Lafayette, IN',
    date: 'August – December 2025',
    summary: 'Led a cross-disciplinary team in designing a particle image velocimetry (PIV) experiment to visualize airflow and particle deposition in a life-sized PDMS negative-mold equine airway phantom for studying recurrent airway obstruction. Conducted fluid dynamics simulations to extract velocity, pressure, and turbulence data, performing mesh independence studies and generating streamline/contour plots for validation.',
    type: 'research',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Summer Business Institute Program',
    location: 'Las Vegas, NV',
    date: 'June – August 2024',
    summary: 'Resolved 25+ IT issues for the City of Henderson across multiple departments, improving operational uptime. Automated and organized datasets for Police & Fire Departments, improving data accessibility and efficiency.',
    type: 'work',
  },
]

export const education = {
  school: 'Purdue University',
  location: 'West Lafayette, IN',
  degree: 'Bachelor of Science in Computer Science',
  date: '2025 – 2029 (Expected)',
  coursework: 'Programming in C, Object-Oriented Programming, Linear Algebra, Discrete Mathematics',
}

export const honors = [
  'Claude Builder Hackathon — 1st place, Healthcare track (VEDA)',
  'Databricks Generative AI Fundamentals',
  'Deloitte Data Analytics Certificate',
]
