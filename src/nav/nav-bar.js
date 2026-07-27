const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export function createNavBar(appEl, openPanel) {
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  const nav = document.createElement('nav')
  nav.className = 'nav-bar'
  nav.setAttribute('aria-label', 'Site sections')

  if (isMobile) {
    const logo = document.createElement('span')
    logo.className = 'nav-logo'
    logo.textContent = 'Pranav Kalakota'
    nav.appendChild(logo)
  }

  const links = document.createElement('ul')
  links.className = 'nav-links'

  for (const item of NAV_ITEMS) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.className = 'nav-link'
    btn.textContent = item.label
    btn.addEventListener('click', () => openPanel(item.id, btn))
    li.appendChild(btn)
    links.appendChild(li)
  }

  nav.appendChild(links)
  appEl.appendChild(nav)
}
