export const projects = [
  {
    title: 'Orion',
    date: 'April 2026 – Present',
    description: 'Building a native macOS AI assistant with voice control, real-time gesture recognition via Apple\'s Vision framework, and full system automation through CGEvent. Implemented streaming LLM responses via SSE with sentence-chunked TTS, achieving sub-1.5s end-to-end voice response latency.',
    tech: 'Swift · Vision Framework · SSE · CGEvent',
    link: 'https://github.com/Pranavkalakota/Orion',
  },
  {
    title: 'MCP Task Manager',
    date: 'January – March 2026',
    description: 'Engineered a dual-architecture task management system exposing 5 tools over MCP via stdio transport with an Express web dashboard backed by a shared SQLite database. Designed a graceful degradation layer falling back from OpenAI API to a local regex-based parser with fuzzy typo tolerance, ensuring zero downtime during API failures.',
    tech: 'TypeScript · SQLite · Express · MCP Protocol',
    link: 'https://github.com/Pranavkalakota/MCP-Server',
  },
  {
    title: 'VEDA',
    date: 'February 2026',
    description: 'Designed a multi-stage grounding sequence triggered by an SOS event, combining synchronized haptic feedback with body-awareness exercises and text-to-speech cognitive reassurance. Won 1st place in the Healthcare track at the Claude Builder Hackathon.',
    tech: 'Wearable Tech · AI · TTS · Haptic Feedback',
    link: 'https://github.com/Pranavkalakota/VEDA',
  },
]
