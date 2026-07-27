import { anyKeyPressed } from './input.js'

export function showOnboarding() {
  const tip = document.createElement('div')
  tip.className = 'onboarding-tip'
  tip.setAttribute('role', 'status')
  tip.setAttribute('aria-live', 'polite')
  tip.textContent = 'Use WASD or arrow keys to walk around. Explore the court to learn about me.'
  document.getElementById('app').appendChild(tip)

  let dismissed = false

  function dismiss() {
    if (dismissed) return
    dismissed = true
    tip.style.opacity = '0'
    setTimeout(() => tip.remove(), 400)
    window.removeEventListener('keydown', onKey)
  }

  function onKey() {
    dismiss()
  }

  window.addEventListener('keydown', onKey)
  setTimeout(dismiss, 4000)
}

const style = document.createElement('style')
style.textContent = `
.onboarding-tip {
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(232, 221, 208, 0.8);
  background: rgba(10, 10, 20, 0.85);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  border: 1px solid rgba(232, 221, 208, 0.12);
  border-radius: 3px;
  max-width: 400px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.4s;
  pointer-events: none;
}
`
document.head.appendChild(style)
