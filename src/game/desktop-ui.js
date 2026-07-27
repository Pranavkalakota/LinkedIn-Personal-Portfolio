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
        <div class="sidebar-item active">📁 Projects</div>
        <div class="sidebar-item">📄 Documents</div>
        <div class="sidebar-item">🖼️ Pictures</div>
        <div class="sidebar-item">📥 Downloads</div>
      </div>
      <div class="desktop-content" id="desktop-files"></div>
    </div>
  `

  document.getElementById('app').appendChild(desktopEl)

  const filesContainer = document.getElementById('desktop-files')
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

  desktopEl.querySelector('.taskbar-close').addEventListener('click', closeDesktop)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeDesktop()
    }
  })
}

function showProjectDetail(project) {
  const content = document.getElementById('desktop-files')
  content.innerHTML = `
    <div class="file-detail">
      <button class="file-back" onclick="this.closest('.desktop-content').innerHTML = ''; document.dispatchEvent(new CustomEvent('desktop:reset'))">← Back</button>
      <h3 class="file-detail-title">${project.title}</h3>
      <p class="file-detail-date">${project.date}</p>
      <p class="file-detail-desc">${project.description}</p>
      <p class="file-detail-tech">${project.tech}</p>
      ${project.github ? `<a class="file-detail-link" href="${project.github}" target="_blank" rel="noopener">Open on GitHub →</a>` : ''}
    </div>
  `

  document.addEventListener('desktop:reset', resetFiles, { once: true })
}

function showReadme() {
  const content = document.getElementById('desktop-files')
  content.innerHTML = `
    <div class="file-detail">
      <button class="file-back" onclick="document.dispatchEvent(new CustomEvent('desktop:reset'))">← Back</button>
      <h3 class="file-detail-title">README.md</h3>
      <pre class="file-readme"># Pranav Kalakota

CS @ Purdue University | Software Engineer

## About
I build things that solve real problems.
Tennis player. Code writer. Problem solver.

## Currently Working On
- AI-powered macOS assistant (Orion)
- MCP Server for task management
- This portfolio (you're exploring it right now!)

## Contact
Email: pkalakot@purdue.edu
GitHub: @Pranavkalakota</pre>
    </div>
  `
  document.addEventListener('desktop:reset', resetFiles, { once: true })
}

function showSecret() {
  const content = document.getElementById('desktop-files')
  content.innerHTML = `
    <div class="file-detail secret-game">
      <button class="file-back" onclick="document.dispatchEvent(new CustomEvent('desktop:reset'))">← Back</button>
      <h3 class="file-detail-title">🎮 You found a secret!</h3>
      <p class="file-detail-desc">Congratulations explorer! You discovered the hidden file. Here's a fun fact: this entire 3D world was built with Three.js and zero external 3D models. Every tree, building, and character is made of basic geometric shapes.</p>
      <p class="file-detail-tech" style="margin-top: 16px;">Achievement unlocked: Curious Explorer 🏅</p>
    </div>
  `
  document.addEventListener('desktop:reset', resetFiles, { once: true })
}

function resetFiles() {
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

export function openDesktop() {
  if (!desktopEl || isOpen) return
  isOpen = true
  desktopEl.setAttribute('aria-hidden', 'false')
  desktopEl.style.display = 'flex'
  resetFiles()
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

const LAPTOP_POS = { x: 13, z: -10 }
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
`
document.head.appendChild(style)
