const keys = {}

export function setupInput() {
  window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'e', ' '].includes(e.key)) {
      e.preventDefault()
      keys[e.key] = true
    }
  })

  window.addEventListener('keyup', (e) => {
    keys[e.key] = false
  })
}

export function getMovement() {
  let fwd = 0
  let right = 0
  if (keys['w'] || keys['ArrowUp']) fwd = 1
  if (keys['s'] || keys['ArrowDown']) fwd = -1
  if (keys['a'] || keys['ArrowLeft']) right = -1
  if (keys['d'] || keys['ArrowRight']) right = 1
  return { fwd, right }
}

export function isKeyDown(key) {
  return !!keys[key]
}
