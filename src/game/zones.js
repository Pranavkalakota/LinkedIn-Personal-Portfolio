import * as THREE from 'three'

const ENTER_RADIUS = 5

export const ZONE_DEFS = [
  { id: 'projects', label: 'Projects', x: 10, z: -10, color: 0xC2694F },
  { id: 'about', label: 'About Me', x: -10, z: -10, color: 0x6B7C5E },
  { id: 'resume', label: 'Experience', x: -10, z: 10, color: 0x8B7355 },
  { id: 'contact', label: 'Contact', x: 10, z: 10, color: 0x4a6a8a },
]

const zoneGroups = []

export function createZoneStructures(scene) {
  for (const zone of ZONE_DEFS) {
    const group = new THREE.Group()
    group.position.set(zone.x, 0, zone.z)

    if (zone.id === 'projects') createProjectsBuilding(group, zone.color)
    else if (zone.id === 'about') createAboutHouse(group, zone.color)
    else if (zone.id === 'resume') createResumeBuilding(group, zone.color)
    else if (zone.id === 'contact') createContactStation(group, zone.color)

    createZoneRing(group, zone.color)
    createFloatingLabel(group, zone.label)

    scene.add(group)
    zoneGroups.push(group)
  }
}

export function billboardLabels(camera) {
  for (const group of zoneGroups) {
    const label = group.userData.label
    if (label) label.lookAt(camera.position)
  }
}

const BUILDING_RADIUS = 2

export function checkZoneProximity(px, pz) {
  for (const zone of ZONE_DEFS) {
    const dist = Math.hypot(px - zone.x, pz - zone.z)
    if (dist < ENTER_RADIUS) return zone.id
  }
  return null
}

export function checkBuildingCollision(px, pz) {
  for (const zone of ZONE_DEFS) {
    const dist = Math.hypot(px - zone.x, pz - zone.z)
    if (dist < BUILDING_RADIUS) return true
  }
  return false
}

function createZoneRing(group, color) {
  const ringGeo = new THREE.RingGeometry(3.2, 3.5, 32)
  const ringMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.02
  group.add(ring)
}

function createFloatingLabel(group, text) {
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
  const geo = new THREE.PlaneGeometry(4, 1)
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide,
  })
  const label = new THREE.Mesh(geo, mat)
  label.position.y = 5.5
  label.renderOrder = 999

  group.add(label)
  group.userData.label = label
}

function createProjectsBuilding(group, color) {
  const baseMat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.8 })
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffcc66,
    emissive: 0xffaa33,
    emissiveIntensity: 0.3,
  })

  const base = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), baseMat)
  base.position.y = 1.5
  base.castShadow = true
  group.add(base)

  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.5, 1.5, 4), baseMat)
  roof.position.y = 3.75
  roof.rotation.y = Math.PI / 4
  roof.castShadow = true
  group.add(roof)

  const windowGeo = new THREE.PlaneGeometry(0.6, 0.8)
  const windows = [
    [0, 1.5, 1.51], [0.8, 1.5, 1.51], [-0.8, 1.5, 1.51],
    [0, 2.3, 1.51],
  ]
  for (const [wx, wy, wz] of windows) {
    const w = new THREE.Mesh(windowGeo, glowMat)
    w.position.set(wx, wy, wz)
    group.add(w)
  }

  const antennaGeo = new THREE.CylinderGeometry(0.03, 0.03, 2)
  const antenna = new THREE.Mesh(antennaGeo, darkMat)
  antenna.position.set(0.8, 5, 0)
  group.add(antenna)

  const dishGeo = new THREE.SphereGeometry(0.3, 8, 4, 0, Math.PI)
  const dish = new THREE.Mesh(dishGeo, darkMat)
  dish.position.set(0.8, 5.5, 0)
  dish.rotation.x = -0.5
  group.add(dish)
}

function createAboutHouse(group, color) {
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x4a6a5a, roughness: 0.8 })
  const roofMat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffcc66,
    emissive: 0xffaa33,
    emissiveIntensity: 0.3,
  })

  const walls = new THREE.Mesh(new THREE.BoxGeometry(3, 2.5, 3.5), wallMat)
  walls.position.y = 1.25
  walls.castShadow = true
  group.add(walls)

  const roofShape = new THREE.Shape()
  roofShape.moveTo(-2, 0)
  roofShape.lineTo(0, 1.5)
  roofShape.lineTo(2, 0)
  const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 4, bevelEnabled: false })
  const roof = new THREE.Mesh(roofGeo, roofMat)
  roof.position.set(0, 2.5, -2)
  roof.castShadow = true
  group.add(roof)

  const doorGeo = new THREE.PlaneGeometry(0.7, 1.2)
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x3d2817 })
  const door = new THREE.Mesh(doorGeo, doorMat)
  door.position.set(0, 0.6, 1.76)
  group.add(door)

  const windowGeo = new THREE.PlaneGeometry(0.6, 0.6)
  const w1 = new THREE.Mesh(windowGeo, glowMat)
  w1.position.set(-0.8, 1.5, 1.76)
  group.add(w1)
  const w2 = new THREE.Mesh(windowGeo, glowMat)
  w2.position.set(0.8, 1.5, 1.76)
  group.add(w2)
}

function createResumeBuilding(group, color) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.75 })
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x6688aa,
    roughness: 0.3,
    metalness: 0.5,
    transparent: true,
    opacity: 0.6,
  })

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.5, 4, 2.5), mat)
  base.position.y = 2
  base.castShadow = true
  group.add(base)

  for (let floor = 0; floor < 3; floor++) {
    for (let side = 0; side < 4; side++) {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), glassMat)
      const angle = (side * Math.PI) / 2
      w.position.set(
        Math.sin(angle) * 1.26,
        0.8 + floor * 1.2,
        Math.cos(angle) * 1.26
      )
      w.rotation.y = angle
      group.add(w)
    }
  }

  const awningGeo = new THREE.BoxGeometry(3, 0.1, 1)
  const awning = new THREE.Mesh(awningGeo, mat)
  awning.position.set(0, 0.3, 1.5)
  group.add(awning)
}

function createContactStation(group, color) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 })

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 0.5, 8), mat)
  base.position.y = 0.25
  base.castShadow = true
  group.add(base)

  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 4, 8), metalMat)
  pillar.position.y = 2.5
  pillar.castShadow = true
  group.add(pillar)

  const topGeo = new THREE.SphereGeometry(1, 8, 8)
  const topMat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.15,
    roughness: 0.5,
  })
  const top = new THREE.Mesh(topGeo, topMat)
  top.position.y = 4.8
  top.castShadow = true
  group.add(top)

  const ringGeo2 = new THREE.TorusGeometry(1.3, 0.08, 8, 16)
  const ringMesh = new THREE.Mesh(ringGeo2, metalMat)
  ringMesh.position.y = 4.8
  ringMesh.rotation.x = Math.PI / 2
  group.add(ringMesh)

  const light = new THREE.PointLight(color, 0.5, 10)
  light.position.set(0, 5, 0)
  group.add(light)
}
