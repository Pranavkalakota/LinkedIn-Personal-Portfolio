import { about } from '../content/about.js'

export function createAboutPanel(container) {
  const h2 = document.createElement('h2')
  h2.id = 'panel-about-title'
  h2.textContent = 'About'
  container.appendChild(h2)

  const layout = document.createElement('div')
  layout.className = 'about-layout'

  const img = document.createElement('img')
  img.src = about.photo
  img.alt = 'Pranav Kalakota'
  img.className = 'about-photo'
  img.loading = 'lazy'
  layout.appendChild(img)

  const bio = document.createElement('div')
  bio.className = 'about-bio'

  for (const para of about.bio) {
    const p = document.createElement('p')
    p.textContent = para
    bio.appendChild(p)
  }

  const facts = document.createElement('p')
  facts.className = 'fun-facts'
  facts.textContent = about.funFacts
  bio.appendChild(facts)

  layout.appendChild(bio)
  container.appendChild(layout)
}
