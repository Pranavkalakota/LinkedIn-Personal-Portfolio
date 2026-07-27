export function createSplash(appEl, onStart) {
  const splash = document.createElement('div')
  splash.id = 'splash'
  splash.innerHTML = `
    <div class="splash-content">
      <h1 class="splash-name">PRANAV KALAKOTA</h1>
      <p class="splash-sub">INTERACTIVE PORTFOLIO</p>
      <button class="splash-btn" id="splash-start">CLICK TO START</button>
    </div>
  `
  appEl.appendChild(splash)

  document.getElementById('splash-start').addEventListener('click', () => {
    splash.classList.add('splash-fade')
    setTimeout(() => {
      splash.remove()
      onStart()
    }, 600)
  })
}

const style = document.createElement('style')
style.textContent = `
#splash {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a14;
  background-image:
    radial-gradient(ellipse at 50% 40%, rgba(194, 105, 79, 0.08) 0%, transparent 50%);
}

#splash.splash-fade {
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.splash-content {
  text-align: center;
}

.splash-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  font-weight: 700;
  color: #F5F0E8;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  text-shadow: 0 0 80px rgba(194, 105, 79, 0.25);
}

.splash-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: rgba(232, 221, 208, 0.5);
  margin-bottom: 56px;
}

.splash-btn {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: rgba(232, 221, 208, 0.7);
  background: transparent;
  border: 1px solid rgba(232, 221, 208, 0.2);
  padding: 16px 56px;
  cursor: pointer;
  transition: border-color 0.3s, color 0.3s, background 0.3s;
  border-radius: 3px;
}

.splash-btn:hover {
  border-color: rgba(194, 105, 79, 0.6);
  color: #F5F0E8;
  background: rgba(194, 105, 79, 0.08);
}
`
document.head.appendChild(style)
