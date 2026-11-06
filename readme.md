<div align="center">

# 🏎️ ADITYA DIXIT — 3D INTERACTIVE WEBGPU PORTFOLIO

### *An Immersive 3D Open-World Island & Physics Simulation showcasing Engineering, Hackathons, and Creative Systems.*

[![Three.js](https://img.shields.io/badge/Three.js-WebGPU%20%2F%20WebGL2-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Physics](https://img.shields.io/badge/Physics-Rapier%203D-orange?style=for-the-badge)](https://rapier.rs/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/Animation-GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Aditya--dxt%2FPortfolio--v2-181717?style=for-the-badge&logo=github)](https://github.com/Aditya-dxt/Portfolio-v2)

<br/>

[✨ Live Demo](https://adityadixit.vercel.app/) • [🚀 Features](#-key-features) • [📐 Architecture & Views](#-system-architecture--diagram-views) • [🎮 Controls](#-controls-guide) • [🛠️ Tech Stack](#-technology-stack) • [📦 Setup & Run](#-local-installation--setup) • [🌐 Deployment](#-production-deployment)

<br/>

<!-- Add your new hero banner image here: ![Portfolio Banner](./path-to-image.png) -->

</div>

---

## 🌟 Overview

**Portfolio-v2** is an interactive, gamified 3D portfolio experience built with **Three.js**, **WebGPU Node Shaders (TSL)**, and **Rapier 3D Physics**. Rather than browsing a standard static webpage, visitors pilot a responsive physics-simulated sports buggy across a handcrafted low-poly archipelago. 

As you navigate through dynamic terrain, real-time day/night cycles, and atmospheric weather simulations, you discover interactive 3D pavilions and kiosks spotlighting software engineering projects, hackathon achievements, career milestones, photography exhibitions, and interactive mini-games.

---

## 📐 System Architecture & Diagram Views

Below are visual architecture and engineering views diagrammed with **Mermaid** representing the core subsystems, runtime game loop, world spatial layout, and state machine transitions.

### 1. High-Level Engine Architecture View
```mermaid
flowchart TD
    subgraph Browser ["🌐 Client Browser & Hardware"]
        Screen["Display Canvas (WebGPU / WebGL2)"]
        AudioOut["WebAudio API (Positional & Engine SFX)"]
        Inputs["Hardware Inputs: Keyboard / Gamepad / Touch"]
    end

    subgraph CoreEngine ["⚡ Core 3D & Physics Engine"]
        Loop["Tick / Game Loop Engine"]
        InputMgr["Input Controller & Action Mapper"]
        Physics["Rapier 3D Compat Engine"]
        Renderer["Three.js WebGPU / WebGL Renderer"]
        TSL["Node Material Shader System (TSL)"]
    end

    subgraph WorldAreas ["🏝️ Procedural Island & Interactive Areas"]
        HeroArea["Landing Zone: 3D Beveled Letters"]
        CareerArea["Career Timeline: 6-Track Path & 7-Segment Clock"]
        ProjectsArea["Projects Kiosk: 8 Curated Software Showcases"]
        HackathonsArea["Hackathons Hub: 6 Competitive 3D Showcases"]
        PhotoArea["Photography Pavilion: 15 Framed Exhibits"]
        GamesArea["Mini-Games: Bowling & Off-road Circuit"]
    end

    subgraph Environment ["🌦️ Atmosphere & Environment Systems"]
        DayNight["Dynamic Day & Night Light Cycles"]
        Weather["Weather Controller: Rain, Snow & Fog"]
        Terrain["Procedural Low-Poly Terrain & Water Surface"]
        Particles["Foliage, Leaves, Trails & Wind Dynamics"]
    end

    subgraph UI ["🖥️ Glassmorphic HUD & Navigation"]
        HUD["Day/Night Toggle, Mute & Quality Controls"]
        MiniMap["2D Radar Map & Fast-Travel Teleportation"]
        ModalKiosk["Interactive 3D Focus View & Modal Panels"]
    end

    Inputs --> InputMgr
    InputMgr --> Loop
    Loop --> Physics
    Physics --> WorldAreas
    Loop --> Environment
    Environment --> Renderer
    WorldAreas --> Renderer
    TSL --> Renderer
    Renderer --> Screen
    Loop --> AudioOut
    MiniMap -. Fast Travel .-> Physics
    WorldAreas --> ModalKiosk
```

---

### 2. World Layout & Spatial Navigation View
```mermaid
flowchart LR
    Landing["🏁 Landing Zone<br/>(3D ADITYA DIXIT Letters)"]
    
    Landing -->|"Drive North-East"| Career["💼 Career Milestones<br/>(Timeline & 7-Segment Counter)"]
    Landing -->|"Drive North"| Projects["💻 Software Projects<br/>(Interactive 8-Project Kiosk)"]
    Landing -->|"Drive East"| Hackathons["🏆 Hackathons Pavilion<br/>(6 International & National Wins)"]
    Landing -->|"Drive South-East"| Photography["📸 Photo Exhibition<br/>(15 Framed Albums)"]
    Landing -->|"Drive South"| Circuit["🏁 Mini-Games & Track<br/>(Bowling Alley & Off-road Course)"]
    Landing -->|"Drive West"| Social["🌐 Social Outpost<br/>(GitHub, LinkedIn, Mail)"]

    Minimap["🗺️ Glass Island Radar"] -. Teleport Any Area .-> Projects
    Minimap -. Teleport Any Area .-> Hackathons
    Minimap -. Teleport Any Area .-> Career
    Minimap -. Teleport Any Area .-> Photography
    Minimap -. Teleport Any Area .-> Circuit
```

---

### 3. Step-by-Step Physics & Render Loop View
```mermaid
sequenceDiagram
    autonumber
    actor User as Driver (User)
    participant Input as Input Manager
    participant Vehicle as Physical Vehicle (Raycast)
    participant Rapier as Rapier 3D Engine
    participant Visual as Visual Vehicle & Particles
    participant Shaders as TSL / Environment Shaders
    participant Render as Three.js WebGPU Renderer

    User->>Input: KeyDown / Joystick / Touch (W, A, S, D, Space)
    Input->>Vehicle: Pre-physics Dispatch (Steering, Engine Torque, Handbrake)
    Vehicle->>Rapier: Step World & Raycast Wheel Suspensions
    Rapier-->>Vehicle: RigidBody Translation, Linear & Angular Velocities
    Vehicle->>Visual: Sync Visual Chassis, Wheel Rotations & Suspension Struts
    Visual->>Visual: Generate Tire Skid Marks, Smoke & Particle Dust
    Shaders->>Shaders: Update Sun Position, Foliage Sway & Water Normals
    Visual->>Render: Pass Camera Targets, Matrix World & Depth Buffer
    Render-->>User: Present 60+ FPS Frame to Display Screen
```

---

### 4. Interactive Kiosk & State Machine View
```mermaid
stateDiagram-v2
    [*] --> InitialLoading: Asset Preload & Shader Compile
    InitialLoading --> Step0_RevealRing: Distance Clamped to Origin
    Step0_RevealRing --> Step1_Shockwave: User Clicks Start / Presses Key
    Step1_Shockwave --> FreeRoam: Camera Unlatches & Car Drops onto Island

    state FreeRoam {
        [*] --> Driving
        Driving --> Drifting: Spacebar / Handbrake
        Drifting --> Driving: Releasing Brake
        Driving --> FastTravel: Select Target on 2D Radar Map
        FastTravel --> Driving: Vehicle Drops at Destination
    }

    FreeRoam --> ApproachingKiosk: Enter Trigger Proximity Zone
    ApproachingKiosk --> ModalActive: Press Enter / Click Focus Button
    
    state ModalActive {
        [*] --> InspectingProject
        InspectingProject --> InspectingProject: Next / Prev Project Carousel
        InspectingProject --> ExternalLink: Open GitHub / Live Demo
    }

    ModalActive --> FreeRoam: Press ESC / Click Close Badge
```

---

## 🚀 Key Features

| Category | Highlights & Capabilities |
| :--- | :--- |
| **🏎️ Physics Vehicle Simulation** | Built on **Rapier 3D**, featuring 4-wheel raycast suspension, drift slip physics, dynamic friction coefficients, impact sounds, and ground-skid decal trails. |
| **🏆 3D Hackathon Pavilion** | Custom 3D wooden kiosk showcasing **6 top hackathons** with high-resolution framed 16:9 graphics, organizer distinctions, team roles, and repository/demo links. |
| **💻 Software Projects Zone** | 3D billboard kiosk highlighting **curated software projects** (CivicSentinel AI, SneakerVault, CampusIQ, Brew & Co., AegisCore AI, MangoAgent IoT, Precedent, GramSetu, Interview AI). |
| **📸 Photography Gallery** | 3D framed gallery displaying **15 themed photography albums** with contextual focal cameras and smooth depth-of-field zoom transitions. |
| **💼 Career Timeline** | 6 career milestones spanning engineering internships, leadership, and startup work, featuring an animated **rolling 7-segment clock display**. |
| **☀️ Day/Night & Weather Shaders** | Custom **TSL (Three.js Shading Language)** shaders with smooth sun/moon transit, procedural rain droplets, lightning flashes, falling snow, and wind-blown foliage. |
| **🗺️ 2D Island Radar & Fast Travel** | Glassmorphism radar map rendered with top-down island topography, dynamic player heading indicator, and click-to-teleport capabilities. |
| **🎵 Interactive WebAudio Engine** | Synthesized vehicle engine revs, gear shifts, tire squeals, environmental wind ambient, and physical impact audio nodes. |

---

## 🏆 Featured Hackathons in 3D Pavilion

1. **India Innovates 2026** — *National Smart Automation Series* | **1st Prize Winner** (`National Winner`)
2. **FAR AWAY 2026** — *Zuup Labs International Series* | **Semi-Finalist** (`New Delhi to Tokyo Prototype`)
3. **iQOO Hackathon 2026** — *Hardware Acceleration & Mobile Gaming Challenge* | **Finalist & Merit Award**
4. **Green Bharat Hackathon 2026** — *Ministry of Electronics & IT (MeitY)* | **Top 5 Nationwide**
5. **AVEVA Hackathon 2025** — *AVEVA Industrial AI & Digital Twin Challenge* | **Finalist — Industrial Innovation**
6. **Technex '25 Hackathon** — *IIT Varanasi (BHU) Annual Technical Championship* | **Winner — Most Innovative Solution**

---

## 🎮 Controls Guide

| Action | Keyboard | Gamepad | Mobile Touch |
| :--- | :--- | :--- | :--- |
| **Accelerate** | `W` or `↑` | Right Trigger (`R2` / `RT`) | On-screen Accelerate Button |
| **Reverse / Brake** | `S` or `↓` | Left Trigger (`L2` / `LT`) | On-screen Brake Button |
| **Steer Left / Right** | `A` / `D` or `←` / `→` | Left Analog Stick | On-screen Steering Wheel |
| **Handbrake / Drift** | `Space` | `A` or `X` Button | Drift Icon |
| **Reset Vehicle Position** | `R` | `Y` Button / Select | Reset Badge |
| **Toggle Day / Night** | `N` or Header Button | D-Pad Up | Sun/Moon Header Toggle |
| **Toggle Island Radar** | `M` or Radar Button | D-Pad Down | Minimap Radar Icon |
| **Inspect / Enter Kiosk** | `Enter` | `A` Button | Enter Button |
| **Exit Kiosk / Close Modal**| `Escape` | `B` Button | Close [X] Button |

---

## 🛠️ Technology Stack

```
Portfolio-v2 Core Stack
├── Graphics Engine    : Three.js (r160+), TSL (Three.js Shading Language)
├── Physics Engine     : @dimforge/rapier3d-compat (WebAssembly 3D Physics)
├── Build & Dev Server : Vite 5, Node.js 18+
├── Animation Library  : GSAP (GreenSock Animation Platform)
├── Asset Pipeline     : glTF-Transform, KTX2, Basis Universal Texture Compressor
├── Styles & UI        : Stylus, Glassmorphism CSS, Responsive SVG Vectors
├── Sound Design       : Native WebAudio API Synthesizer & Spatial Nodes
└── Deployment Target  : Vercel / Netlify / Cloudflare Pages
```

---

## 📦 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- `npm` or `pnpm`

### Step 1: Clone the Repository
```bash
git clone https://github.com/Aditya-dxt/Portfolio-v2.git
cd Portfolio-v2
```

### Step 2: Install Dependencies
```bash
npm install --force
```

### Step 3: Run Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Step 4: Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory, optimized with asset hashing and chunking.

---

## 🌐 Production Deployment

### Option A: Deploy to Vercel (Recommended)
This repository includes a production-ready `vercel.json` configuration file:
1. Push your code to your GitHub repository.
2. Visit [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import `Aditya-dxt/Portfolio-v2`.
4. Leave framework settings as **Vite** (Build: `npm run build`, Output: `dist`).
5. Click **Deploy**.

### Option B: Deploy to Netlify
A configured `netlify.toml` file is provided:
1. Connect your repository on [Netlify](https://www.netlify.com/).
2. Netlify will auto-detect:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Click **Deploy Site**.

---

## 🗜️ 3D Asset Compression Pipeline

To ensure sub-2-second load times on mobile and low-bandwidth connections, 3D assets and textures are compressed with ETC1S / KTX2:

```bash
# Compress all GLB models and textures in the static directory
npm run compress
```

This pipeline:
- Scans `static/` for uncompressed `.glb` meshes and compresses embedded textures with `etc1s`.
- Traverses image textures and re-encodes to GPU-ready KTX2/Basis formats.
- Converts UI raster graphics to modern lightweight WebP formats.

---

## 👤 Author & Contact

**Aditya Dixit**
- 🌐 **Portfolio**: [adityadixit.vercel.app](https://adityadixit.vercel.app/)
- 💻 **GitHub**: [@Aditya-dxt](https://github.com/Aditya-dxt)
- 💼 **LinkedIn**: [Aditya Dixit](https://linkedin.com/in/aditya-dxt)
- 📧 **Email**: [adityadxt1910@gmail.com](mailto:adityadxt1910@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to explore, learn, and build upon it!
