import * as THREE from 'three'

export function createWorld(scene) {
  createGround(scene)
  createCourt(scene)
  createTrees(scene)
  createPaths(scene)
  createDecorations(scene)
  createNameText(scene)
  createStars(scene)
  createZoneThematicProps(scene)
}

function createGround(scene) {
  const geo = new THREE.PlaneGeometry(80, 80, 40, 40)
  const positions = geo.attributes.position
  for (let i = 0; i < positions.count; i++) {
    positions.setZ(i, (Math.random() - 0.5) * 0.1)
  }
  geo.computeVertexNormals()

  const mat = new THREE.MeshStandardMaterial({
    color: 0x1a3322,
    roughness: 0.95,
    metalness: 0.0,
  })

  const ground = new THREE.Mesh(geo, mat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)
}

function createCourt(scene) {
  const courtGeo = new THREE.PlaneGeometry(12, 6)
  const courtMat = new THREE.MeshStandardMaterial({
    color: 0xA0522D,
    roughness: 0.85,
    metalness: 0.0,
  })
  const court = new THREE.Mesh(courtGeo, courtMat)
  court.rotation.x = -Math.PI / 2
  court.position.y = 0.02
  court.receiveShadow = true
  scene.add(court)

  const lineMat = new THREE.MeshBasicMaterial({ color: 0xF5F0E8 })

  const lines = [
    [[-6, -3], [6, -3]],
    [[-6, 3], [6, 3]],
    [[-6, -3], [-6, 3]],
    [[6, -3], [6, 3]],
    [[0, -3], [0, 3]],
    [[-6, -1.5], [6, -1.5]],
    [[-6, 1.5], [6, 1.5]],
  ]

  for (const [start, end] of lines) {
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const len = Math.sqrt(dx * dx + dy * dy)
    const isVertical = Math.abs(dx) < 0.01

    const lineGeo = isVertical
      ? new THREE.PlaneGeometry(0.08, len)
      : new THREE.PlaneGeometry(len, 0.08)
    const line = new THREE.Mesh(lineGeo, lineMat)
    line.rotation.x = -Math.PI / 2
    line.position.set((start[0] + end[0]) / 2, 0.03, (start[1] + end[1]) / 2)
    scene.add(line)
  }

  const netGeo = new THREE.PlaneGeometry(12.5, 1.2)
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

  const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.3)
  const postMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.6 })
  const postL = new THREE.Mesh(postGeo, postMat)
  postL.position.set(-6.3, 0.65, 0)
  postL.castShadow = true
  scene.add(postL)
  const postR = postL.clone()
  postR.position.set(6.3, 0.65, 0)
  scene.add(postR)
}

function createTrees(scene) {
  const treePositions = [
    [-15, -8], [-18, -2], [-14, 5], [-17, 10],
    [15, -8], [18, -3], [14, 6], [17, 11],
    [-10, -15], [-3, -18], [5, -16], [12, -14],
    [-10, 15], [-2, 18], [6, 16], [13, 14],
    [-20, -15], [20, -15], [-20, 15], [20, 15],
    [-22, 0], [22, 0], [0, -22], [0, 22],
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

function createPaths(scene) {
  const pathMat = new THREE.MeshStandardMaterial({ color: 0x3a3a4a, roughness: 0.92 })

  const paths = [
    { from: [0, 4], to: [-10, 10], width: 1.8 },
    { from: [0, 4], to: [10, 10], width: 1.8 },
    { from: [0, -4], to: [-10, -10], width: 1.8 },
    { from: [0, -4], to: [10, -10], width: 1.8 },
  ]

  for (const p of paths) {
    const dx = p.to[0] - p.from[0]
    const dz = p.to[1] - p.from[1]
    const len = Math.sqrt(dx * dx + dz * dz)

    const geo = new THREE.PlaneGeometry(len, p.width)
    const path = new THREE.Mesh(geo, pathMat)
    path.rotation.x = -Math.PI / 2
    path.position.set(
      (p.from[0] + p.to[0]) / 2,
      0.01,
      (p.from[1] + p.to[1]) / 2
    )
    path.rotation.z = -Math.atan2(dz, dx)
    path.receiveShadow = true
    scene.add(path)
  }
}

function createDecorations(scene) {
  const lampPositions = [
    [-7, -4], [7, -4], [-7, 4], [7, 4],
    [-3, -7], [3, -7], [-3, 7], [3, 7],
  ]

  const poleMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.5 })
  const lightMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, emissive: 0xffbb44, emissiveIntensity: 0.6 })

  for (const [x, z] of lampPositions) {
    const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 3)
    const pole = new THREE.Mesh(poleGeo, poleMat)
    pole.position.set(x, 1.5, z)
    pole.castShadow = true
    scene.add(pole)

    const bulbGeo = new THREE.SphereGeometry(0.15, 8, 8)
    const bulb = new THREE.Mesh(bulbGeo, lightMat)
    bulb.position.set(x, 3.1, z)
    scene.add(bulb)

    const light = new THREE.PointLight(0xffdd88, 0.5, 10)
    light.position.set(x, 3, z)
    scene.add(light)
  }

  const benchMat = new THREE.MeshStandardMaterial({ color: 0x6a4a2a, roughness: 0.9 })
  const benchPositions = [[-7.5, -1], [-7.5, 1], [7.5, -1], [7.5, 1]]
  for (const [x, z] of benchPositions) {
    const seatGeo = new THREE.BoxGeometry(0.5, 0.08, 1.2)
    const seat = new THREE.Mesh(seatGeo, benchMat)
    seat.position.set(x, 0.5, z)
    seat.castShadow = true
    scene.add(seat)

    const legGeo = new THREE.BoxGeometry(0.06, 0.5, 0.06)
    for (const lx of [-0.2, 0.2]) {
      for (const lz of [-0.5, 0.5]) {
        const leg = new THREE.Mesh(legGeo, benchMat)
        leg.position.set(x + lx, 0.25, z + lz)
        scene.add(leg)
      }
    }
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
  const geo = new THREE.PlaneGeometry(20, 5)
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  })
  const textMesh = new THREE.Mesh(geo, mat)
  textMesh.rotation.x = -Math.PI / 2
  textMesh.position.set(0, 0.04, 0)
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

function createZoneThematicProps(scene) {
  createRobot(scene, -13, 10)
  createLaptop(scene, 13, -10)
  createTennisBalls(scene, -10, -13)
  createMailbox(scene, 13, 10)
}

function createRobot(scene, x, z) {
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x889999, metalness: 0.7, roughness: 0.3 })
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x334444, metalness: 0.5, roughness: 0.4 })
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x44ff88, emissive: 0x22cc66, emissiveIntensity: 0.8 })

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.0, 0.5), metalMat)
  body.position.set(x, 0.8, z)
  body.castShadow = true
  scene.add(body)

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.4), metalMat)
  head.position.set(x, 1.6, z)
  head.castShadow = true
  scene.add(head)

  const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), eyeMat)
  eye1.position.set(x - 0.12, 1.65, z + 0.21)
  scene.add(eye1)
  const eye2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), eyeMat)
  eye2.position.set(x + 0.12, 1.65, z + 0.21)
  scene.add(eye2)

  const antennaGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4)
  const antenna = new THREE.Mesh(antennaGeo, darkMat)
  antenna.position.set(x, 2.05, z)
  scene.add(antenna)
  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), eyeMat)
  antennaTip.position.set(x, 2.25, z)
  scene.add(antennaTip)

  const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6)
  const leftArm = new THREE.Mesh(armGeo, darkMat)
  leftArm.position.set(x - 0.55, 0.7, z)
  leftArm.rotation.z = 0.3
  scene.add(leftArm)
  const rightArm = new THREE.Mesh(armGeo, darkMat)
  rightArm.position.set(x + 0.55, 0.7, z)
  rightArm.rotation.z = -0.3
  scene.add(rightArm)

  const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5)
  const leftLeg = new THREE.Mesh(legGeo, darkMat)
  leftLeg.position.set(x - 0.2, 0.25, z)
  scene.add(leftLeg)
  const rightLeg = new THREE.Mesh(legGeo, darkMat)
  rightLeg.position.set(x + 0.2, 0.25, z)
  scene.add(rightLeg)

  const light = new THREE.PointLight(0x44ff88, 0.3, 5)
  light.position.set(x, 1.5, z)
  scene.add(light)
}

function createLaptop(scene, x, z) {
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x333344, metalness: 0.6, roughness: 0.3 })
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x2244aa, emissive: 0x1133aa, emissiveIntensity: 0.5 })

  const deskGeo = new THREE.BoxGeometry(1.5, 0.8, 1)
  const deskMat = new THREE.MeshStandardMaterial({ color: 0x6a4a2a, roughness: 0.9 })
  const desk = new THREE.Mesh(deskGeo, deskMat)
  desk.position.set(x, 0.4, z)
  desk.castShadow = true
  scene.add(desk)

  const baseGeo = new THREE.BoxGeometry(0.9, 0.04, 0.6)
  const base = new THREE.Mesh(baseGeo, baseMat)
  base.position.set(x, 0.82, z)
  scene.add(base)

  const lidGeo = new THREE.BoxGeometry(0.9, 0.6, 0.03)
  const lid = new THREE.Mesh(lidGeo, baseMat)
  lid.position.set(x, 1.12, z - 0.28)
  lid.rotation.x = 0.15
  scene.add(lid)

  const screenGeo = new THREE.PlaneGeometry(0.7, 0.45)
  const screen = new THREE.Mesh(screenGeo, screenMat)
  screen.position.set(x, 1.14, z - 0.265)
  screen.rotation.x = 0.15
  scene.add(screen)

  const codeMat = new THREE.MeshStandardMaterial({ color: 0x44ffaa, emissive: 0x22cc88, emissiveIntensity: 0.4 })
  for (let i = 0; i < 5; i++) {
    const lineWidth = 0.1 + Math.random() * 0.3
    const codeLineGeo = new THREE.PlaneGeometry(lineWidth, 0.02)
    const codeLine = new THREE.Mesh(codeLineGeo, codeMat)
    codeLine.position.set(x - 0.15 + lineWidth / 2, 1.14 + 0.15 - i * 0.07, z - 0.26)
    codeLine.rotation.x = 0.15
    scene.add(codeLine)
  }

  const light = new THREE.PointLight(0x2244aa, 0.3, 5)
  light.position.set(x, 1.2, z)
  scene.add(light)
}

function createTennisBalls(scene, x, z) {
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xccdd44, roughness: 0.6 })

  const positions = [
    [x, 0.15, z],
    [x + 0.5, 0.15, z + 0.3],
    [x - 0.3, 0.15, z + 0.5],
    [x + 0.2, 0.15, z - 0.4],
    [x - 0.6, 0.15, z - 0.2],
  ]

  for (const [bx, by, bz] of positions) {
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), ballMat)
    ball.position.set(bx, by, bz)
    ball.castShadow = true
    scene.add(ball)
  }

  const hoopMat = new THREE.MeshStandardMaterial({ color: 0x6a4a2a, roughness: 0.85 })
  const hoop = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 12, 1, true), hoopMat)
  hoop.position.set(x, 0.2, z)
  scene.add(hoop)

  const racketMat = new THREE.MeshStandardMaterial({ color: 0xC2694F, roughness: 0.5 })
  const handleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8)
  const handle = new THREE.Mesh(handleGeo, racketMat)
  handle.position.set(x + 1, 0.4, z - 0.5)
  handle.rotation.z = -0.8
  handle.rotation.x = 0.2
  scene.add(handle)

  const headGeo = new THREE.RingGeometry(0.15, 0.22, 12)
  const headMesh = new THREE.Mesh(headGeo, racketMat)
  headMesh.position.set(x + 1.4, 0.75, z - 0.5)
  headMesh.rotation.y = 0.3
  scene.add(headMesh)
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

  const phoneMat = new THREE.MeshStandardMaterial({ color: 0x222233, metalness: 0.5, roughness: 0.3 })
  const phone = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.02), phoneMat)
  phone.position.set(x - 0.8, 0.6, z)
  phone.rotation.z = -0.3
  phone.rotation.y = 0.5
  scene.add(phone)

  const phonScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x3366cc, emissive: 0x2244aa, emissiveIntensity: 0.4 })
  )
  phonScreen.position.set(x - 0.8, 0.6, z + 0.015)
  phonScreen.rotation.z = -0.3
  phonScreen.rotation.y = 0.5
  scene.add(phonScreen)
}
