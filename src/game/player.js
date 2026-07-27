import * as THREE from 'three'

export function createPlayer(scene) {
  const group = new THREE.Group()

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xE8DDD0, roughness: 0.7 })
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2a2a3a, roughness: 0.8 })
  const racketMat = new THREE.MeshStandardMaterial({ color: 0xC2694F, roughness: 0.6 })

  const bodyGeo = new THREE.CapsuleGeometry(0.25, 0.5, 4, 8)
  const body = new THREE.Mesh(bodyGeo, darkMat)
  body.position.y = 0.7
  body.castShadow = true
  group.add(body)

  const headGeo = new THREE.SphereGeometry(0.2, 8, 8)
  const head = new THREE.Mesh(headGeo, bodyMat)
  head.position.y = 1.25
  head.castShadow = true
  group.add(head)

  const armGeo = new THREE.CapsuleGeometry(0.08, 0.35, 4, 6)

  const leftArm = new THREE.Mesh(armGeo, bodyMat)
  leftArm.position.set(-0.35, 0.8, 0)
  leftArm.rotation.z = 0.2
  group.add(leftArm)

  const rightArm = new THREE.Mesh(armGeo, bodyMat)
  rightArm.position.set(0.35, 0.8, 0)
  rightArm.rotation.z = -0.2
  group.add(rightArm)

  const racketHandleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.4)
  const racketHandle = new THREE.Mesh(racketHandleGeo, racketMat)
  racketHandle.position.set(0.5, 0.9, 0.15)
  racketHandle.rotation.z = -0.6
  group.add(racketHandle)

  const racketHeadGeo = new THREE.RingGeometry(0.12, 0.18, 8)
  const racketHead = new THREE.Mesh(racketHeadGeo, racketMat)
  racketHead.position.set(0.65, 1.15, 0.15)
  racketHead.rotation.z = -0.3
  group.add(racketHead)

  const legGeo = new THREE.CapsuleGeometry(0.1, 0.3, 4, 6)

  const leftLeg = new THREE.Mesh(legGeo, darkMat)
  leftLeg.position.set(-0.12, 0.25, 0)
  group.add(leftLeg)

  const rightLeg = new THREE.Mesh(legGeo, darkMat)
  rightLeg.position.set(0.12, 0.25, 0)
  group.add(rightLeg)

  const glowGeo = new THREE.RingGeometry(0.4, 0.5, 16)
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xC2694F,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  })
  const glow = new THREE.Mesh(glowGeo, glowMat)
  glow.rotation.x = -Math.PI / 2
  glow.position.y = 0.02
  group.add(glow)

  group.position.set(0, 0, 8)
  scene.add(group)

  let walkPhase = 0

  function animate(moving) {
    if (moving) {
      walkPhase += 0.15
      leftLeg.rotation.x = Math.sin(walkPhase) * 0.5
      rightLeg.rotation.x = Math.sin(walkPhase + Math.PI) * 0.5
      leftArm.rotation.x = Math.sin(walkPhase + Math.PI) * 0.3
      rightArm.rotation.x = Math.sin(walkPhase) * 0.3
      body.position.y = 0.7 + Math.abs(Math.sin(walkPhase * 2)) * 0.03
    } else {
      walkPhase = 0
      leftLeg.rotation.x = 0
      rightLeg.rotation.x = 0
      leftArm.rotation.x = 0
      rightArm.rotation.x = 0
      body.position.y = 0.7
    }

    glow.rotation.z += 0.01
  }

  return { mesh: group, animate }
}
