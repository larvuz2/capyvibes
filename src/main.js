import { setupScene } from './scene/SceneManager.js';
import { initPhysics } from './physics/PhysicsWorld.js';
import { createCharacterController } from './character/CharacterController.js';
import { setupControls } from './controls/InputHandler.js';
import { setupCamera } from './camera/CameraController.js';
import { setupGUI } from './gui/GUIControls.js';
import { loadModels, setupLoading } from './utils/AssetLoader.js';

// Configure loading UI
const loadingManager = setupLoading();

// Wait for DOM to load
window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize scene
    const { scene, renderer } = setupScene();
    
    // Initialize physics world
    const world = await initPhysics();
    
    // Load models (capybara and environment)
    const models = await loadModels(loadingManager);
    
    // Create character controller
    const characterController = createCharacterController(world, scene, models.capybara);
    
    // Setup camera
    const camera = setupCamera(characterController.mesh);
    scene.add(camera);
    
    // Setup input controls
    const inputHandler = setupControls(camera);
    
    // Setup GUI
    const gui = setupGUI(characterController, camera);
    
    // Hide loading screen
    document.getElementById('loading-screen').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
    }, 500);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      const deltaTime = Math.min(clock.getDelta(), 0.1); // Cap deltaTime
      
      // Update physics
      world.step();
      
      // Update character
      characterController.update(deltaTime, inputHandler.getInputState());
      
      // Render
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
  } catch (error) {
    console.error("Error initializing application:", error);
    document.getElementById('loading-text').textContent = 'Error loading application. Please try again.';
    document.getElementById('loading-bar').style.backgroundColor = '#ff3333';
  }
});