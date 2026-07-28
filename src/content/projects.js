export const projects = [
  {
    title: 'Orion',
    date: 'April 2026 – Present',
    description: 'Building a native macOS AI assistant in Swift with voice control, real-time gesture recognition, and full system automation. Building a gesture recognition engine using Apple\'s Vision framework and AVFoundation to classify hand poses into live system actions via CGEvent. Implementing streaming LLM responses via SSE with sentence-chunked TTS, achieving sub-1.5s end-to-end voice response latency.',
    tech: 'Swift · AppKit · Vision Framework · AVFoundation · CGEvent',
    link: 'https://github.com/Pranavkalakota/Orion',
  },
  {
    title: 'MCP Server',
    date: 'January – March 2026',
    description: 'Engineered a dual-architecture task management system in TypeScript exposing 5 tools over the MCP via stdio transport, enabling direct integration with MCP clients alongside an Express web dashboard, backed by a shared SQLite database. Designed a graceful degradation layer that is functional without external dependencies, automatically falling back from the OpenAI API to a local regex-based parser with fuzzy typo tolerance, ensuring zero downtime during failures. Structured prompts to return strict JSON for predictable parsing, and implemented confirmation safeguards to prevent accidental data loss.',
    tech: 'TypeScript · Express · SQLite · OpenAI API · MCP',
    link: 'https://github.com/Pranavkalakota/MCP-Server',
  },
  {
    title: 'VEDA',
    date: 'February 2026',
    description: 'Designed a multi-stage grounding sequence triggered by an SOS event, combining synchronized haptic feedback with body-awareness exercises, and text-to-speech cognitive reassurance. Won 1st place in the Healthcare track at the Claude Builder Hackathon.',
    tech: 'Wearable Tech · AI · TTS · Haptic Feedback',
    link: 'https://github.com/Pranavkalakota/VEDA',
  },
]
