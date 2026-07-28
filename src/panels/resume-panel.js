import { experience, research, education, honors } from '../content/experience.js'

export function createResumePanel(container) {
  const h2 = document.createElement('h2')
  h2.id = 'panel-resume-title'
  h2.textContent = 'Resume'
  container.appendChild(h2)

  const wrapper = document.createElement('div')
  wrapper.style.maxWidth = '680px'

  appendSection(wrapper, 'Experience', experience)
  appendSection(wrapper, 'Research', research)

  const eduLabel = document.createElement('p')
  eduLabel.className = 'resume-section-label'
  eduLabel.textContent = 'Education'
  wrapper.appendChild(eduLabel)

  const eduBlock = document.createElement('div')
  eduBlock.className = 'edu-block'

  const school = document.createElement('p')
  school.className = 'edu-school'
  school.textContent = education.school
  eduBlock.appendChild(school)

  const eduMeta = document.createElement('p')
  eduMeta.className = 'edu-meta'
  eduMeta.textContent = `${education.degree} · ${education.date}`
  eduBlock.appendChild(eduMeta)

  const coursework = document.createElement('p')
  coursework.className = 'edu-coursework'
  coursework.textContent = education.coursework
  eduBlock.appendChild(coursework)

  wrapper.appendChild(eduBlock)

  const honorsLabel = document.createElement('p')
  honorsLabel.className = 'resume-section-label'
  honorsLabel.textContent = 'Honors & Awards'
  wrapper.appendChild(honorsLabel)

  const honorsList = document.createElement('ul')
  honorsList.className = 'honors-list'
  for (const h of honors) {
    const li = document.createElement('li')
    li.textContent = h
    honorsList.appendChild(li)
  }
  wrapper.appendChild(honorsList)

  const dl = document.createElement('a')
  dl.className = 'resume-download'
  dl.href = '/resume.pdf'
  dl.target = '_blank'
  dl.textContent = 'Download full resume (PDF)'
  wrapper.appendChild(dl)

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
