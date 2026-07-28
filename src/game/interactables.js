import * as THREE from 'three'

const interactables = []
let collectibles = []
let collectedKeys = new Set()
let hintEl = null

export function createInteractables(scene) {
  // Key for Projects zone — hidden behind far baseline
  createCollectibleKey(scene, 5, 17, 'projects-key', 0xC2694F)
  // Key for Experience zone — tucked near trees on the left
  createCollectibleKey(scene, -10, -12, 'resume-key', 0x8B7355)

  createEasterEggs(scene)
  createHintUI()
}

function createHintUI() {
  hintEl = document.createElement('div')
  hintEl.className = 'interact-hint'
  hintEl.style.display = 'none'
  document.getElementById('app').appendChild(hintEl)

  const collectUI = document.createElement('div')
  collectUI.id = 'collect-counter'
  collectUI.className = 'collect-counter'
  collectUI.textContent = '0 / 2 keys'
  document.getElementById('app').appendChild(collectUI)
}

function createCollectibleKey(scene, x, z, id, color) {
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  group.userData.id = id
  group.userData.type = 'key'

  const handleGeo = new THREE.TorusGeometry(0.2, 0.04, 8, 16)
  const keyMat = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.8,
    roughness: 0.2,
    emissive: color,
    emissiveIntensity: 0.3,
  })
  const handle = new THREE.Mesh(handleGeo, keyMat)
  handle.position.y = 0.8
  handle.rotation.x = Math.PI / 2
  group.add(handle)

  const shaftGeo = new THREE.BoxGeometry(0.04, 0.3, 0.04)
  const shaft = new THREE.Mesh(shaftGeo, keyMat)
  shaft.position.set(0, 0.5, 0)
  group.add(shaft)

  const tooth1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.04, 0.04), keyMat)
  tooth1.position.set(0.05, 0.4, 0)
  group.add(tooth1)
  const tooth2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.04), keyMat)
  tooth2.position.set(0.04, 0.45, 0)
  group.add(tooth2)

  const glow = new THREE.PointLight(color, 0.6, 6)
  glow.position.set(0, 0.7, 0)
  group.add(glow)

  const ringGeo = new THREE.RingGeometry(0.5, 0.6, 16)
  const ringMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.02
  group.add(ring)

  scene.add(group)
  collectibles.push(group)
}

function createEasterEggs(scene) {
  createTennisTrophy(scene, 2, -17)
  createHiddenMessage(scene, -13, 0)
  createBouncingBall(scene, 0, -13)
  createMusicNote(scene, 12, 14)
  createWindTunnel(scene, -8, 18)
  createHackathonBadge(scene, 8, -16)
}

function createTennisTrophy(scene, x, z) {
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.9,
    roughness: 0.1,
    emissive: 0xffa500,
    emissiveIntensity: 0.15,
  })

  const basePlatform = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.15, 8), goldMat)
  basePlatform.position.set(x, 0.075, z)
  basePlatform.castShadow = true
  scene.add(basePlatform)

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5), goldMat)
  stem.position.set(x, 0.4, z)
  scene.add(stem)

  const cupGeo = new THREE.LatheGeometry([
    new THREE.Vector2(0.05, 0),
    new THREE.Vector2(0.25, 0.1),
    new THREE.Vector2(0.3, 0.3),
    new THREE.Vector2(0.25, 0.5),
    new THREE.Vector2(0.2, 0.5),
    new THREE.Vector2(0.25, 0.3),
    new THREE.Vector2(0.2, 0.1),
    new THREE.Vector2(0.05, 0.02),
  ], 12)
  const cup = new THREE.Mesh(cupGeo, goldMat)
  cup.position.set(x, 0.65, z)
  cup.castShadow = true
  scene.add(cup)

  const light = new THREE.PointLight(0xffd700, 0.3, 5)
  light.position.set(x, 1.2, z)
  scene.add(light)

  interactables.push({ x, z, radius: 2, message: 'Grand Slam trophy! Every champion starts somewhere.' })
}

function createHiddenMessage(scene, x, z) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 256, 128)
  ctx.font = 'bold 18px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(194, 105, 79, 0.9)'
  ctx.textAlign = 'center'
  ctx.fillText('"The ball is in your court"', 128, 50)
  ctx.font = '14px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(232, 221, 208, 0.6)'
  ctx.fillText('— Pranav', 128, 80)

  const texture = new THREE.CanvasTexture(canvas)
  const geo = new THREE.PlaneGeometry(3, 1.5)
  const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
  const sign = new THREE.Mesh(geo, mat)
  sign.position.set(x, 1.5, z)
  scene.add(sign)

  const postMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1a })
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5), postMat)
  post.position.set(x, 0.75, z)
  scene.add(post)

  interactables.push({ x, z, radius: 3, message: '"The ball is in your court" — Found a hidden message!' })
}

function createBouncingBall(scene, x, z) {
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xccdd44,
    roughness: 0.4,
    emissive: 0xaacc22,
    emissiveIntensity: 0.1,
  })
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), ballMat)
  ball.position.set(x, 0.25, z)
  ball.castShadow = true
  scene.add(ball)
  ball.userData.bounce = true
  ball.userData.phase = 0

  interactables.push({ x, z, radius: 2, message: 'A magical tennis ball! It never stops bouncing.', mesh: ball })
}

function createMusicNote(scene, x, z) {
  const noteMat = new THREE.MeshStandardMaterial({
    color: 0x9966cc,
    emissive: 0x6633aa,
    emissiveIntensity: 0.3,
    metalness: 0.5,
  })

  const noteHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), noteMat)
  noteHead.position.set(x, 0.6, z)
  noteHead.scale.set(1, 0.7, 1)
  scene.add(noteHead)

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6), noteMat)
  stem.position.set(x + 0.13, 0.9, z)
  scene.add(stem)

  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.2), noteMat)
  flag.position.set(x + 0.2, 1.1, z)
  flag.rotation.z = -0.3
  scene.add(flag)

  const light = new THREE.PointLight(0x9966cc, 0.3, 4)
  light.position.set(x, 0.8, z)
  scene.add(light)

  interactables.push({ x, z, radius: 2, message: 'Pranav codes with lo-fi beats on repeat.' })
}

function createWindTunnel(scene, x, z) {
  const tubeMat = new THREE.MeshStandardMaterial({
    color: 0x667788,
    metalness: 0.6,
    roughness: 0.3,
    transparent: true,
    opacity: 0.7,
  })
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.5, 16, 1, true), tubeMat)
  tube.position.set(x, 0.75, z)
  tube.rotation.z = Math.PI / 2
  scene.add(tube)

  const fanMat = new THREE.MeshStandardMaterial({ color: 0xaabbcc, metalness: 0.7 })
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.25, 0.06), fanMat)
    blade.position.set(x - 0.75, 0.75, z)
    blade.rotation.x = (i * Math.PI) / 2
    scene.add(blade)
  }

  const supportMat = new THREE.MeshStandardMaterial({ color: 0x444455 })
  const support1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.75, 0.06), supportMat)
  support1.position.set(x - 0.5, 0.375, z)
  scene.add(support1)
  const support2 = support1.clone()
  support2.position.set(x + 0.5, 0.375, z)
  scene.add(support2)

  interactables.push({ x, z, radius: 2.5, message: 'A miniature wind tunnel — from Purdue\'s equine airway research project!' })
}

function createHackathonBadge(scene, x, z) {
  const badgeMat = new THREE.MeshStandardMaterial({
    color: 0xC2694F,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0xC2694F,
    emissiveIntensity: 0.2,
  })

  const badge = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 6), badgeMat)
  badge.position.set(x, 0.8, z)
  badge.castShadow = true
  scene.add(badge)

  const inner = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 0.09, 6),
    new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 })
  )
  inner.position.set(x, 0.81, z)
  scene.add(inner)

  const stemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8)
  const stem = new THREE.Mesh(stemGeo, new THREE.MeshStandardMaterial({ color: 0x555555 }))
  stem.position.set(x, 0.4, z)
  scene.add(stem)

  const light = new THREE.PointLight(0xC2694F, 0.3, 4)
  light.position.set(x, 1, z)
  scene.add(light)

  interactables.push({ x, z, radius: 2, message: '1st place — Claude Builder Hackathon, Healthcare track (VEDA)!' })
}

export function updateInteractables(playerX, playerZ) {
  for (const item of interactables) {
    if (item.mesh && item.mesh.userData.bounce) {
      item.mesh.userData.phase += 0.05
      item.mesh.position.y = 0.25 + Math.abs(Math.sin(item.mesh.userData.phase)) * 1.5
    }
  }

  for (let i = collectibles.length - 1; i >= 0; i--) {
    const key = collectibles[i]
    key.rotation.y += 0.02

    const dist = Math.hypot(playerX - key.position.x, playerZ - key.position.z)
    if (dist < 1.5) {
      collectedKeys.add(key.userData.id)
      key.parent.remove(key)
      collectibles.splice(i, 1)

      const counter = document.getElementById('collect-counter')
      if (counter) {
        counter.textContent = `${collectedKeys.size} / 2 keys`
        counter.classList.add('collect-flash')
        setTimeout(() => counter.classList.remove('collect-flash'), 600)
      }

      showHint(`Found a key! (${collectedKeys.size}/2)`)
    }
  }

  let nearInteractable = null
  for (const item of interactables) {
    const dist = Math.hypot(playerX - item.x, playerZ - item.z)
    if (dist < item.radius) {
      nearInteractable = item
      break
    }
  }

  if (nearInteractable && hintEl) {
    hintEl.textContent = nearInteractable.message
    hintEl.style.display = 'block'
  } else if (hintEl) {
    hintEl.style.display = 'none'
  }
}

function showHint(text) {
  if (!hintEl) return
  hintEl.textContent = text
  hintEl.style.display = 'block'
  setTimeout(() => { if (hintEl) hintEl.style.display = 'none' }, 3000)
}

export function hasKey(keyId) {
  return collectedKeys.has(keyId)
}

const style = document.createElement('style')
style.textContent = `
.interact-hint {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(232, 221, 208, 0.9);
  background: rgba(10, 10, 20, 0.85);
  backdrop-filter: blur(10px);
  padding: 12px 28px;
  border: 1px solid rgba(232, 221, 208, 0.15);
  border-radius: 4px;
  pointer-events: none;
  text-align: center;
  max-width: 400px;
}

.collect-counter {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 25;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(232, 221, 208, 0.6);
  background: rgba(10, 10, 20, 0.7);
  backdrop-filter: blur(8px);
  padding: 8px 16px;
  border: 1px solid rgba(232, 221, 208, 0.1);
  border-radius: 4px;
  transition: transform 0.3s, color 0.3s;
}

.collect-counter.collect-flash {
  color: #C2694F;
  transform: scale(1.15);
}
`
document.head.appendChild(style)
