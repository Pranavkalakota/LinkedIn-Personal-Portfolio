import './styles/global.css'
import { createNavBar } from './nav/nav-bar.js'
import { openPanel, closePanel, setupPanels } from './panels/panel-shell.js'
import { createMobileLayout } from './mobile/mobile-header.js'
import { createSplash } from './splash.js'

function boot() {
  const app = document.getElementById('app')
  const isMobile = window.innerWidth > 0 && window.innerWidth < 768

  if (isMobile) {
    createNavBar(app, openPanel)
    setupPanels(app)
    createMobileLayout(app, openPanel)
  } else {
    createSplash(app, () => {
      setupPanels(app)
      import('./game/index.js').then(({ createGame }) => {
        createGame(app, openPanel, closePanel)
      })
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
