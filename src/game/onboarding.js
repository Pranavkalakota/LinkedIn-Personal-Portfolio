export function showOnboarding() {
  const tip = document.createElement('div')
  tip.className = 'onboarding-tip'
  tip.setAttribute('role', 'status')
  tip.setAttribute('aria-live', 'polite')
  tip.innerHTML = 'Use <strong>WASD</strong> or arrow keys to explore the court. Find keys to unlock each section.'
  document.getElementById('app').appendChild(tip)

  let dismissed = false

  function dismiss() {
    if (dismissed) return
    dismissed = true
    tip.style.opacity = '0'
    setTimeout(() => tip.remove(), 400)
    window.removeEventListener('keydown', dismiss)
    window.removeEventListener('mousedown', dismiss)
  }

  window.addEventListener('keydown', dismiss)
  window.addEventListener('mousedown', dismiss)
  setTimeout(dismiss, 5000)
}

const style = document.createElement('style')
style.textContent = `
.onboarding-tip {
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: rgba(232, 221, 208, 0.8);
  background: rgba(10, 10, 20, 0.85);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  border: 1px solid rgba(232, 221, 208, 0.12);
  border-radius: 3px;
  max-width: 500px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.4s;
  pointer-events: none;
}
.onboarding-tip strong {
  color: #C2694F;
}
`
document.head.appendChild(style)
