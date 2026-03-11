import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './HeroCubes.css';

export default function HeroCubes() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Renderer ──────────────────────────────────────────────
    const W = container.clientWidth || Math.round(window.innerWidth * 0.52);
    const H = container.clientHeight || window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    // keep canvas visually above background and ensure transparency honored
    renderer.setClearColor(0x000000, 0);
    Object.assign(renderer.domElement.style, {
      zIndex: '0', pointerEvents: 'auto'
    });
    Object.assign(renderer.domElement.style, {
      position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block'
    });
    container.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera — centered, pulled back to show full grid ──────
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 300);
    // use a slightly offset camera (closer to original framing) so grid is visible
    camera.position.set(2, 7.5, 11);
    camera.lookAt(0, 0, 0);

    // ── Palette (unified baby blue as requested) ──────────────
    const BABY_BLUE = new THREE.Color('#38bdf8');
    const CYAN   = BABY_BLUE;
    const PURPLE = BABY_BLUE;

    // ── Grid constants (smaller cubes) ────────────────────────
    const COLS = 5, ROWS = 4, SIZE = 0.85, STEP = 1.05;
    const HALF_SIZE = SIZE / 2;

    // ── Cube factory (dark body + gradient edges) ─────────────
    const makeCube = () => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(
        new THREE.BoxGeometry(SIZE * 0.94, SIZE * 0.94, SIZE * 0.94),
        new THREE.MeshStandardMaterial({
          color: 0x030316, roughness: 0.75, metalness: 0.15,
          transparent: true, opacity: 0.95
        })
      ));
      const eGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(SIZE, SIZE, SIZE));
      const positions = eGeo.attributes.position.array;
      const colors = new Float32Array(positions.length);
      for (let i = 0; i < positions.length; i += 3) {
        const t = (positions[i + 1] / HALF_SIZE + 1) / 2;
        const c = PURPLE.clone().lerp(CYAN, t);
        colors[i] = c.r; colors[i + 1] = c.g; colors[i + 2] = c.b;
      }
      eGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      g.add(new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({
        vertexColors: true, blending: THREE.AdditiveBlending,
        depthWrite: false, transparent: true, opacity: 1.0
      })));
      return g;
    };

    // ── Root group rotated 45° for isometric diamond look ─────
    const root = new THREE.Group();
    root.rotation.y = Math.PI / 4;
    // small horizontal nudge so grid sits slightly more to the right
    root.position.x = 0.7;
    scene.add(root);

    // ── Platform glow ─────────────────────────────────────────
    const platCvs = document.createElement('canvas');
    platCvs.width = platCvs.height = 512;
    const ptx = platCvs.getContext('2d');
    const grd = ptx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grd.addColorStop(0,    'rgba(56, 189, 248, 0.65)');
    grd.addColorStop(0.38, 'rgba(56, 189, 248, 0.32)');
    grd.addColorStop(1,    'rgba(0, 0, 0, 0)');
    ptx.fillStyle = grd;
    ptx.fillRect(0, 0, 512, 512);
    const platform = new THREE.Mesh(
      new THREE.PlaneGeometry(COLS * STEP + 2, ROWS * STEP + 2),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(platCvs),
        transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, side: THREE.DoubleSide
      })
    );
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = 0.01;
    root.add(platform);

    // ── Per-cube base outlines (visible when cube is flat) ─────
    const baseOutlines = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const geo = new THREE.EdgesGeometry(
          new THREE.BoxGeometry(SIZE * 0.97, 0.01, SIZE * 0.97)
        );
        const mat = new THREE.LineBasicMaterial({
          color: 0x38bdf8, blending: THREE.AdditiveBlending,
          transparent: true, opacity: 0.45, depthWrite: false
        });
        const outline = new THREE.LineSegments(geo, mat);
        outline.position.set(
          c * STEP - (COLS - 1) * STEP / 2,
          0.01,
          r * STEP - (ROWS - 1) * STEP / 2
        );
        root.add(outline);
        baseOutlines.push(outline);
      }
    }

    // ── Cubes — start flat on the ground (scaleY ≈ 0) ────────
    const cubes = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cube = makeCube();
        cube.position.set(
          c * STEP - (COLS - 1) * STEP / 2,
          0,
          r * STEP - (ROWS - 1) * STEP / 2
        );
        cube.scale.y = 0.001;
        // Spring state: pos (current height 0–1), vel (velocity), target (0=ground / 1=up)
        cube.userData = { pos: 0, vel: 0, target: 0 };
        root.add(cube);
        cubes.push(cube);
      }
    }

    // ── Lights (static — no auto orbit) ───────────────────────
    scene.add(new THREE.AmbientLight(0x0a0a3a, 4.5));
    const pl = new THREE.PointLight(0x38bdf8, 16, 60);
    pl.position.set(0, 9, 6);
    scene.add(pl);
    const pl2 = new THREE.PointLight(0x38bdf8, 8, 50);
    pl2.position.set(0, 2, -8);
    scene.add(pl2);

    // ── Particles ─────────────────────────────────────────────
    const N = 400;
    const pp = new Float32Array(N * 3);
    const pc = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pp[i*3]   = (Math.random()-0.5)*80;
      pp[i*3+1] = (Math.random()-0.5)*45;
      pp[i*3+2] = (Math.random()-0.5)*80;
      const col = Math.random() > 0.5 ? CYAN : PURPLE;
      pc[i*3]=col.r; pc[i*3+1]=col.g; pc[i*3+2]=col.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pc, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.065, vertexColors: true, blending: THREE.AdditiveBlending,
      depthWrite: false, transparent: true, opacity: 0.75
    })));

    // ── Per-cube hover via ground-plane raycasting ────────────
    const raycaster   = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let hoveredIdx = -1;
    const THRESHOLD_SQ = (STEP * 0.54) ** 2;   // hit radius per cell

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width)  *  2 - 1,
        -((e.clientY - rect.top)  / rect.height) *  2 + 1
      );
      raycaster.setFromCamera(mouse, camera);

      const hit = new THREE.Vector3();
      if (!raycaster.ray.intersectPlane(groundPlane, hit)) return;

      // convert world hit to root-local space (accounts for Y rotation)
      const local = root.worldToLocal(hit);

      let minD = Infinity, nearIdx = -1;
      cubes.forEach((cube, i) => {
        const dx = cube.position.x - local.x;
        const dz = cube.position.z - local.z;
        const d  = dx * dx + dz * dz;
        if (d < minD) { minD = d; nearIdx = i; }
      });

      const newHover = minD < THRESHOLD_SQ ? nearIdx : -1;
      if (newHover !== hoveredIdx) {
        if (hoveredIdx !== -1) cubes[hoveredIdx].userData.target = 0;
        hoveredIdx = newHover;
        if (hoveredIdx !== -1) cubes[hoveredIdx].userData.target = 1;
      }
    };

    const onMouseLeave = () => {
      if (hoveredIdx !== -1) { cubes[hoveredIdx].userData.target = 0; hoveredIdx = -1; }
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave);

    // ── Subtle rotation tracking ───────────────────────────────
    const BASE_ROT_Y = Math.PI / 4;
    let targetRotY = BASE_ROT_Y, currentRotY = BASE_ROT_Y;
    const onWindowMouseMove = (e) => {
      targetRotY = BASE_ROT_Y + ((e.clientX / window.innerWidth) * 2 - 1) * 0.1;
    };
    window.addEventListener('mousemove', onWindowMouseMove, { passive: true });

    // ── Resize ────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    // ── Render loop ───────────────────────────────────────────
    const lerp = (a, b, t) => a + (b - a) * t;
    let raf;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      currentRotY = lerp(currentRotY, targetRotY, 0.04);
      root.rotation.y = currentRotY;

      // Spring physics: snappy pop-up, smooth settle back
      cubes.forEach((cube, i) => {
        const ud = cube.userData;
        const force = (ud.target - ud.pos) * 0.2;
        ud.vel  = ud.vel * 0.68 + force;
        ud.pos += ud.vel;
        const s = Math.max(0.001, ud.pos);
        cube.scale.y  = s;
        cube.position.y = s * HALF_SIZE;
        baseOutlines[i].material.opacity = 0.45 * (1 - Math.min(1, ud.pos));
      });

      renderer.render(scene, camera);
    };
    tick();

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousemove', onWindowMouseMove);
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero-cubes" />;
}
