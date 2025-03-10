import * as THREE from 'three';

/**
 * Set up the Three.js scene, renderer, and basic environment
 * @returns {Object} Object containing scene and renderer
 */
export function setupScene() {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#87CEEB'); // Sky blue background
  
  // Add fog for depth
  scene.fog = new THREE.FogExp2('#87CEEB', 0.01);
  
  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById('app').appendChild(renderer.domElement);
  
  // Add lighting
  setupLighting(scene);
  
  // Add ground
  addGround(scene);
  
  return { scene, renderer };
}

/**
 * Set up the lighting for the scene
 * @param {THREE.Scene} scene - The Three.js scene
 */
function setupLighting(scene) {
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Directional light for sun-like lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(50, 200, 100);
  directionalLight.castShadow = true;
  
  // Configure shadow properties
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  
  scene.add(directionalLight);
  
  // Add hemisphere light for more natural outdoor lighting
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
  scene.add(hemisphereLight);
}

/**
 * Add ground plane to the scene
 * @param {THREE.Scene} scene - The Three.js scene
 */
function addGround(scene) {
  // Create ground plane
  const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x7CFC00, // Lawn green
    side: THREE.DoubleSide,
    roughness: 0.8,
    metalness: 0.1
  });
  
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
  ground.receiveShadow = true;
  ground.userData = { isGround: true }; // For physics identification
  
  scene.add(ground);
  
  // Add some random decorations
  addEnvironmentDecorations(scene);
}

/**
 * Add decorative elements to the scene
 * @param {THREE.Scene} scene - The Three.js scene
 */
function addEnvironmentDecorations(scene) {
  // Add a few trees or rocks (simple shapes for now)
  // Trees will be replaced with actual models in the asset loader
  const treePositions = [
    { x: -20, z: -15 },
    { x: 15, z: 25 },
    { x: -10, z: 10 },
    { x: 30, z: -20 },
    { x: -30, z: -30 }
  ];
  
  treePositions.forEach(pos => {
    // Simple tree placeholder (cone and cylinder)
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.7, 2, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(pos.x, 1, pos.z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    
    const foliageGeometry = new THREE.ConeGeometry(2, 5, 8);
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Forest green
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(pos.x, 4.5, pos.z);
    foliage.castShadow = true;
    
    scene.add(trunk);
    scene.add(foliage);
  });
  
  // Add a few rocks
  const rockPositions = [
    { x: -5, z: -15, scale: 1.5 },
    { x: 8, z: 10, scale: 1 },
    { x: -15, z: 20, scale: 2 },
    { x: 25, z: 5, scale: 1.2 }
  ];
  
  rockPositions.forEach(pos => {
    const rockGeometry = new THREE.DodecahedronGeometry(pos.scale, 0);
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080, // Gray
      roughness: 0.9,
      metalness: 0.1
    });
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    
    rock.position.set(pos.x, pos.scale / 2, pos.z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.castShadow = true;
    rock.receiveShadow = true;
    
    scene.add(rock);
  });
}