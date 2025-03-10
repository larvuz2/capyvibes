# CapyVibes

A physics-based 3D capybara character controller using Three.js and Rapier physics engine.

## Features

- 3D capybara character with physics-based movement
- WASD keys for movement and space for jumping
- Realistic physics simulation using Rapier
- 3D rendering with Three.js

## Tech Stack

- **Three.js** (v0.160.0) - 3D rendering library
- **Rapier** (@dimforge/rapier3d-compat v0.11.2) - Physics engine
- **Vite** (v5.0.10) - Frontend build tool
- **dat.GUI** (v0.7.9) - Parameter adjustment library

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the local development URL (usually http://localhost:5173)

## Controls

- **W, A, S, D**: Move the capybara
- **Space**: Jump
- **Mouse**: Rotate camera

## Development

This project uses a modular JavaScript architecture with separate files for scene management, physics simulation, character controller, input handling, camera controls, and GUI controls.