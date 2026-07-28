import { experience, research } from '../content/experience.js'

export function createResumePanel(container) {
  const h2 = document.createElement('h2')
  h2.id = 'panel-resume-title'
  h2.textContent = 'Experience'
  container.appendChild(h2)

  const wrapper = document.createElement('div')
  wrapper.style.maxWidth = '680px'

  appendSection(wrapper, 'Work', experience)
  appendSection(wrapper, 'Research', research)

  container.appendChild(wrapper)
}

function appendSection(wrapper, title, entries) {
  const label = document.createElement('p')
  label.className = 'resume-section-label'
  label.textContent = title
  wrapper.appendChild(label)

  const timeline = document.createElement('ol')
  timeline.className = 'timeline'

  for (const entry of entries) {
    const li = document.createElement('li')
    li.className = 'timeline-entry'

    const role = document.createElement('p')
    role.className = 'entry-role'
    role.textContent = entry.role
    li.appendChild(role)

    const meta = document.createElement('p')
    meta.className = 'entry-meta'
    meta.textContent = [entry.company, entry.location, entry.date].filter(Boolean).join(' · ')
    li.appendChild(meta)

    if (entry.bullets && entry.bullets.length) {
      const ul = document.createElement('ul')
      ul.className = 'entry-bullets'
      for (const b of entry.bullets) {
        const bLi = document.createElement('li')
        bLi.textContent = b
        ul.appendChild(bLi)
      }
      li.appendChild(ul)
    }

    timeline.appendChild(li)
  }

  wrapper.appendChild(timeline)
}
