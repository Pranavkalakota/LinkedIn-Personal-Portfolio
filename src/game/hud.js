import { ZONE_DEFS } from './zones.js'

const WORLD_SIZE = 50

export function createHUD(appEl) {
  const hud = document.createElement('div')
  hud.className = 'game-hud'
  hud.setAttribute('aria-hidden', 'true')

  hud.innerHTML = `
    <div class="hud-minimap">
      <canvas id="minimap" width="140" height="140"></canvas>
    </div>
    <div class="hud-controls">
      <div class="hud-keys">
        <span class="hud-key">W</span>
      </div>
      <div class="hud-keys">
        <span class="hud-key">A</span>
        <span class="hud-key">S</span>
        <span class="hud-key">D</span>
      </div>
      <p class="hud-hint">or arrow keys to move</p>
    </div>
  `

  appEl.appendChild(hud)

  const canvas = document.getElementById('minimap')
  const ctx = canvas.getContext('2d')

  const zoneColors = {
    projects: '#C2694F',
    about: '#6B7C5E',
    resume: '#8B7355',
    contact: '#4a6a8a',
  }

  return {
    updateMinimap(playerX, playerZ) {
      const size = 140
      const half = size / 2
      ctx.clearRect(0, 0, size, size)

      ctx.fillStyle = 'rgba(26, 26, 46, 0.7)'
      ctx.beginPath()
      ctx.arc(half, half, half - 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(232, 221, 208, 0.2)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(half, half, half - 2, 0, Math.PI * 2)
      ctx.stroke()

      const scale = (size - 20) / WORLD_SIZE

      for (const zone of ZONE_DEFS) {
        const zx = half + zone.x * scale
        const zy = half + zone.z * scale

        ctx.fillStyle = zoneColors[zone.id] || '#E8DDD0'
        ctx.globalAlpha = 0.8
        ctx.beginPath()
        ctx.arc(zx, zy, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      ctx.strokeStyle = 'rgba(232, 221, 208, 0.15)'
      ctx.lineWidth = 0.5
      ctx.strokeRect(half - 6 * scale, half - 3 * scale, 12 * scale, 6 * scale)

      const ax = half + playerX * scale
      const ay = half + playerZ * scale

      ctx.fillStyle = '#F5F0E8'
      ctx.beginPath()
      ctx.arc(ax, ay, 4, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#C2694F'
      ctx.beginPath()
      ctx.arc(ax, ay, 2, 0, Math.PI * 2)
      ctx.fill()
    },
  }
}

const style = document.createElement('style')
style.textContent = `
.game-hud {
  position: fixed;
  z-index: 20;
  pointer-events: none;
}

.hud-minimap {
  position: fixed;
  top: 20px;
  right: 20px;
}

.hud-minimap canvas {
  border-radius: 50%;
}

.hud-controls {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.hud-keys {
  display: flex;
  gap: 4px;
}

.hud-key {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 46, 0.6);
  border: 1px solid rgba(232, 221, 208, 0.2);
  border-radius: 4px;
  color: rgba(232, 221, 208, 0.7);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
}

.hud-hint {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: rgba(232, 221, 208, 0.4);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
}
`
document.head.appendChild(style)
