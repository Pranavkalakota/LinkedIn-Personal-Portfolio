import * as THREE from 'three'

// Real tennis court proportions: 78ft long x 36ft wide (doubles)
// We scale to ~30 x 14 units for playable space
const COURT_LENGTH = 30
const COURT_WIDTH = 14
const HALF = COURT_LENGTH / 2
const HALF_W = COURT_WIDTH / 2

export const COURT_BOUNDS = {
  minX: -HALF_W - 4,
  maxX: HALF_W + 4,
  minZ: -HALF - 4,
  maxZ: HALF + 4,
}

const COLLIDERS = []

export function getColliders() { return COLLIDERS }

function addCollider(cx, cz, hw, hd) {
  COLLIDERS.push({ minX: cx - hw, maxX: cx + hw, minZ: cz - hd, maxZ: cz + hd })
}

export function checkCollision(x, z, radius) {
  for (const c of COLLIDERS) {
    const closestX = Math.max(c.minX, Math.min(x, c.maxX))
    const closestZ = Math.max(c.minZ, Math.min(z, c.maxZ))
    const dx = x - closestX
    const dz = z - closestZ
    if (dx * dx + dz * dz < radius * radius) return true
  }
  return false
}

export function createWorld(scene) {
  createSurroundings(scene)
  createCourt(scene)
  createTrees(scene)
  createDecorations(scene)
  createNameText(scene)
  createStars(scene)
  createCourtSideProps(scene)
  registerColliders()
}

function registerColliders() {
  // Net (spans X at Z=0)
  addCollider(0, 0, HALF_W + 1, 0.15)

  // Benches
  addCollider(-HALF_W - 2.5, -5, 0.7, 0.35)
  addCollider(-HALF_W - 2.5, 5, 0.7, 0.35)
  addCollider(HALF_W + 2.5, -5, 0.7, 0.35)
  addCollider(HALF_W + 2.5, 5, 0.7, 0.35)

  // Umpire chair
  addCollider(0, -HALF - 2.5, 0.5, 0.4)

  // Scoreboard legs
  addCollider(0, HALF + 3, 2, 0.2)

  // Floodlight poles
  addCollider(-HALF_W - 1, -HALF - 1, 0.15, 0.15)
  addCollider(HALF_W + 1, -HALF - 1, 0.15, 0.15)
  addCollider(-HALF_W - 1, HALF + 1, 0.15, 0.15)
  addCollider(HALF_W + 1, HALF + 1, 0.15, 0.15)

  // Zone buildings
  // Projects workshop (-10, -8): 3x2.5 box
  addCollider(-10, -8, 1.8, 1.5)
  // About Me cabin (10, -8): 2.8x2.5 box
  addCollider(10, -8, 1.6, 1.5)
  // Experience tower (-10, 8): 2.4x2.4 box
  addCollider(-10, 8, 1.5, 1.5)
  // Contact mail station (10, 8): ~1.6 radius platform
  addCollider(10, 8, 1.8, 1.8)

  // Robotic arm
  addCollider(-HALF_W - 2.5, 3, 0.6, 0.6)

  // Laptop bench area
  addCollider(-HALF_W - 2.5, -3, 0.6, 0.4)

  // Mailbox prop
  addCollider(HALF_W + 2.5, 3, 0.4, 0.3)
}

function createSurroundings(scene) {
  const geo = new THREE.PlaneGeometry(100, 100, 40, 40)
  const positions = geo.attributes.position
  for (let i = 0; i < positions.count; i++) {
    positions.setZ(i, (Math.random() - 0.5) * 0.1)
  }
  geo.computeVertexNormals()

  const mat = new THREE.MeshStandardMaterial({
    color: 0x1a3322,
    roughness: 0.95,
  })
  const ground = new THREE.Mesh(geo, mat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)
}

function createCourt(scene) {
  // Main court surface (clay)
  const courtGeo = new THREE.PlaneGeometry(COURT_WIDTH + 2, COURT_LENGTH + 2)
  const courtMat = new THREE.MeshStandardMaterial({
    color: 0xA0522D,
    roughness: 0.85,
  })
  const court = new THREE.Mesh(courtGeo, courtMat)
  court.rotation.x = -Math.PI / 2
  court.position.y = 0.02
  court.receiveShadow = true
  scene.add(court)

  const lineMat = new THREE.MeshBasicMaterial({ color: 0xF5F0E8 })
  const LW = 0.08

  // Court lines — proper tennis court layout
  // The court is oriented along Z (long axis), X is short axis
  // Baselines (short ends)
  addLine(scene, lineMat, -HALF_W, -HALF, HALF_W, -HALF, LW)  // near baseline
  addLine(scene, lineMat, -HALF_W, HALF, HALF_W, HALF, LW)     // far baseline
  // Sidelines (long sides) — singles
  const SW = 4.5  // singles court half-width
  addLine(scene, lineMat, -SW, -HALF, -SW, HALF, LW)
  addLine(scene, lineMat, SW, -HALF, SW, HALF, LW)
  // Sidelines — doubles
  addLine(scene, lineMat, -HALF_W, -HALF, -HALF_W, HALF, LW)
  addLine(scene, lineMat, HALF_W, -HALF, HALF_W, HALF, LW)
  // Service lines
  const SL = 6.4  // service line distance from net
  addLine(scene, lineMat, -SW, -SL, SW, -SL, LW)
  addLine(scene, lineMat, -SW, SL, SW, SL, LW)
  // Center service line (T)
  addLine(scene, lineMat, 0, -SL, 0, SL, LW)
  // Center marks on baselines
  addLine(scene, lineMat, 0, -HALF, 0, -HALF + 0.6, LW)
  addLine(scene, lineMat, 0, HALF, 0, HALF - 0.6, LW)

  // Net — across the short dimension (X axis), at center (Z=0)
  const netGeo = new THREE.PlaneGeometry(COURT_WIDTH + 2, 1.2)
  const netMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    roughness: 0.8,
  })
  const net = new THREE.Mesh(netGeo, netMat)
  net.position.set(0, 0.6, 0)
  scene.add(net)

  // Net posts
  const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.3)
  const postMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.6 })
  const postL = new THREE.Mesh(postGeo, postMat)
  postL.position.set(-HALF_W - 0.5, 0.65, 0)
  postL.castShadow = true
  scene.add(postL)
  const postR = postL.clone()
  postR.position.set(HALF_W + 0.5, 0.65, 0)
  scene.add(postR)

  // Net cable
  const cableGeo = new THREE.CylinderGeometry(0.015, 0.015, COURT_WIDTH + 2)
  const cable = new THREE.Mesh(cableGeo, postMat)
  cable.position.set(0, 1.2, 0)
  cable.rotation.z = Math.PI / 2
  scene.add(cable)

  // Service box highlight overlays (subtle colored tint per zone)
  const boxColors = [
    { x: -SW / 2, z: -SL / 2, color: 0xC2694F, w: SW, h: SL },    // near-left: Projects
    { x: SW / 2, z: -SL / 2, color: 0x6B7C5E, w: SW, h: SL },     // near-right: About
    { x: -SW / 2, z: SL / 2, color: 0x8B7355, w: SW, h: SL },      // far-left: Experience
    { x: SW / 2, z: SL / 2, color: 0x4a6a8a, w: SW, h: SL },       // far-right: Contact
  ]
  for (const box of boxColors) {
    const geo = new THREE.PlaneGeometry(box.w, box.h)
    const mat = new THREE.MeshBasicMaterial({
      color: box.color,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(box.x, 0.025, box.z)
    scene.add(mesh)
  }
}

function addLine(scene, mat, x1, z1, x2, z2, width) {
  const dx = x2 - x1
  const dz = z2 - z1
  const len = Math.sqrt(dx * dx + dz * dz)
  const isVertical = Math.abs(dx) < 0.01

  const geo = isVertical
    ? new THREE.PlaneGeometry(width, len)
    : new THREE.PlaneGeometry(len, width)
  const line = new THREE.Mesh(geo, mat)
  line.rotation.x = -Math.PI / 2
  line.position.set((x1 + x2) / 2, 0.03, (z1 + z2) / 2)
  if (!isVertical && Math.abs(dz) > 0.01) {
    line.rotation.z = -Math.atan2(dz, dx)
  }
  scene.add(line)
}

function createTrees(scene) {
  const treePositions = [
    [-12, -18], [-14, -10], [-12, 0], [-14, 10], [-12, 18],
    [12, -18], [14, -10], [12, 0], [14, 10], [12, 18],
    [-10, -22], [0, -24], [10, -22],
    [-10, 22], [0, 24], [10, 22],
    [-16, -16], [16, -16], [-16, 16], [16, 16],
    [-18, 0], [18, 0],
  ]

  for (const [x, z] of treePositions) {
    const height = 2.5 + Math.random() * 2.5
    const radius = 0.8 + Math.random() * 0.8
    const jx = x + (Math.random() - 0.5) * 2
    const jz = z + (Math.random() - 0.5) * 2
    createTree(scene, jx, jz, height, radius)
  }
}

function createTree(scene, x, z, height, radius) {
  const trunkHeight = height * 0.35
  const trunkGeo = new THREE.CylinderGeometry(0.1, 0.16, trunkHeight, 6)
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1a, roughness: 0.9 })
  const trunk = new THREE.Mesh(trunkGeo, trunkMat)
  trunk.position.set(x, trunkHeight / 2, z)
  trunk.castShadow = true
  scene.add(trunk)

  const shades = [0x2d5a27, 0x1e4d1e, 0x3a6b2a, 0x2a5e35]
  const shade = shades[Math.floor(Math.random() * shades.length)]

  const layers = 2 + Math.floor(Math.random() * 2)
  for (let i = 0; i < layers; i++) {
    const layerRadius = radius * (1 - i * 0.25)
    const layerHeight = height * 0.35
    const leavesGeo = new THREE.ConeGeometry(layerRadius, layerHeight, 7)
    const leavesMat = new THREE.MeshStandardMaterial({ color: shade, roughness: 0.85 })
    const leaves = new THREE.Mesh(leavesGeo, leavesMat)
    leaves.position.set(x, trunkHeight + i * layerHeight * 0.5, z)
    leaves.castShadow = true
    scene.add(leaves)
  }
}

function createDecorations(scene) {
  // Floodlights at the four corners of the court
  const lampPositions = [
    [-HALF_W - 1, -HALF - 1],
    [HALF_W + 1, -HALF - 1],
    [-HALF_W - 1, HALF + 1],
    [HALF_W + 1, HALF + 1],
  ]

  const poleMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.5 })
  const lightMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, emissive: 0xffbb44, emissiveIntensity: 0.6 })

  for (const [x, z] of lampPositions) {
    const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, 5)
    const pole = new THREE.Mesh(poleGeo, poleMat)
    pole.position.set(x, 2.5, z)
    pole.castShadow = true
    scene.add(pole)

    const bulbGeo = new THREE.BoxGeometry(0.5, 0.15, 0.5)
    const bulb = new THREE.Mesh(bulbGeo, lightMat)
    bulb.position.set(x, 5.1, z)
    scene.add(bulb)

    const light = new THREE.PointLight(0xffdd88, 0.6, 20)
    light.position.set(x, 5, z)
    scene.add(light)
  }

  // Benches along the sides
  const benchMat = new THREE.MeshStandardMaterial({ color: 0x6a4a2a, roughness: 0.9 })
  const benchPositions = [
    [-HALF_W - 2.5, -5], [-HALF_W - 2.5, 5],
    [HALF_W + 2.5, -5], [HALF_W + 2.5, 5],
  ]
  for (const [x, z] of benchPositions) {
    const seatGeo = new THREE.BoxGeometry(1.2, 0.08, 0.5)
    const seat = new THREE.Mesh(seatGeo, benchMat)
    seat.position.set(x, 0.5, z)
    seat.castShadow = true
    scene.add(seat)

    const legGeo = new THREE.BoxGeometry(0.06, 0.5, 0.06)
    for (const lx of [-0.5, 0.5]) {
      for (const lz of [-0.2, 0.2]) {
        const leg = new THREE.Mesh(legGeo, benchMat)
        leg.position.set(x + lx, 0.25, z + lz)
        scene.add(leg)
      }
    }
  }

  // Umpire chair (behind baseline, centered)
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x445566, metalness: 0.4 })
  const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.6), chairMat)
  chairSeat.position.set(0, 3, -HALF - 2.5)
  scene.add(chairSeat)
  const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.06), chairMat)
  chairBack.position.set(0, 3.4, -HALF - 2.8)
  scene.add(chairBack)
  for (const lx of [-0.35, 0.35]) {
    const chairLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3), chairMat)
    chairLeg.position.set(lx, 1.5, -HALF - 2.5)
    scene.add(chairLeg)
  }
}

function createNameText(scene) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 1024, 256)
  ctx.font = 'bold 120px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(200, 180, 160, 0.12)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('PRANAV', 512, 90)
  ctx.fillText('KALAKOTA', 512, 190)

  const texture = new THREE.CanvasTexture(canvas)
  const geo = new THREE.PlaneGeometry(16, 4)
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  })
  const textMesh = new THREE.Mesh(geo, mat)
  textMesh.rotation.x = -Math.PI / 2
  textMesh.position.set(0, 0.035, 0)
  scene.add(textMesh)
}

function createStars(scene) {
  const geometry = new THREE.BufferGeometry()
  const vertices = []

  for (let i = 0; i < 500; i++) {
    const r = 40 + Math.random() * 40
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI * 0.4

    vertices.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) + 10,
      r * Math.sin(phi) * Math.sin(theta)
    )
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, sizeAttenuation: true })
  const stars = new THREE.Points(geometry, material)
  scene.add(stars)
}

// Thematic props near each service box / zone
function createCourtSideProps(scene) {
  // Near Projects zone (near-left service box): laptop on bench
  createLaptop(scene, -HALF_W - 2.5, -3)

  // Near About zone (near-right service box): tennis balls + racket
  createTennisBalls(scene, HALF_W + 2.5, -3)

  // Near Experience zone (far-left service box): animated robotic arm
  createAnimatedRoboticArm(scene, -HALF_W - 2.5, 3)

  // Near Contact zone (far-right service box): mailbox with phone
  createMailbox(scene, HALF_W + 2.5, 3)

  // Scoreboard behind far baseline
  createScoreboard(scene, 0, HALF + 3)
}

function createLaptop(scene, x, z) {
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x333344, metalness: 0.6, roughness: 0.3 })
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x2244aa, emissive: 0x1133aa, emissiveIntensity: 0.5 })

  const baseGeo = new THREE.BoxGeometry(0.9, 0.04, 0.6)
  const base = new THREE.Mesh(baseGeo, baseMat)
  base.position.set(x, 0.52, z)
  scene.add(base)

  const lidGeo = new THREE.BoxGeometry(0.9, 0.6, 0.03)
  const lid = new THREE.Mesh(lidGeo, baseMat)
  lid.position.set(x, 0.82, z - 0.28)
  lid.rotation.x = 0.15
  scene.add(lid)

  const screenGeo = new THREE.PlaneGeometry(0.7, 0.45)
  const screen = new THREE.Mesh(screenGeo, screenMat)
  screen.position.set(x, 0.84, z - 0.265)
  screen.rotation.x = 0.15
  scene.add(screen)

  const codeMat = new THREE.MeshStandardMaterial({ color: 0x44ffaa, emissive: 0x22cc88, emissiveIntensity: 0.4 })
  for (let i = 0; i < 5; i++) {
    const lineWidth = 0.1 + Math.random() * 0.3
    const codeLineGeo = new THREE.PlaneGeometry(lineWidth, 0.02)
    const codeLine = new THREE.Mesh(codeLineGeo, codeMat)
    codeLine.position.set(x - 0.15 + lineWidth / 2, 0.84 + 0.15 - i * 0.07, z - 0.26)
    codeLine.rotation.x = 0.15
    scene.add(codeLine)
  }

  const light = new THREE.PointLight(0x2244aa, 0.3, 5)
  light.position.set(x, 1, z)
  scene.add(light)
}

function createTennisBalls(scene, x, z) {
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xccdd44, roughness: 0.6 })
  const positions = [
    [x, 0.15, z],
    [x + 0.5, 0.15, z + 0.3],
    [x - 0.3, 0.15, z + 0.5],
  ]
  for (const [bx, by, bz] of positions) {
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), ballMat)
    ball.position.set(bx, by, bz)
    ball.castShadow = true
    scene.add(ball)
  }

  // Racket leaning against bench
  const racketMat = new THREE.MeshStandardMaterial({ color: 0xC2694F, roughness: 0.5 })
  const handleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8)
  const handle = new THREE.Mesh(handleGeo, racketMat)
  handle.position.set(x + 0.8, 0.4, z)
  handle.rotation.z = -0.8
  handle.rotation.x = 0.2
  scene.add(handle)

  const headGeo = new THREE.RingGeometry(0.15, 0.22, 12)
  const headMesh = new THREE.Mesh(headGeo, racketMat)
  headMesh.position.set(x + 1.2, 0.75, z)
  headMesh.rotation.y = 0.3
  scene.add(headMesh)
}

// Animated robotic arm for Pololu / Experience zone
let roboticArmParts = null

export function createAnimatedRoboticArm(scene, x, z) {
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x889999, metalness: 0.8, roughness: 0.2 })
  const jointMat = new THREE.MeshStandardMaterial({ color: 0xC2694F, metalness: 0.6, roughness: 0.3 })
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x44ff88, emissive: 0x22cc66, emissiveIntensity: 0.4 })

  // Base platform
  const basePlat = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.2, 8), metalMat)
  basePlat.position.set(x, 0.1, z)
  basePlat.castShadow = true
  scene.add(basePlat)

  // Rotating base
  const baseRotor = new THREE.Group()
  baseRotor.position.set(x, 0.2, z)
  scene.add(baseRotor)

  // Lower arm segment
  const lowerArm = new THREE.Group()
  const lowerGeo = new THREE.BoxGeometry(0.12, 1.0, 0.12)
  const lowerMesh = new THREE.Mesh(lowerGeo, metalMat)
  lowerMesh.position.y = 0.5
  lowerMesh.castShadow = true
  lowerArm.add(lowerMesh)

  const joint1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), jointMat)
  joint1.position.y = 0
  lowerArm.add(joint1)

  baseRotor.add(lowerArm)

  // Upper arm segment
  const upperArm = new THREE.Group()
  upperArm.position.y = 1.0
  const upperGeo = new THREE.BoxGeometry(0.1, 0.8, 0.1)
  const upperMesh = new THREE.Mesh(upperGeo, metalMat)
  upperMesh.position.y = 0.4
  upperMesh.castShadow = true
  upperArm.add(upperMesh)

  const joint2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), jointMat)
  joint2.position.y = 0
  upperArm.add(joint2)

  lowerArm.add(upperArm)

  // Gripper / end effector
  const gripper = new THREE.Group()
  gripper.position.y = 0.8
  const gripJoint = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), gripMat)
  gripper.add(gripJoint)

  const finger1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 0.06), gripMat)
  finger1.position.set(-0.05, 0.1, 0)
  gripper.add(finger1)
  const finger2 = finger1.clone()
  finger2.position.set(0.05, 0.1, 0)
  gripper.add(finger2)

  upperArm.add(gripper)

  // Glow light
  const armLight = new THREE.PointLight(0x44ff88, 0.4, 5)
  armLight.position.set(x, 1.5, z)
  scene.add(armLight)

  // "POLOLU" label plate on base
  const labelCanvas = document.createElement('canvas')
  labelCanvas.width = 128
  labelCanvas.height = 32
  const lctx = labelCanvas.getContext('2d')
  lctx.fillStyle = '#889999'
  lctx.fillRect(0, 0, 128, 32)
  lctx.font = 'bold 16px "Space Grotesk", sans-serif'
  lctx.fillStyle = '#0a0a14'
  lctx.textAlign = 'center'
  lctx.fillText('POLOLU', 64, 22)
  const labelTex = new THREE.CanvasTexture(labelCanvas)
  const labelGeo = new THREE.PlaneGeometry(0.6, 0.15)
  const labelMesh = new THREE.Mesh(labelGeo, new THREE.MeshBasicMaterial({ map: labelTex }))
  labelMesh.position.set(x, 0.25, z + 0.35)
  scene.add(labelMesh)

  roboticArmParts = { baseRotor, lowerArm, upperArm, gripper, finger1, finger2 }
}

export function updateRoboticArm(time) {
  if (!roboticArmParts) return
  const { baseRotor, lowerArm, upperArm, gripper, finger1, finger2 } = roboticArmParts

  baseRotor.rotation.y = Math.sin(time * 0.5) * 1.2
  lowerArm.rotation.z = Math.sin(time * 0.7) * 0.3 + 0.2
  upperArm.rotation.z = Math.sin(time * 0.9 + 1) * 0.4 - 0.3

  const grip = Math.sin(time * 2) * 0.03
  finger1.position.x = -0.05 - grip
  finger2.position.x = 0.05 + grip
}

function createMailbox(scene, x, z) {
  const postMat = new THREE.MeshStandardMaterial({ color: 0x6a4a2a, roughness: 0.9 })
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x4a6a8a, roughness: 0.6 })

  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2), postMat)
  post.position.set(x, 0.6, z)
  post.castShadow = true
  scene.add(post)

  const boxBody = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.35), boxMat)
  boxBody.position.set(x, 1.4, z)
  boxBody.castShadow = true
  scene.add(boxBody)

  const topGeo = new THREE.CylinderGeometry(0.175, 0.175, 0.6, 8, 1, false, 0, Math.PI)
  const top = new THREE.Mesh(topGeo, boxMat)
  top.position.set(x, 1.6, z)
  top.rotation.z = Math.PI / 2
  top.rotation.y = Math.PI / 2
  scene.add(top)

  const flagMat = new THREE.MeshStandardMaterial({ color: 0xcc4444, roughness: 0.5 })
  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5), flagMat)
  flagPole.position.set(x + 0.32, 1.5, z)
  scene.add(flagPole)
  const flag = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.02), flagMat)
  flag.position.set(x + 0.32, 1.75, z)
  scene.add(flag)
}

function createScoreboard(scene, x, z) {
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a2a3a, metalness: 0.5, roughness: 0.4 })
  const frame = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 0.15), frameMat)
  frame.position.set(x, 2.5, z)
  frame.castShadow = true
  scene.add(frame)

  // Screen
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0a0a14'
  ctx.fillRect(0, 0, 512, 256)
  ctx.font = 'bold 28px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#C2694F'
  ctx.textAlign = 'center'
  ctx.fillText('PRANAV KALAKOTA', 256, 50)
  ctx.font = '18px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#F5F0E8'
  ctx.fillText('CS @ Purdue University', 256, 90)
  ctx.fillText('AI + Hardware + Software', 256, 120)
  ctx.font = '14px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(232, 221, 208, 0.4)'
  ctx.fillText('Java  |  Python  |  C  |  Swift  |  TypeScript', 256, 170)
  ctx.fillText('Arduino  |  ONNX  |  ChromaDB  |  Express', 256, 195)
  ctx.font = '12px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(194, 105, 79, 0.5)'
  ctx.fillText('Find keys to unlock each building', 256, 235)

  const tex = new THREE.CanvasTexture(canvas)
  const screenGeo = new THREE.PlaneGeometry(3.6, 2.1)
  const screenMesh = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: tex }))
  screenMesh.position.set(x, 2.5, z - 0.08)
  scene.add(screenMesh)

  // Support legs
  for (const lx of [-1.5, 1.5]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.5), frameMat)
    leg.position.set(x + lx, 1.25, z + 0.1)
    leg.rotation.x = 0.05
    scene.add(leg)
  }
}
