import * as THREE from 'three'

const ENTER_RADIUS = 3.5

// Zones mapped to service boxes on the court
// Service boxes: near side Z < 0, far side Z > 0
// Left side X < 0, right side X > 0
// SW half-width = 4.5, SL (service line distance) = 6.4
const SW_HALF = 2.25  // center of each service box X
const SL_HALF = 3.2   // center of each service box Z

export const ZONE_DEFS = [
  { id: 'projects', label: 'Projects', x: -SW_HALF, z: -SL_HALF, color: 0xC2694F },
  { id: 'about', label: 'About Me', x: SW_HALF, z: -SL_HALF, color: 0x6B7C5E },
  { id: 'resume', label: 'Experience', x: -SW_HALF, z: SL_HALF, color: 0x8B7355 },
  { id: 'contact', label: 'Contact', x: SW_HALF, z: SL_HALF, color: 0x4a6a8a },
]

const zoneGroups = []

export function createZoneStructures(scene) {
  for (const zone of ZONE_DEFS) {
    const group = new THREE.Group()
    group.position.set(zone.x, 0, zone.z)

    createServiceBoxMarker(group, zone)
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

export function checkZoneProximity(px, pz) {
  for (const zone of ZONE_DEFS) {
    const dist = Math.hypot(px - zone.x, pz - zone.z)
    if (dist < ENTER_RADIUS) return zone.id
  }
  return null
}

export function checkBuildingCollision() {
  return false
}

function createServiceBoxMarker(group, zone) {
  // Glowing ring on the ground marking the interaction zone
  const ringGeo = new THREE.RingGeometry(2.2, 2.5, 32)
  const ringMat = new THREE.MeshBasicMaterial({
    color: zone.color,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.025
  group.add(ring)

  // Small icon on the ground — a tennis ball with zone color seam
  const ballGeo = new THREE.SphereGeometry(0.2, 12, 12)
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xccdd44,
    roughness: 0.5,
    emissive: zone.color,
    emissiveIntensity: 0.15,
  })
  const ball = new THREE.Mesh(ballGeo, ballMat)
  ball.position.y = 0.2
  ball.castShadow = true
  group.add(ball)

  const light = new THREE.PointLight(zone.color, 0.3, 6)
  light.position.y = 0.5
  group.add(light)
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
  const geo = new THREE.PlaneGeometry(3.5, 0.875)
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide,
  })
  const label = new THREE.Mesh(geo, mat)
  label.position.y = 3.5
  label.renderOrder = 999

  group.add(label)
  group.userData.label = label
}
