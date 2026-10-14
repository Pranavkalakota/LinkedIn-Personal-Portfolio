export const projects = [
  {
    title: 'LSM-Tree Storage Engine',
    date: 'August – October 2026',
    description: 'Built a crash-safe LSM-tree engine in Java sustaining 481K buffered writes/sec and 2.46M random reads/sec at 0.88µs p99 across 100K keys. Amortized fsync via group commit off the write lock, lifting synced throughput 263→829/sec at 8 writers. Leveled compaction cut reads to one SSTable per level and reclaimed 84% of disk, while LZ4 shrank repetitive blocks 87%.',
    tech: 'Java · Maven · Guava · LZ4',
    link: 'https://github.com/Pranavkalakota/lsm-tree',
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
