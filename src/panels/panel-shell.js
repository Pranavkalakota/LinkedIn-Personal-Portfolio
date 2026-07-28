import { activateTrap, deactivateTrap } from '../a11y/focus-trap.js'
import { createAboutPanel } from './about-panel.js'
import { createProjectsPanel } from './projects-panel.js'
import { createResumePanel } from './resume-panel.js'
import { createContactPanel } from './contact-panel.js'
import './panels.css'

const PANEL_CONFIG = {
  projects: { direction: 'right', create: createProjectsPanel },
  about: { direction: 'left', create: createAboutPanel },
  resume: { direction: 'top', create: createResumePanel },
  contact: { direction: 'bottom', create: createContactPanel },
}

const panels = {}
let activePanel = null
let triggerEl = null

export function setupPanels(appEl) {
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  for (const [id, config] of Object.entries(PANEL_CONFIG)) {
    const section = document.createElement('section')
    section.id = `panel-${id}`
    section.className = `panel-overlay panel--${config.direction}`
    section.setAttribute('aria-labelledby', `panel-${id}-title`)
    section.setAttribute('aria-hidden', isMobile ? 'false' : 'true')

    const closeBtn = document.createElement('button')
    closeBtn.className = 'panel-close'
    closeBtn.setAttribute('aria-label', `Close ${id} panel`)
    closeBtn.textContent = '×'
    closeBtn.addEventListener('click', () => {
      section.setAttribute('aria-hidden', 'true')
      deactivateTrap()
      activePanel = null
      window.dispatchEvent(new CustomEvent('zone:close'))
    })

    if (!isMobile) {
      section.appendChild(closeBtn)
    }

    config.create(section)
    appEl.appendChild(section)
    panels[id] = section
  }

  if (!isMobile) {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        for (const [id, panel] of Object.entries(panels)) {
          if (panel.getAttribute('aria-hidden') === 'false') {
            panel.setAttribute('aria-hidden', 'true')
            deactivateTrap()
            activePanel = null
            window.dispatchEvent(new CustomEvent('zone:close'))
            break
          }
        }
      }
    })
  }
}

export function openPanel(id, trigger) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    const el = document.getElementById(`panel-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    return
  }

  if (activePanel === id) return
  if (activePanel) closePanelImmediate()

  triggerEl = trigger || document.activeElement
  const panel = panels[id]
  if (!panel) return

  panel.setAttribute('aria-hidden', 'false')
  activePanel = id

  requestAnimationFrame(() => {
    activateTrap(panel, triggerEl)
  })
}

export function closePanel() {
  if (!activePanel) return

  const panel = panels[activePanel]
  panel.setAttribute('aria-hidden', 'true')

  deactivateTrap()
  activePanel = null

  window.dispatchEvent(new CustomEvent('zone:close'))
}

function closePanelImmediate() {
  if (!activePanel) return
  const panel = panels[activePanel]
  panel.setAttribute('aria-hidden', 'true')
  deactivateTrap()
  activePanel = null
}

export function getActivePanel() {
  return activePanel
}
