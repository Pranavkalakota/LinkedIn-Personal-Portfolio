import * as THREE from 'three'
import { createWorld, updateRoboticArm, COURT_BOUNDS } from './world.js'
import { createPlayer } from './player.js'
import { createZoneStructures, ZONE_DEFS, checkZoneProximity, billboardLabels, checkBuildingCollision } from './zones.js'
import { setupInput, getDirection } from './input.js'
import { showOnboarding } from './onboarding.js'
import { createHUD } from './hud.js'
import { createInteractables, updateInteractables, hasKey } from './interactables.js'
import { createDesktopUI, openDesktop, closeDesktop as closeDesktopUI, isDesktopOpen, checkLaptopProximity } from './desktop-ui.js'

const SPEED = 0.12
const CAM_HEIGHT = 16
const CAM_DIST = 22
const CAM_ANGLE = Math.PI / 6

export async function createGame(appEl, onPanelOpen, onPanelClose) {
  const gameRoot = document.createElement('div')
  gameRoot.id = 'game-root'
  appEl.appendChild(gameRoot)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0d1117)
  scene.fog = new THREE.FogExp2(0x0d1117, 0.005)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 2.2
  gameRoot.appendChild(renderer.domElement)

  renderer.domElement.setAttribute('role', 'img')
  renderer.domElement.setAttribute('aria-label',
    'Interactive 3D tennis court. Walk your character with WASD or arrow keys to explore service boxes containing portfolio information. All content is also accessible via keyboard.'
  )

  const ambientLight = new THREE.AmbientLight(0x6677aa, 2.0)
  scene.add(ambientLight)

  const moonLight = new THREE.DirectionalLight(0xaabbdd, 2.5)
  moonLight.position.set(15, 25, 10)
  moonLight.castShadow = true
  moonLight.shadow.mapSize.width = 2048
  moonLight.shadow.mapSize.height = 2048
  moonLight.shadow.camera.near = 0.5
  moonLight.shadow.camera.far = 80
  moonLight.shadow.camera.left = -40
  moonLight.shadow.camera.right = 40
  moonLight.shadow.camera.top = 40
  moonLight.shadow.camera.bottom = -40
  scene.add(moonLight)

  const fillLight = new THREE.DirectionalLight(0x445566, 1.0)
  fillLight.position.set(-10, 15, -10)
  scene.add(fillLight)

  const warmLight = new THREE.PointLight(0xC2694F, 0.8, 30)
  warmLight.position.set(0, 5, 0)
  scene.add(warmLight)

  createWorld(scene)
  createZoneStructures(scene)
  createInteractables(scene)
  createDesktopUI()

  const player = createPlayer(scene)

  setupInput()
  showOnboarding()

  const hud = createHUD(appEl)

  let currentZone = null
  let panelOpen = false
  let gracePeriod = 90
  let closedZone = null
  let lockedHintVisible = false
  let gameTime = 0

  const lockedHint = document.createElement('div')
  lockedHint.className = 'interact-hint locked-hint'
  lockedHint.style.display = 'none'
  document.getElementById('app').appendChild(lockedHint)

  let nearLaptop = false
  const ePrompt = document.createElement('div')
  ePrompt.className = 'interact-prompt'
  ePrompt.textContent = 'Press E to use computer'
  ePrompt.style.display = 'none'
  document.getElementById('app').appendChild(ePrompt)

  window.addEventListener('zone:close', () => {
    panelOpen = false
    closedZone = currentZone
    currentZone = null
  })

  window.addEventListener('desktop:closed', () => {
    panelOpen = false
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'e' || e.key === 'E') {
      if (nearLaptop && !panelOpen && !isDesktopOpen()) {
        panelOpen = true
        openDesktop()
      }
    }
  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  function updateCamera() {
    const px = player.mesh.position.x
    const pz = player.mesh.position.z

    camera.position.set(
      px - Math.sin(CAM_ANGLE) * CAM_DIST,
      CAM_HEIGHT,
      pz + Math.cos(CAM_ANGLE) * CAM_DIST
    )
    camera.lookAt(px, 1, pz)
  }

  function animate() {
    requestAnimationFrame(animate)

    gameTime += 0.016

    if (gracePeriod > 0) {
      gracePeriod--
      updateCamera()
      updateRoboticArm(gameTime)
      renderer.render(scene, camera)
      hud.updateMinimap(player.mesh.position.x, player.mesh.position.z)
      return
    }

    if (!panelOpen) {
      const { dx, dy } = getDirection()

      if (dx !== 0 || dy !== 0) {
        const angle = CAM_ANGLE
        const forwardX = Math.sin(angle)
        const forwardZ = -Math.cos(angle)
        const rightX = Math.cos(angle)
        const rightZ = Math.sin(angle)

        let mx = (dx * rightX + dy * forwardX) * SPEED
        let mz = (dx * rightZ + dy * forwardZ) * SPEED

        const newX = player.mesh.position.x + mx
        const newZ = player.mesh.position.z + mz

        if (!checkBuildingCollision(newX, newZ)) {
          player.mesh.position.x = newX
          player.mesh.position.z = newZ
        }

        player.mesh.position.x = Math.max(COURT_BOUNDS.minX, Math.min(COURT_BOUNDS.maxX, player.mesh.position.x))
        player.mesh.position.z = Math.max(COURT_BOUNDS.minZ, Math.min(COURT_BOUNDS.maxZ, player.mesh.position.z))

        const targetAngle = Math.atan2(mx, mz)
        player.mesh.rotation.y = targetAngle

        player.animate(true)
      } else {
        player.animate(false)
      }

      const zone = checkZoneProximity(player.mesh.position.x, player.mesh.position.z)

      if (zone && zone !== currentZone && zone !== closedZone) {
        if (zone === 'projects' && !hasKey('projects-key')) {
          if (!lockedHintVisible) {
            lockedHintVisible = true
            lockedHint.textContent = 'This zone is locked. Find the key to enter!'
            lockedHint.style.display = 'block'
            setTimeout(() => {
              lockedHint.style.display = 'none'
              lockedHintVisible = false
            }, 2500)
          }
          closedZone = zone
        } else {
          currentZone = zone
          panelOpen = true
          closedZone = null
          onPanelOpen(zone)
        }
      } else if (!zone) {
        currentZone = null
        closedZone = null
      }
    }

    nearLaptop = checkLaptopProximity(player.mesh.position.x, player.mesh.position.z)
    ePrompt.style.display = (nearLaptop && !panelOpen) ? 'block' : 'none'

    updateInteractables(player.mesh.position.x, player.mesh.position.z)
    updateRoboticArm(gameTime)
    updateCamera()
    billboardLabels(camera)
    hud.updateMinimap(player.mesh.position.x, player.mesh.position.z)
    renderer.render(scene, camera)
  }

  animate()
}
