/**
 * KEVIN 3D bust — built only from three.js primitives (no model files to load).
 * Imperative on purpose: React mounts a <canvas>, this module owns everything inside it.
 *
 * Interaction: drag to spin (with inertia, eases back to face the viewer),
 * head + eyes follow the pointer, idle breathing + blinking (skipped on reduced motion).
 */
import * as THREE from 'three'

export interface KevinSceneHandle {
  /** Pause/resume the render loop (offscreen, hidden tab). */
  setActive(active: boolean): void
  dispose(): void
}

const COLORS = {
  skin: '#ecc6a2',
  skinShade: '#e0ad87',
  cheek: '#f0a184',
  hair: '#2a211b',
  hoodie: '#e8693a', // --color-accent
  hoodieDeep: '#c4501f', // --color-accent-strong
  cord: '#fbf6ee',
  white: '#fbf7f0',
  ink: '#1f1c18', // --color-ink
  iron: '#3a342e',
}

const clay = (color: string, roughness = 0.62) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 })

/** Flat sticker texture drawn on a canvas — language-neutral text only (proper nouns). */
function stickerTexture(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!
  draw(ctx, w, h)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function buildKevin() {
  const figure = new THREE.Group()

  /* ---------- Torso: lathe-turned hoodie bust with a flat base ---------- */
  const profile = [
    [0, -1.2],
    [1.05, -1.2],
    [1.2, -0.92],
    [1.24, -0.45],
    [1.12, 0.02],
    [0.82, 0.36],
    [0.42, 0.54],
    [0, 0.57],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  const torso = new THREE.Mesh(new THREE.LatheGeometry(profile, 72), clay(COLORS.hoodie, 0.78))
  torso.scale.set(1, 1, 0.8)
  figure.add(torso)

  // Hood collar resting behind the neck
  const hood = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.17, 24, 64), clay(COLORS.hoodieDeep, 0.8))
  hood.rotation.x = Math.PI / 2 - 0.42
  hood.position.set(0, 0.52, -0.1)
  figure.add(hood)

  // Drawstrings
  for (const side of [-1, 1]) {
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.5, 12), clay(COLORS.cord, 0.5))
    cord.position.set(side * 0.15, 0.2, 0.83)
    cord.rotation.set(-0.28, 0, side * 0.08)
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), clay(COLORS.cord, 0.5))
    tip.position.set(side * 0.17, -0.06, 0.9)
    figure.add(cord, tip)
  }

  // Chest stickers: "HUIT" tag + round "K" badge
  const huit = stickerTexture(
    (ctx, w, h) => {
      roundRect(ctx, 4, 4, w - 8, h - 8, 34)
      ctx.fillStyle = COLORS.white
      ctx.fill()
      ctx.lineWidth = 6
      ctx.strokeStyle = COLORS.ink
      ctx.stroke()
      ctx.fillStyle = COLORS.ink
      ctx.font = '700 64px Inter, Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('HUIT', w / 2 + 14, h / 2 + 3)
      ctx.fillStyle = COLORS.hoodie
      ctx.beginPath()
      ctx.arc(38, h / 2, 11, 0, Math.PI * 2)
      ctx.fill()
    },
    256,
    112,
  )
  const huitTag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.22),
    new THREE.MeshStandardMaterial({ map: huit, roughness: 0.5, transparent: true }),
  )
  huitTag.position.set(0.5, -0.18, 0.905)
  huitTag.rotation.set(-0.05, 0.5, -0.12)
  figure.add(huitTag)

  const kBadge = stickerTexture(
    (ctx, w) => {
      ctx.fillStyle = COLORS.ink
      ctx.beginPath()
      ctx.arc(w / 2, w / 2, w / 2 - 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = COLORS.hoodie
      ctx.font = '600 96px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('K', w / 2, w / 2 + 6)
    },
    160,
    160,
  )
  const badge = new THREE.Mesh(
    new THREE.CircleGeometry(0.15, 40),
    new THREE.MeshStandardMaterial({ map: kBadge, roughness: 0.45 }),
  )
  badge.position.set(-0.52, -0.02, 0.88)
  badge.rotation.set(-0.08, -0.55, 0)
  figure.add(badge)

  /* ---------- Neck + head ---------- */
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.5, 32), clay(COLORS.skin))
  neck.position.y = 0.72
  figure.add(neck)

  const head = new THREE.Group()
  head.position.y = 1.62
  figure.add(head)

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.82, 64, 48), clay(COLORS.skin, 0.55))
  skull.scale.set(0.95, 1.08, 0.95)
  head.add(skull)

  // Short dark hair: top cap + a soft fringe
  const hairMat = clay(COLORS.hair, 0.85)
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.86, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.43), hairMat)
  hair.scale.set(0.96, 1.08, 0.97)
  hair.position.set(0, 0.04, -0.03)
  hair.rotation.x = -0.18
  head.add(hair)
  const fringe = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 16), hairMat)
  fringe.scale.set(1.5, 0.45, 0.8)
  fringe.position.set(0.12, 0.62, 0.48)
  fringe.rotation.z = -0.25
  head.add(fringe)

  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 16), clay(COLORS.skinShade))
    ear.scale.set(0.55, 1, 0.8)
    ear.position.set(side * 0.79, -0.02, -0.02)
    head.add(ear)

    const cheek = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 20, 12),
      new THREE.MeshStandardMaterial({ color: COLORS.cheek, roughness: 0.9, transparent: true, opacity: 0.45 }),
    )
    cheek.scale.set(1, 0.6, 0.4)
    cheek.position.set(side * 0.43, -0.18, 0.66)
    head.add(cheek)
  }

  // Eyes: white + pupil inside a group we rotate to "look"
  const eyes: THREE.Group[] = []
  for (const side of [-1, 1]) {
    const eye = new THREE.Group()
    eye.position.set(side * 0.26, 0.1, 0.68)
    const white = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 24), clay(COLORS.white, 0.3))
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.072, 24, 16), clay(COLORS.ink, 0.25))
    pupil.position.z = 0.115
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 8), new THREE.MeshBasicMaterial({ color: '#ffffff' }))
    glint.position.set(0.03, 0.03, 0.18)
    eye.add(white, pupil, glint)
    head.add(eye)
    eyes.push(eye)

    const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.2, 6, 12), hairMat)
    brow.rotation.z = Math.PI / 2 + side * 0.12
    brow.position.set(side * 0.27, 0.34, 0.72)
    head.add(brow)
  }

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.105, 24, 16), clay(COLORS.skinShade, 0.5))
  nose.scale.set(1, 0.9, 1.1)
  nose.position.set(0, -0.06, 0.8)
  head.add(nose)

  // Smile: bottom arc of a torus
  const arc = Math.PI * 0.62
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.027, 12, 32, arc), clay(COLORS.ink, 0.4))
  smile.rotation.set(-0.25, 0, -Math.PI / 2 - arc / 2)
  smile.position.set(0, -0.2, 0.73)
  head.add(smile)

  /* ---------- Floating dumbbell prop ---------- */
  const dumbbell = new THREE.Group()
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.86, 16), clay(COLORS.iron, 0.4))
  bar.rotation.z = Math.PI / 2
  dumbbell.add(bar)
  for (const side of [-1, 1]) {
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.11, 32), clay(COLORS.ink, 0.5))
    plate.rotation.z = Math.PI / 2
    plate.position.x = side * 0.34
    const plate2 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 32), clay(COLORS.hoodieDeep, 0.5))
    plate2.rotation.z = Math.PI / 2
    plate2.position.x = side * 0.25
    dumbbell.add(plate, plate2)
  }
  dumbbell.position.set(1.62, -0.35, 0.55)
  dumbbell.rotation.set(0.3, 0.4, 0.55)
  figure.add(dumbbell)

  figure.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = true
  })
  return { figure, torso, head, eyes, dumbbell }
}

export function createKevinScene(canvas: HTMLCanvasElement, opts: { reducedMotion: boolean }): KevinSceneHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
  camera.position.set(0, 1.25, 9.4)
  camera.lookAt(0, 0.62, 0)

  scene.add(new THREE.HemisphereLight('#fff6ec', '#d8ccb6', 1.25))
  const key = new THREE.DirectionalLight('#ffffff', 2.1)
  key.position.set(3.5, 6, 5)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.radius = 6
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 })
  scene.add(key)
  const rim = new THREE.DirectionalLight('#ffd9c2', 0.9)
  rim.position.set(-5, 3, -4)
  scene.add(rim)

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ color: '#5a4632', opacity: 0.16 }))
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -1.2
  ground.receiveShadow = true
  scene.add(ground)

  const { figure, torso, head, eyes, dumbbell } = buildKevin()
  scene.add(figure)

  /* ---------- Sizing ---------- */
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  /* ---------- Input ---------- */
  const look = new THREE.Vector2() // pointer relative to canvas centre, roughly -1..1
  const lookTarget = new THREE.Vector2()
  let rotY = 0.25
  let velocity = 0
  let dragging = false
  let lastX = 0

  const onPointerMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect()
    lookTarget.set(
      THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 0.9), -1, 1),
      THREE.MathUtils.clamp((e.clientY - (r.top + r.height * 0.32)) / (r.height * 0.9), -1, 1),
    )
    if (dragging) {
      const dx = e.clientX - lastX
      lastX = e.clientX
      velocity = dx * 0.012
      rotY += velocity
    }
  }
  const onPointerDown = (e: PointerEvent) => {
    dragging = true
    lastX = e.clientX
    canvas.setPointerCapture(e.pointerId)
    canvas.style.cursor = 'grabbing'
  }
  const onPointerUp = (e: PointerEvent) => {
    dragging = false
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
    canvas.style.cursor = 'grab'
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  canvas.style.cursor = 'grab'

  /* ---------- Loop ---------- */
  const clock = new THREE.Clock()
  let raf = 0
  let active = false
  let nextBlink = 2.5

  const frame = () => {
    raf = requestAnimationFrame(frame)
    const t = clock.getElapsedTime()

    // Spin with inertia, then ease back to a 3/4 front view.
    if (!dragging) {
      rotY += velocity
      velocity *= 0.93
      if (Math.abs(velocity) < 0.002) {
        rotY = Math.atan2(Math.sin(rotY), Math.cos(rotY)) // wrap so it never unwinds full turns
        rotY += (0.25 - rotY) * 0.03
      }
    }
    figure.rotation.y = rotY

    look.lerp(lookTarget, 0.08)
    head.rotation.y = look.x * 0.38
    head.rotation.x = look.y * 0.22
    for (const eye of eyes) {
      eye.rotation.y = look.x * 0.45
      eye.rotation.x = look.y * 0.35
    }

    if (!opts.reducedMotion) {
      const breath = Math.sin(t * 1.7)
      torso.scale.set(1 + breath * 0.008, 1 + breath * 0.012, 0.8 + breath * 0.008)
      head.position.y = 1.62 + breath * 0.012
      dumbbell.position.y = -0.35 + Math.sin(t * 1.1) * 0.06
      dumbbell.rotation.y += 0.006

      // Blink: squash the eyes for ~120 ms every few seconds.
      const sinceBlink = t - nextBlink
      const squash = sinceBlink > 0 && sinceBlink < 0.12 ? 0.12 : 1
      for (const eye of eyes) eye.scale.y = squash
      if (sinceBlink >= 0.12) nextBlink = t + 2.5 + Math.random() * 3
    }

    renderer.render(scene, camera)
  }

  const setActive = (next: boolean) => {
    if (next === active) return
    active = next
    if (active) {
      clock.getDelta()
      raf = requestAnimationFrame(frame)
    } else {
      cancelAnimationFrame(raf)
    }
  }

  // Always paint one frame so a static pose shows even before the loop starts.
  renderer.render(scene, camera)

  return {
    setActive,
    dispose() {
      setActive(false)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          const mats = Array.isArray(o.material) ? o.material : [o.material]
          for (const m of mats) {
            ;(m as THREE.MeshStandardMaterial).map?.dispose()
            m.dispose()
          }
        }
      })
      renderer.dispose()
    },
  }
}
