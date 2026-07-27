const keys = {}

export function setupInput() {
  window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'e'].includes(e.key)) {
      e.preventDefault()
      keys[e.key] = true
    }
  })

  window.addEventListener('keyup', (e) => {
    keys[e.key] = false
  })
}

export function getDirection() {
  let dx = 0
  let dy = 0

  if (keys['ArrowUp'] || keys['w']) dy = -1
  if (keys['ArrowDown'] || keys['s']) dy = 1
  if (keys['ArrowLeft'] || keys['a']) dx = -1
  if (keys['ArrowRight'] || keys['d']) dx = 1

  if (dx !== 0 && dy !== 0) {
    const inv = 1 / Math.SQRT2
    dx *= inv
    dy *= inv
  }

  return { dx, dy }
}

export function anyKeyPressed() {
  return Object.values(keys).some(Boolean)
}
