import { projects } from '../content/projects.js'

let desktopEl = null
let isOpen = false

export function createDesktopUI() {
  desktopEl = document.createElement('div')
  desktopEl.id = 'desktop-overlay'
  desktopEl.className = 'desktop-overlay'
  desktopEl.setAttribute('aria-hidden', 'true')

  desktopEl.innerHTML = `
    <div class="desktop-screen">
      <div class="desktop-taskbar">
        <span class="taskbar-start">📁 File Explorer</span>
        <span class="taskbar-title">Pranav's Projects</span>
        <button class="taskbar-close" aria-label="Close desktop">✕</button>
      </div>
      <div class="desktop-toolbar">
        <span class="toolbar-path">📂 C:\\Users\\Pranav\\Projects</span>
      </div>
      <div class="desktop-sidebar">
        <div class="sidebar-item active" data-section="projects">📁 Projects</div>
        <div class="sidebar-item" data-section="documents">📄 Documents</div>
        <div class="sidebar-item" data-section="pictures">🖼️ Pictures</div>
        <div class="sidebar-item" data-section="downloads">📥 Downloads</div>
      </div>
      <div class="desktop-content" id="desktop-files"></div>
    </div>
  `

  document.getElementById('app').appendChild(desktopEl)

  desktopEl.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateToSection(item.dataset.section)
    })
  })

  desktopEl.querySelector('.taskbar-close').addEventListener('click', closeDesktop)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeDesktop()
    }
  })
}

let currentSection = 'projects'

function navigateToSection(section) {
  currentSection = section
  const sidebarItems = desktopEl.querySelectorAll('.sidebar-item')
  sidebarItems.forEach(item => {
    item.classList.toggle('active', item.dataset.section === section)
  })

  const pathMap = {
    projects: 'C:\\\\Users\\\\Pranav\\\\Projects',
    documents: 'C:\\\\Users\\\\Pranav\\\\Documents',
    pictures: 'C:\\\\Users\\\\Pranav\\\\Pictures',
    downloads: 'C:\\\\Users\\\\Pranav\\\\Downloads',
  }
  desktopEl.querySelector('.toolbar-path').textContent = '📂 ' + pathMap[section]

  const titleMap = {
    projects: "Pranav's Projects",
    documents: "Pranav's Documents",
    pictures: "Pranav's Pictures",
    downloads: "Pranav's Downloads",
  }
  desktopEl.querySelector('.taskbar-title').textContent = titleMap[section]

  if (section === 'projects') showProjectFiles()
  else if (section === 'documents') showDocumentFiles()
  else showEmptyFolder()
}

function showProjectFiles() {
  const filesContainer = document.getElementById('desktop-files')
  filesContainer.innerHTML = ''

  for (const project of projects) {
    const file = document.createElement('div')
    file.className = 'desktop-file'
    file.innerHTML = `
      <div class="file-icon">📁</div>
      <div class="file-name">${project.title}</div>
    `
    file.addEventListener('click', () => showProjectDetail(project))
    filesContainer.appendChild(file)
  }

  const readmeFile = document.createElement('div')
  readmeFile.className = 'desktop-file'
  readmeFile.innerHTML = `
    <div class="file-icon">📝</div>
    <div class="file-name">README.md</div>
  `
  readmeFile.addEventListener('click', () => showReadme())
  filesContainer.appendChild(readmeFile)

  const secretFile = document.createElement('div')
  secretFile.className = 'desktop-file'
  secretFile.innerHTML = `
    <div class="file-icon">🎮</div>
    <div class="file-name">secret_game.exe</div>
  `
  secretFile.addEventListener('click', () => showSecret())
  filesContainer.appendChild(secretFile)
}

function showDocumentFiles() {
  const filesContainer = document.getElementById('desktop-files')
  filesContainer.innerHTML = ''

  const resumeFile = document.createElement('div')
  resumeFile.className = 'desktop-file'
  resumeFile.innerHTML = `
    <div class="file-icon">📄</div>
    <div class="file-name">Pranav_Kalakota_Resume.pdf</div>
  `
  resumeFile.addEventListener('click', () => showResume())
  filesContainer.appendChild(resumeFile)
}

function showEmptyFolder() {
  const filesContainer = document.getElementById('desktop-files')
  filesContainer.innerHTML = `
    <div class="empty-folder">
      <span class="empty-folder-icon">📂</span>
      <span class="empty-folder-text">This folder is empty</span>
    </div>
  `
}

function showProjectDetail(project) {
  const content = document.getElementById('desktop-files')
  content.innerHTML = `
    <div class="file-detail">
      <button class="file-back">← Back</button>
      <h3 class="file-detail-title">${project.title}</h3>
      <p class="file-detail-date">${project.date}</p>
      <p class="file-detail-desc">${project.description}</p>
      <p class="file-detail-tech">${project.tech}</p>
      ${project.link ? `<a class="file-detail-link" href="${project.link}" target="_blank" rel="noopener">Open on GitHub →</a>` : ''}
    </div>
  `
  content.querySelector('.file-back').addEventListener('click', () => navigateToSection(currentSection))
}

function showReadme() {
  const content = document.getElementById('desktop-files')
  content.innerHTML = `
    <div class="file-detail">
      <button class="file-back">← Back</button>
      <h3 class="file-detail-title">README.md</h3>
      <pre class="file-readme"># Pranav Kalakota

CS @ Purdue University | AI + Hardware + Software

## About
Interested in the integration of AI with hardware
and software fields. Building things that ship and matter.

## Currently Working On
- AI-powered macOS assistant (Orion)
- Embedded systems & robotics at Pololu
- Reimagining intelligence at Crcle
- This portfolio (you're exploring it right now!)

## Skills
Java, Python, C, Swift, TypeScript
Git, Tableau, Pandas, Matplotlib

## Contact
Email: pkalakot@purdue.edu
GitHub: @Pranavkalakota</pre>
    </div>
  `
  content.querySelector('.file-back').addEventListener('click', () => navigateToSection(currentSection))
}

function showSecret() {
  const content = document.getElementById('desktop-files')
  content.innerHTML = `
    <div class="file-detail secret-game">
      <button class="file-back">← Back</button>
      <h3 class="file-detail-title">🎮 You found a secret!</h3>
      <p class="file-detail-desc">Congratulations explorer! You discovered the hidden file. Here's a fun fact: this entire 3D world was built with Three.js and zero external 3D models. Every tree, building, and character is made of basic geometric shapes.</p>
      <p class="file-detail-tech" style="margin-top: 16px;">Achievement unlocked: Curious Explorer 🏅</p>
    </div>
  `
  content.querySelector('.file-back').addEventListener('click', () => navigateToSection(currentSection))
}

function showResume() {
  const content = document.getElementById('desktop-files')
  content.innerHTML = `
    <div class="file-detail resume-detail">
      <button class="file-back">← Back</button>
      <h3 class="file-detail-title">Pranav_Kalakota_Resume.pdf</h3>
      <div class="resume-viewer">
        <div class="resume-section">
          <h4 class="resume-heading">Education</h4>
          <div class="resume-entry">
            <div class="resume-entry-header">
              <strong>Purdue University</strong>
              <span>West Lafayette, IN</span>
            </div>
            <div class="resume-entry-header">
              <em>Bachelor of Science in Computer Science</em>
              <span>Aug. 2025 – May 2029</span>
            </div>
            <p class="resume-bullet">Coursework: Programming in C, Object-Oriented Programming, Linear Algebra, Discrete Mathematics, Statistical Methods</p>
          </div>
        </div>

        <div class="resume-section">
          <h4 class="resume-heading">Experience</h4>
          <div class="resume-entry">
            <div class="resume-entry-header">
              <strong>Software Engineering Intern</strong>
              <span>June 2026 – Present</span>
            </div>
            <div class="resume-entry-header">
              <em>Crcle</em>
              <span>West Lafayette, IN</span>
            </div>
            <ul class="resume-bullets">
              <li>Architected a multimodal RAG pipeline fusing Whisper ASR, Llama 3.2 3B, LLaVA 7B, ArcFace, and ECAPA-TDNN with cosine-similarity gating over ChromaDB ONNX vector store</li>
              <li>Engineered a schema-constrained NLP intent router with 3-tier fuzzy/regex/LLM fallback achieving 95% deterministic routing across 500+ fuzz invariants</li>
              <li>Optimized always-on wearable ASR pipeline cutting transcription latency 50% and wake-word activation 90%</li>
              <li>Built a cross-platform vision-based GUI automation system achieving sub-2s latency and 90%+ element localization accuracy</li>
            </ul>
          </div>
          <div class="resume-entry">
            <div class="resume-entry-header">
              <strong>Software Engineering Intern</strong>
              <span>June 2026 – Aug. 2026</span>
            </div>
            <div class="resume-entry-header">
              <em>Pololu Robotics</em>
              <span>Las Vegas, NV</span>
            </div>
            <ul class="resume-bullets">
              <li>Engineered an automated production test system in Arduino with serial CLI and fault handling, validating dual H-bridge MOSFET output across 15+ ADC channels</li>
              <li>Designed a robot-arm-compatible DUT fixture for a dual motor driver carrier with current sensing and relay-multiplexed load switching</li>
              <li>Refactored 500+ line legacy embedded codebase, resolved a critical timing race condition in PWM chopping logic</li>
            </ul>
          </div>
          <div class="resume-entry">
            <div class="resume-entry-header">
              <strong>Software Engineering Intern</strong>
              <span>June 2024 – Aug. 2024</span>
            </div>
            <div class="resume-entry-header">
              <em>Summer Business Institute Program (SBI)</em>
              <span>Las Vegas, NV</span>
            </div>
            <ul class="resume-bullets">
              <li>Improved system uptime by resolving 25+ infrastructure and endpoint issues across Police, Fire, and Public Works departments</li>
              <li>Automated 3 cross-departmental reporting workflows, cutting weekly manual data entry by ~5 hrs</li>
            </ul>
          </div>
        </div>

        <div class="resume-section">
          <h4 class="resume-heading">Research</h4>
          <div class="resume-entry">
            <div class="resume-entry-header">
              <strong>Team Lead – Equine Airway Fluid Mechanics</strong>
              <span>Aug. 2025 – Dec. 2025</span>
            </div>
            <div class="resume-entry-header">
              <em>Vertically Integrated Projects, Purdue University</em>
              <span>West Lafayette, IN</span>
            </div>
            <ul class="resume-bullets">
              <li>Led a cross-disciplinary team designing a PIV experiment to visualize airflow and particle deposition in a life-sized PDMS equine airway phantom</li>
              <li>Conducted fluid dynamics simulations to extract velocity, pressure, and turbulence data with mesh independence studies</li>
            </ul>
          </div>
        </div>

        <div class="resume-section">
          <h4 class="resume-heading">Projects</h4>
          <div class="resume-entry">
            <div class="resume-entry-header">
              <strong>Orion</strong>
              <span>Apr. 2026 – Present</span>
            </div>
            <p class="resume-tech">Swift, Vision Framework, SSE</p>
            <ul class="resume-bullets">
              <li>Building a native macOS AI assistant with voice control, real-time gesture recognition via Apple's Vision framework</li>
              <li>Implemented streaming LLM responses via SSE with sentence-chunked TTS, achieving sub-1.5s end-to-end latency</li>
            </ul>
          </div>
          <div class="resume-entry">
            <div class="resume-entry-header">
              <strong>MCP Task Manager</strong>
              <span>Jan. 2026 – Mar. 2026</span>
            </div>
            <p class="resume-tech">TypeScript, SQLite, Express, MCP Protocol</p>
            <ul class="resume-bullets">
              <li>Engineered a dual-architecture task management system exposing 5 tools over MCP via stdio transport</li>
              <li>Designed a graceful degradation layer falling back from OpenAI API to a local regex-based parser with fuzzy typo tolerance</li>
            </ul>
          </div>
        </div>

        <div class="resume-section">
          <h4 class="resume-heading">Honors & Awards</h4>
          <p class="resume-bullet"><strong>Claude Builder Hackathon:</strong> 1st place in the healthcare track for VEDA</p>
          <p class="resume-bullet">Databricks Generative AI Fundamentals</p>
          <p class="resume-bullet">Deloitte Data Analytics Certificate</p>
        </div>

        <div class="resume-section">
          <h4 class="resume-heading">Technical Skills</h4>
          <p class="resume-bullet"><strong>Languages:</strong> Java, Python, C, Swift, TypeScript, HTML/CSS</p>
          <p class="resume-bullet"><strong>Tools & Platforms:</strong> Git, Arduino, SolidWorks, ONNX Runtime, ChromaDB, Jupyter Notebook, Tableau</p>
          <p class="resume-bullet"><strong>Libraries & Frameworks:</strong> Matplotlib, Pandas, Express, Whisper, LLaVA, Vision Framework</p>
          <p class="resume-bullet"><strong>Concepts:</strong> Object-Oriented Programming, Databases, Simulations, Data Analysis, Embedded Systems, RAG Pipelines</p>
        </div>
      </div>
      <a class="file-detail-link" href="/Pranav_Kalakota_Resume.pdf" target="_blank" rel="noopener">Download PDF →</a>
    </div>
  `
  content.querySelector('.file-back').addEventListener('click', () => navigateToSection(currentSection))
}

function resetFiles() {
  showProjectFiles()
}

export function openDesktop() {
  if (!desktopEl || isOpen) return
  isOpen = true
  desktopEl.setAttribute('aria-hidden', 'false')
  desktopEl.style.display = 'flex'
  navigateToSection('projects')
}

export function closeDesktop() {
  if (!desktopEl || !isOpen) return
  isOpen = false
  desktopEl.setAttribute('aria-hidden', 'true')
  desktopEl.style.display = 'none'
  window.dispatchEvent(new CustomEvent('desktop:closed'))
}

export function isDesktopOpen() {
  return isOpen
}

const LAPTOP_POS = { x: -9.5, z: -3 }
const LAPTOP_RADIUS = 3

export function checkLaptopProximity(px, pz) {
  return Math.hypot(px - LAPTOP_POS.x, pz - LAPTOP_POS.z) < LAPTOP_RADIUS
}

const style = document.createElement('style')
style.textContent = `
.desktop-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
}

.desktop-screen {
  width: min(800px, 90vw);
  height: min(500px, 70vh);
  background: #1e1e2e;
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  grid-template-rows: 32px 28px 1fr;
  grid-template-columns: 160px 1fr;
  border: 1px solid rgba(232, 221, 208, 0.15);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.desktop-taskbar {
  grid-column: 1 / -1;
  background: #2d2d44;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(232, 221, 208, 0.8);
}

.taskbar-title {
  flex: 1;
  text-align: center;
  color: rgba(232, 221, 208, 0.5);
}

.taskbar-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(232, 221, 208, 0.6);
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}

.taskbar-close:hover {
  background: #e44;
  color: white;
}

.desktop-toolbar {
  grid-column: 1 / -1;
  background: #252538;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(232, 221, 208, 0.5);
}

.desktop-sidebar {
  background: #1a1a2a;
  padding: 12px 0;
  border-right: 1px solid rgba(232, 221, 208, 0.08);
  overflow-y: auto;
}

.sidebar-item {
  padding: 6px 14px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(232, 221, 208, 0.6);
  cursor: pointer;
  transition: background 0.15s;
}

.sidebar-item:hover {
  background: rgba(232, 221, 208, 0.05);
}

.sidebar-item.active {
  background: rgba(194, 105, 79, 0.15);
  color: #C2694F;
}

.desktop-content {
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-content: flex-start;
}

.desktop-file {
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.desktop-file:hover {
  background: rgba(232, 221, 208, 0.08);
}

.file-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.file-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: rgba(232, 221, 208, 0.8);
  text-align: center;
  word-break: break-word;
}

.file-detail {
  width: 100%;
  padding: 8px;
}

.file-back {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #C2694F;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 4px 0;
}

.file-back:hover {
  text-decoration: underline;
}

.file-detail-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #F5F0E8;
  margin-bottom: 4px;
}

.file-detail-date {
  font-size: 0.75rem;
  color: rgba(232, 221, 208, 0.4);
  margin-bottom: 12px;
}

.file-detail-desc {
  font-size: 0.85rem;
  color: rgba(232, 221, 208, 0.75);
  line-height: 1.6;
  margin-bottom: 12px;
}

.file-detail-tech {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(232, 221, 208, 0.4);
  margin-bottom: 12px;
}

.file-detail-link {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #C2694F;
  text-decoration: none;
  font-weight: 600;
}

.file-detail-link:hover {
  color: #E8DDD0;
}

.file-readme {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: rgba(232, 221, 208, 0.7);
  line-height: 1.7;
  white-space: pre-wrap;
  background: rgba(0,0,0,0.2);
  padding: 16px;
  border-radius: 4px;
  border: 1px solid rgba(232, 221, 208, 0.06);
}

.secret-game .file-detail-title {
  color: #C2694F;
}

.empty-folder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: rgba(232, 221, 208, 0.3);
}

.empty-folder-icon {
  font-size: 3rem;
}

.empty-folder-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
}

.resume-detail {
  overflow-y: auto;
  max-height: 100%;
}

.resume-viewer {
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(232, 221, 208, 0.06);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 12px;
}

.resume-section {
  margin-bottom: 16px;
}

.resume-section:last-child {
  margin-bottom: 0;
}

.resume-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: #C2694F;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 1px solid rgba(194, 105, 79, 0.3);
  padding-bottom: 4px;
  margin-bottom: 10px;
}

.resume-entry {
  margin-bottom: 12px;
}

.resume-entry:last-child {
  margin-bottom: 0;
}

.resume-entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(232, 221, 208, 0.85);
  line-height: 1.4;
}

.resume-entry-header span {
  font-size: 0.68rem;
  color: rgba(232, 221, 208, 0.45);
  white-space: nowrap;
  margin-left: 12px;
}

.resume-tech {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: rgba(232, 221, 208, 0.4);
  margin: 2px 0 4px;
}

.resume-bullets {
  list-style: disc;
  padding-left: 18px;
  margin: 4px 0 0;
}

.resume-bullets li {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: rgba(232, 221, 208, 0.65);
  line-height: 1.5;
  margin-bottom: 3px;
}

.resume-bullet {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: rgba(232, 221, 208, 0.65);
  line-height: 1.5;
  margin: 2px 0;
}
`
document.head.appendChild(style)
