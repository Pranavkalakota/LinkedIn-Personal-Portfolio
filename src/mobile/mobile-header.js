import './mobile-header.css'

export function createMobileLayout(appEl) {
  const header = document.createElement('div')
  header.className = 'mobile-court-header'

  header.innerHTML = `
    <svg viewBox="0 0 375 220" xmlns="http://www.w3.org/2000/svg" class="mobile-court-svg" aria-hidden="true">
      <rect width="375" height="220" fill="#E8DDD0"/>
      <rect x="30" y="20" width="315" height="170" fill="#C2694F" rx="0"/>

      <!-- grain overlay simulation -->
      <rect x="30" y="20" width="315" height="170" fill="#2E2A27" opacity="0.05"/>

      <!-- court lines -->
      <line x1="187" y1="20" x2="187" y2="190" stroke="#E8DDD0" stroke-width="2"/>
      <line x1="30" y1="105" x2="345" y2="105" stroke="#2E2A27" stroke-width="2.5"/>
      <line x1="30" y1="68" x2="345" y2="68" stroke="#E8DDD0" stroke-width="1.5"/>
      <line x1="30" y1="142" x2="345" y2="142" stroke="#E8DDD0" stroke-width="1.5"/>
      <rect x="30" y="20" width="315" height="170" fill="none" stroke="#E8DDD0" stroke-width="2"/>

      <!-- net shadow -->
      <rect x="30" y="106" width="315" height="8" fill="#2E2A27" opacity="0.06"/>
    </svg>

    <div class="mobile-hotspots">
      <button class="mobile-hotspot" data-panel="projects" style="top: 15%; left: 35%;" aria-label="View projects">
        <svg viewBox="0 0 24 24" width="28" height="28"><circle cx="12" cy="12" r="9" fill="#C8D94A"/><path d="M7 10 Q12 5 17 10" stroke="#F5F0E8" fill="none" stroke-width="1.5"/><path d="M7 14 Q12 19 17 14" stroke="#F5F0E8" fill="none" stroke-width="1.5"/></svg>
      </button>
      <button class="mobile-hotspot" data-panel="about" style="top: 45%; left: 15%;" aria-label="View about">
        <svg viewBox="0 0 24 24" width="28" height="28"><rect x="4" y="10" width="16" height="4" fill="#8B7355"/><rect x="6" y="14" width="3" height="5" fill="#6B5B45"/><rect x="15" y="14" width="3" height="5" fill="#6B5B45"/></svg>
      </button>
      <button class="mobile-hotspot" data-panel="resume" style="top: 45%; left: 78%;" aria-label="View resume">
        <svg viewBox="0 0 24 24" width="28" height="28"><rect x="9" y="4" width="6" height="16" fill="#6B7C5E" rx="1"/><rect x="10" y="2" width="4" height="3" fill="#2E2A27" rx="1"/></svg>
      </button>
      <button class="mobile-hotspot" data-panel="contact" style="top: 78%; left: 60%;" aria-label="View contact">
        <svg viewBox="0 0 24 24" width="28" height="28"><rect x="6" y="4" width="12" height="18" rx="2" fill="#C2694F"/><line x1="8" y1="10" x2="16" y2="10" stroke="#2E2A27" stroke-width="1"/></svg>
      </button>
    </div>
  `

  appEl.appendChild(header)

  header.querySelectorAll('.mobile-hotspot').forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.dataset.panel
      const el = document.getElementById(`panel-${panelId}`)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  })
}
