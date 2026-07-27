import { contact } from '../content/contact.js'

export function createContactPanel(container) {
  const h2 = document.createElement('h2')
  h2.id = 'panel-contact-title'
  h2.className = 'contact-headline'
  h2.textContent = contact.headline
  container.appendChild(h2)

  const ul = document.createElement('ul')
  ul.className = 'contact-links'

  for (const link of contact.links) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = link.href
    a.textContent = link.label
    a.target = link.href.startsWith('mailto:') ? '_self' : '_blank'
    a.rel = 'noopener noreferrer'
    li.appendChild(a)
    ul.appendChild(li)
  }

  container.appendChild(ul)

  const loc = document.createElement('p')
  loc.className = 'contact-location'
  loc.textContent = contact.location
  container.appendChild(loc)
}
