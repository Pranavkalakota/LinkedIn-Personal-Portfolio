import { projects } from '../content/projects.js'

const PROJECT_VISUALS = [
  generateSwiftVisual,
  generateServerVisual,
  generateWearableVisual,
]

export function createProjectsPanel(container) {
  const h2 = document.createElement('h2')
  h2.id = 'panel-projects-title'
  h2.textContent = 'Projects'
  container.appendChild(h2)

  projects.forEach((project, i) => {
    const article = document.createElement('article')
    const isLeft = i % 2 === 0
    article.className = `project-strip ${isLeft ? 'project-strip--left' : 'project-strip--right'}`

    const visual = document.createElement('div')
    visual.className = 'project-visual'
    visual.innerHTML = PROJECT_VISUALS[i]()

    const info = document.createElement('div')
    info.className = 'project-info'

    const h3 = document.createElement('h3')
    h3.textContent = project.title
    info.appendChild(h3)

    const date = document.createElement('p')
    date.className = 'project-date'
    date.textContent = project.date
    info.appendChild(date)

    const desc = document.createElement('p')
    desc.className = 'project-desc'
    desc.textContent = project.description
    info.appendChild(desc)

    const tech = document.createElement('p')
    tech.className = 'project-tech'
    tech.textContent = project.tech
    info.appendChild(tech)

    const link = document.createElement('a')
    link.className = 'project-link'
    link.href = project.link
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.textContent = 'View project →'
    info.appendChild(link)

    if (isLeft) {
      article.appendChild(visual)
      article.appendChild(info)
    } else {
      article.appendChild(info)
      article.appendChild(visual)
    }

    container.appendChild(article)
  })
}

function generateSwiftVisual() {
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#E8DDD0"/>
    <rect x="30" y="20" width="140" height="90" rx="2" fill="#C2694F" opacity="0.15"/>
    <rect x="40" y="30" width="80" height="8" rx="1" fill="#C2694F" opacity="0.4"/>
    <rect x="40" y="45" width="60" height="6" rx="1" fill="#6B7C5E" opacity="0.3"/>
    <rect x="40" y="58" width="100" height="6" rx="1" fill="#6B7C5E" opacity="0.3"/>
    <rect x="40" y="71" width="45" height="6" rx="1" fill="#6B7C5E" opacity="0.3"/>
    <circle cx="145" cy="45" r="15" fill="#C2694F" opacity="0.2"/>
    <path d="M140 40 L150 45 L140 50" stroke="#C2694F" fill="none" stroke-width="2" opacity="0.5"/>
    <rect x="30" y="120" width="30" height="15" rx="1" fill="#C2694F" opacity="0.12"/>
    <rect x="65" y="120" width="30" height="15" rx="1" fill="#6B7C5E" opacity="0.12"/>
    <rect x="100" y="120" width="30" height="15" rx="1" fill="#2E2A27" opacity="0.08"/>
  </svg>`
}

function generateServerVisual() {
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#E8DDD0"/>
    <rect x="60" y="15" width="80" height="25" rx="2" fill="#6B7C5E" opacity="0.2"/>
    <circle cx="75" cy="27" r="4" fill="#6B7C5E" opacity="0.4"/>
    <rect x="85" y="24" width="40" height="6" rx="1" fill="#6B7C5E" opacity="0.3"/>
    <rect x="60" y="50" width="80" height="25" rx="2" fill="#6B7C5E" opacity="0.2"/>
    <circle cx="75" cy="62" r="4" fill="#C2694F" opacity="0.4"/>
    <rect x="85" y="59" width="40" height="6" rx="1" fill="#6B7C5E" opacity="0.3"/>
    <rect x="60" y="85" width="80" height="25" rx="2" fill="#6B7C5E" opacity="0.2"/>
    <circle cx="75" cy="97" r="4" fill="#6B7C5E" opacity="0.4"/>
    <rect x="85" y="94" width="40" height="6" rx="1" fill="#6B7C5E" opacity="0.3"/>
    <line x1="100" y1="40" x2="100" y2="50" stroke="#2E2A27" stroke-width="1.5" opacity="0.2"/>
    <line x1="100" y1="75" x2="100" y2="85" stroke="#2E2A27" stroke-width="1.5" opacity="0.2"/>
    <line x1="40" y1="62" x2="60" y2="62" stroke="#C2694F" stroke-width="1.5" opacity="0.3" stroke-dasharray="4 3"/>
    <line x1="140" y1="62" x2="160" y2="62" stroke="#C2694F" stroke-width="1.5" opacity="0.3" stroke-dasharray="4 3"/>
  </svg>`
}

function generateWearableVisual() {
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#E8DDD0"/>
    <rect x="70" y="30" width="60" height="80" rx="2" fill="#C2694F" opacity="0.15"/>
    <rect x="80" y="40" width="40" height="30" rx="1" fill="#C2694F" opacity="0.1"/>
    <path d="M90 50 Q100 42 110 50 Q100 58 90 50" fill="#C2694F" opacity="0.35"/>
    <rect x="85" y="78" width="30" height="4" rx="1" fill="#6B7C5E" opacity="0.3"/>
    <rect x="90" y="86" width="20" height="4" rx="1" fill="#6B7C5E" opacity="0.2"/>
    <path d="M70 70 Q50 70 50 50" stroke="#6B7C5E" fill="none" stroke-width="1.5" opacity="0.25"/>
    <path d="M130 70 Q150 70 150 50" stroke="#6B7C5E" fill="none" stroke-width="1.5" opacity="0.25"/>
    <circle cx="50" cy="45" r="6" fill="#6B7C5E" opacity="0.15"/>
    <circle cx="150" cy="45" r="6" fill="#6B7C5E" opacity="0.15"/>
    <rect x="85" y="95" width="8" height="8" rx="1" fill="#C2694F" opacity="0.2"/>
    <rect x="97" y="95" width="8" height="8" rx="1" fill="#6B7C5E" opacity="0.2"/>
  </svg>`
}
