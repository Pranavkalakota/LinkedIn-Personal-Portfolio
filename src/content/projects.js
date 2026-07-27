export const projects = [
  {
    title: 'Orion',
    date: 'April 2026 – Present',
    description: 'A native macOS AI assistant built in Swift with voice control, real-time gesture recognition, and full system automation. Uses Apple\'s Vision framework and AVFoundation to classify hand poses into live system actions via CGEvent, with streaming LLM responses via SSE and sentence-chunked TTS achieving sub-1.5s end-to-end voice response latency.',
    tech: 'Swift · AppKit · Vision Framework · AVFoundation · CGEvent',
    link: 'https://github.com/Pranavkalakota/Orion',
  },
  {
    title: 'MCP Server',
    date: 'January – March 2026',
    description: 'A dual-architecture task management system in TypeScript exposing 5 tools over the Model Context Protocol via stdio transport, with an Express web dashboard backed by a shared SQLite database. Features a graceful degradation layer that automatically falls back from the OpenAI API to a local regex-based parser with fuzzy typo tolerance, ensuring zero downtime during failures.',
    tech: 'TypeScript · Express · SQLite · OpenAI API · MCP',
    link: 'https://github.com/Pranavkalakota/MCP-Server',
  },
  {
    title: 'VEDA',
    date: 'February 2026',
    description: 'A wearable health device that detects panic attacks and triggers a multi-stage grounding sequence combining synchronized haptic feedback with body-awareness exercises and text-to-speech cognitive reassurance. Won 1st place in the Healthcare track at the Claude Builder Hackathon.',
    tech: 'Wearable Tech · AI · TTS · Haptic Feedback',
    link: 'https://github.com/Pranavkalakota/VEDA',
  },
]
