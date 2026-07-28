import * as THREE from 'three'

export const ZONE_DEFS = [
  { id: 'projects', label: 'Projects', x: -10, z: -8, radius: 3, color: 0xC2694F, keyId: 'projects-key' },
  { id: 'about', label: 'About Me', x: 10, z: -8, radius: 3, color: 0x6B7C5E, keyId: 'about-key' },
  { id: 'resume', label: 'Experience', x: -10, z: 8, radius: 3, color: 0x8B7355, keyId: 'resume-key' },
  { id: 'contact', label: 'Contact', x: 10, z: 8, radius: 3, color: 0x4a6a8a, keyId: 'contact-key' },
]

const zoneLabels = []
const animatedParts = []

export function createZoneStructures(scene) {
  // Projects building — a workshop / garage with open door and blinking lights
  createWorkshop(scene, ZONE_DEFS[0])

  // About Me — a cozy cabin with a glowing window
  createCabin(scene, ZONE_DEFS[1])

  // Experience — a tall office tower with floors
  createTower(scene, ZONE_DEFS[2])

  // Contact — a mailbox station with antenna
  createMailStation(scene, ZONE_DEFS[3])

  for (const zone of ZONE_DEFS) {
    // Ground glow ring
    const ringGeo = new THREE.RingGeometry(zone.radius - 0.3, zone.radius, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: zone.color,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.set(zone.x, 0.03, zone.z)
    scene.add(ring)

    // Floating label
    const floatLabel = createFloatingLabel(zone.label)
    floatLabel.position.set(zone.x, 4.5, zone.z)
    scene.add(floatLabel)
    zoneLabels.push(floatLabel)
  }
}

function createWorkshop(scene, zone) {
  const { x, z, color } = zone
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x3a3040, roughness: 0.8 })
  const roofMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 })

  // Main structure
  const body = new THREE.Mesh(new THREE.BoxGeometry(3, 2.5, 2.5), wallMat)
  body.position.set(x, 1.25, z)
  body.castShadow = true
  scene.add(body)

  // Slanted roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.3, 1.2, 4), roofMat)
  roof.position.set(x, 3.1, z)
  roof.rotation.y = Math.PI / 4
  roof.castShadow = true
  scene.add(roof)

  // Open garage door
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a })
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.8), doorMat)
  door.position.set(x, 0.9, z + 1.26)
  scene.add(door)

  // Workbench light inside
  const innerLight = new THREE.PointLight(0xffaa44, 0.6, 5)
  innerLight.position.set(x, 1.5, z)
  scene.add(innerLight)

  // Blinking warning light on top
  const warnLight = new THREE.PointLight(color, 0.5, 4)
  warnLight.position.set(x, 3.8, z)
  scene.add(warnLight)
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.8 }))
  bulb.position.set(x, 3.8, z)
  scene.add(bulb)
  animatedParts.push({ type: 'blink', light: warnLight, bulbMat: bulb.material, color })

  // Gear decoration on wall
  const gearMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7 })
  const gear = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 6, 8), gearMat)
  gear.position.set(x - 1.51, 1.8, z)
  gear.rotation.y = Math.PI / 2
  scene.add(gear)
  animatedParts.push({ type: 'spin', mesh: gear })
}

function createCabin(scene, zone) {
  const { x, z, color } = zone
  const logMat = new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.9 })
  const roofMat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 })

  // Cabin body
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.2, 2.5), logMat)
  body.position.set(x, 1.1, z)
  body.castShadow = true
  scene.add(body)

  // A-frame roof
  const roofGeo = new THREE.ConeGeometry(2.2, 1.5, 4)
  const roof = new THREE.Mesh(roofGeo, roofMat)
  roof.position.set(x, 2.95, z)
  roof.rotation.y = Math.PI / 4
  roof.castShadow = true
  scene.add(roof)

  // Window with warm glow
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0xffcc66,
    emissive: 0xffaa33,
    emissiveIntensity: 0.7,
    transparent: true,
    opacity: 0.8,
  })
  const window1 = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.5), windowMat)
  window1.position.set(x - 0.5, 1.4, z + 1.26)
  scene.add(window1)
  const window2 = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.5), windowMat)
  window2.position.set(x + 0.5, 1.4, z + 1.26)
  scene.add(window2)

  // Chimney
  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4),
    new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.7 }))
  chimney.position.set(x + 0.8, 3.2, z - 0.5)
  chimney.castShadow = true
  scene.add(chimney)

  // Smoke particles (simple spheres that float up)
  for (let i = 0; i < 3; i++) {
    const smoke = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.3 }))
    smoke.position.set(x + 0.8, 3.8 + i * 0.4, z - 0.5)
    scene.add(smoke)
    animatedParts.push({ type: 'smoke', mesh: smoke, baseY: 3.8, baseX: x + 0.8, baseZ: z - 0.5, offset: i * 2 })
  }

  // Warm interior light
  const glow = new THREE.PointLight(0xffaa33, 0.5, 6)
  glow.position.set(x, 1.2, z)
  scene.add(glow)

  // Door
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a })
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 1.4), doorMat)
  door.position.set(x, 0.7, z + 1.26)
  scene.add(door)
}

function createTower(scene, zone) {
  const { x, z, color } = zone
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x3a3a4a, roughness: 0.6, metalness: 0.3 })

  // Multi-floor tower
  for (let floor = 0; floor < 3; floor++) {
    const floorMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 2.4), wallMat)
    floorMesh.position.set(x, 0.6 + floor * 1.3, z)
    floorMesh.castShadow = true
    scene.add(floorMesh)

    // Floor separator line
    const lineMat = new THREE.MeshBasicMaterial({ color })
    const line = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.04, 2.5), lineMat)
    line.position.set(x, 1.2 + floor * 1.3, z)
    scene.add(line)

    // Windows on each floor
    const winMat = new THREE.MeshStandardMaterial({
      color: 0x334488,
      emissive: 0x2244aa,
      emissiveIntensity: 0.4 + floor * 0.15,
    })
    for (const wx of [-0.6, 0, 0.6]) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.5), winMat)
      win.position.set(x + wx, 0.6 + floor * 1.3, z + 1.21)
      scene.add(win)
    }
  }

  // Antenna on top
  const antennaMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7 })
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.5), antennaMat)
  antenna.position.set(x, 4.65, z)
  scene.add(antenna)

  // Blinking red light on antenna
  const redLight = new THREE.PointLight(0xff3333, 0.4, 3)
  redLight.position.set(x, 5.4, z)
  scene.add(redLight)
  const redBulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6),
    new THREE.MeshStandardMaterial({ color: 0xff3333, emissive: 0xff0000, emissiveIntensity: 1 }))
  redBulb.position.set(x, 5.4, z)
  scene.add(redBulb)
  animatedParts.push({ type: 'blink', light: redLight, bulbMat: redBulb.material, color: 0xff3333 })

  // Sign on front
  const signCanvas = document.createElement('canvas')
  signCanvas.width = 128
  signCanvas.height = 32
  const sctx = signCanvas.getContext('2d')
  sctx.fillStyle = '#2a2a3a'
  sctx.fillRect(0, 0, 128, 32)
  sctx.font = 'bold 14px "Space Grotesk", sans-serif'
  sctx.fillStyle = '#8B7355'
  sctx.textAlign = 'center'
  sctx.fillText('EXPERIENCE', 64, 22)
  const signTex = new THREE.CanvasTexture(signCanvas)
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.4),
    new THREE.MeshBasicMaterial({ map: signTex }))
  signMesh.position.set(x, 0.4, z + 1.22)
  scene.add(signMesh)
}

function createMailStation(scene, zone) {
  const { x, z, color } = zone
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x3a3a4a, roughness: 0.7 })

  // Platform base
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.6, 0.3, 8), baseMat)
  platform.position.set(x, 0.15, z)
  platform.castShadow = true
  scene.add(platform)

  // Central pillar
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 2.5), baseMat)
  pillar.position.set(x, 1.55, z)
  pillar.castShadow = true
  scene.add(pillar)

  // Satellite dish on top
  const dishMat = new THREE.MeshStandardMaterial({ color, metalness: 0.5, roughness: 0.3 })
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dishMat)
  dish.position.set(x, 2.8, z)
  dish.rotation.x = Math.PI
  dish.castShadow = true
  scene.add(dish)
  animatedParts.push({ type: 'rotate', mesh: dish, baseY: 2.8 })

  // Signal rings radiating out
  for (let i = 0; i < 3; i++) {
    const signalMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.15 - i * 0.04,
      side: THREE.DoubleSide,
    })
    const signal = new THREE.Mesh(new THREE.RingGeometry(0.5 + i * 0.5, 0.55 + i * 0.5, 16), signalMat)
    signal.position.set(x, 3.5 + i * 0.3, z)
    scene.add(signal)
    animatedParts.push({ type: 'pulse', mesh: signal, baseScale: 1, index: i })
  }

  // Mailboxes around base
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x4a6a8a, roughness: 0.6 })
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
    const bx = x + Math.cos(angle) * 1.2
    const bz = z + Math.sin(angle) * 1.2
    const mailbox = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.3), boxMat)
    mailbox.position.set(bx, 0.55, bz)
    mailbox.rotation.y = -angle
    mailbox.castShadow = true
    scene.add(mailbox)
  }

  // Glow
  const glow = new THREE.PointLight(color, 0.4, 6)
  glow.position.set(x, 3, z)
  scene.add(glow)
}

function createFloatingLabel(text) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 256, 64)
  ctx.font = 'bold 28px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#E8DDD0'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 128, 32)

  const texture = new THREE.CanvasTexture(canvas)
  const geo = new THREE.PlaneGeometry(3.5, 0.875)
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide,
  })
  const label = new THREE.Mesh(geo, mat)
  label.renderOrder = 999
  return label
}

let animTime = 0

export function updateZoneAnimations(dt) {
  animTime += dt
  for (const part of animatedParts) {
    if (part.type === 'blink') {
      const on = Math.sin(animTime * 3) > 0
      part.light.intensity = on ? 0.5 : 0.05
      part.bulbMat.emissiveIntensity = on ? 0.8 : 0.1
    }
    if (part.type === 'spin') {
      part.mesh.rotation.z += 0.02
    }
    if (part.type === 'smoke') {
      const t = (animTime + part.offset) % 4
      part.mesh.position.y = part.baseY + t * 0.5
      part.mesh.position.x = part.baseX + Math.sin(animTime * 0.5 + part.offset) * 0.15
      part.mesh.material.opacity = Math.max(0, 0.3 - t * 0.08)
    }
    if (part.type === 'rotate') {
      part.mesh.rotation.y = animTime * 0.3
    }
    if (part.type === 'pulse') {
      const s = 1 + Math.sin(animTime * 2 + part.index) * 0.15
      part.mesh.scale.set(s, s, s)
    }
  }
}

export function checkZoneProximity(playerX, playerZ) {
  for (const zone of ZONE_DEFS) {
    const dist = Math.hypot(playerX - zone.x, playerZ - zone.z)
    if (dist < zone.radius) {
      return zone
    }
  }
  return null
}

export function billboardLabels(camera) {
  for (const label of zoneLabels) {
    label.lookAt(camera.position)
  }
}

export function checkBuildingCollision() { return false }
