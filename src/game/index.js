import * as THREE from 'three'
import { createWorld, updateRoboticArm, COURT_BOUNDS, checkCollision } from './world.js'
import { createZoneStructures, ZONE_DEFS, checkZoneProximity, billboardLabels, updateZoneAnimations } from './zones.js'
import { setupInput, getMovement, isKeyDown } from './input.js'
import { showOnboarding } from './onboarding.js'
import { createPlayer } from './player.js'
import { createInteractables, updateInteractables, hasKey } from './interactables.js'
import { createDesktopUI, openDesktop, isDesktopOpen, checkLaptopProximity } from './desktop-ui.js'
import { createHUD } from './hud.js'

const MOVE_SPEED = 0.09
const CAM_HEIGHT = 12
const CAM_DISTANCE = 14
const CAM_ANGLE = Math.PI / 5

export async function createGame(appEl, onPanelOpen) {
  const gameRoot = document.createElement('div')
  gameRoot.id = 'game-root'
  appEl.appendChild(gameRoot)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0d1117)
  scene.fog = new THREE.FogExp2(0x0d1117, 0.012)

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 2.2
  gameRoot.appendChild(renderer.domElement)

  renderer.domElement.setAttribute('role', 'img')
  renderer.domElement.setAttribute('aria-label',
    'Interactive 3D tennis court. Use WASD or arrow keys to walk around and explore portfolio sections.'
  )

  // Lighting
  scene.add(new THREE.AmbientLight(0x6677aa, 2.0))

  const sunLight = new THREE.DirectionalLight(0xaabbdd, 2.5)
  sunLight.position.set(15, 25, 10)
  sunLight.castShadow = true
  sunLight.shadow.mapSize.set(2048, 2048)
  sunLight.shadow.camera.near = 0.5
  sunLight.shadow.camera.far = 80
  sunLight.shadow.camera.left = -40
  sunLight.shadow.camera.right = 40
  sunLight.shadow.camera.top = 40
  sunLight.shadow.camera.bottom = -40
  scene.add(sunLight)

  const fillLight = new THREE.DirectionalLight(0x445566, 1.0)
  fillLight.position.set(-10, 15, -10)
  scene.add(fillLight)

  const warmLight = new THREE.PointLight(0xC2694F, 0.8, 30)
  warmLight.position.set(0, 5, 0)
  scene.add(warmLight)

  // World
  createWorld(scene)
  createZoneStructures(scene)
  createInteractables(scene)
  createDesktopUI()

  // Player
  const player = createPlayer(scene)
  let playerX = 0
  let playerZ = 8

  // Input & HUD
  setupInput()
  showOnboarding()
  const hud = createHUD(appEl)

  // Interact prompt
  const interactPrompt = document.createElement('div')
  interactPrompt.className = 'interact-prompt'
  interactPrompt.style.display = 'none'
  appEl.appendChild(interactPrompt)

  // Locked hint
  let lockedHintVisible = false
  const lockedHint = document.createElement('div')
  lockedHint.className = 'interact-hint locked-hint'
  lockedHint.style.display = 'none'
  appEl.appendChild(lockedHint)

  // State
  let panelOpen = false
  let gameTime = 0
  let nearLaptop = false

  // Events
  window.addEventListener('zone:close', () => {
    panelOpen = false
  })

  window.addEventListener('desktop:closed', () => {
    panelOpen = false
  })

  window.addEventListener('keydown', (e) => {
    if ((e.key === 'e' || e.key === 'E') && !panelOpen && !isDesktopOpen()) {
      // Check laptop proximity
      if (nearLaptop) {
        panelOpen = true
        openDesktop()
        return
      }
      // Check zone proximity
      const zone = checkZoneProximity(playerX, playerZ)
      if (zone) {
        if (!hasKey(zone.keyId)) {
          if (!lockedHintVisible) {
            lockedHintVisible = true
            lockedHint.textContent = `Locked! Find the ${zone.label} key first.`
            lockedHint.style.display = 'block'
            setTimeout(() => { lockedHint.style.display = 'none'; lockedHintVisible = false }, 2500)
          }
        } else {
          panelOpen = true
          onPanelOpen(zone.id)
        }
      }
    }
  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  function animate() {
    requestAnimationFrame(animate)
    gameTime += 0.016

    // Movement
    let moving = false
    if (!panelOpen && !isDesktopOpen()) {
      const { fwd, right } = getMovement()
      if (fwd !== 0 || right !== 0) {
        moving = true
        const PLAYER_RADIUS = 0.4

        let newX = playerX + right * MOVE_SPEED
        let newZ = playerZ - fwd * MOVE_SPEED

        newX = Math.max(COURT_BOUNDS.minX, Math.min(COURT_BOUNDS.maxX, newX))
        newZ = Math.max(COURT_BOUNDS.minZ, Math.min(COURT_BOUNDS.maxZ, newZ))

        // Try full move, then slide along axes
        if (!checkCollision(newX, newZ, PLAYER_RADIUS)) {
          playerX = newX
          playerZ = newZ
        } else if (!checkCollision(newX, playerZ, PLAYER_RADIUS)) {
          playerX = newX
        } else if (!checkCollision(playerX, newZ, PLAYER_RADIUS)) {
          playerZ = newZ
        }

        const angle = Math.atan2(right, -fwd)
        player.mesh.rotation.y = angle
      }
    }

    // Update player position & animation
    player.mesh.position.set(playerX, 0, playerZ)
    player.animate(moving)

    // Camera follows player (isometric)
    camera.position.set(
      playerX,
      CAM_HEIGHT,
      playerZ + CAM_DISTANCE
    )
    camera.lookAt(playerX, 0, playerZ)
    camera.rotation.x = -CAM_ANGLE

    // Zone proximity
    nearLaptop = checkLaptopProximity(playerX, playerZ)
    const activeZone = checkZoneProximity(playerX, playerZ)

    if (nearLaptop && !panelOpen && !isDesktopOpen()) {
      interactPrompt.textContent = 'Press E to use computer'
      interactPrompt.style.display = 'block'
    } else if (activeZone && !panelOpen) {
      if (hasKey(activeZone.keyId)) {
        interactPrompt.textContent = `Press E to open ${activeZone.label}`
        interactPrompt.style.display = 'block'
      } else {
        interactPrompt.textContent = `${activeZone.label} — key required`
        interactPrompt.style.display = 'block'
        interactPrompt.style.borderColor = 'rgba(200, 80, 60, 0.6)'
      }
    } else {
      interactPrompt.style.display = 'none'
      interactPrompt.style.borderColor = ''
    }

    // Update world
    updateInteractables(playerX, playerZ)
    updateRoboticArm(gameTime)
    updateZoneAnimations(0.016)
    billboardLabels(camera)
    hud.updateMinimap(playerX, playerZ)

    renderer.render(scene, camera)
  }

  animate()
}
