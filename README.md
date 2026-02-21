Markdown

# 🕹️ Aaron's Arcade

A blazing-fast, modular web arcade built as a Single Page Application (SPA). This project serves as a sandbox for exploring game loop architecture, state management, and the HTML5 Canvas API within a modern React ecosystem.

## 🚀 Tech Stack
* **Frontend:** React, Vite
* **Routing:** React Router (`react-router-dom`)
* **Game Rendering:** HTML5 `<canvas>`, Vanilla JavaScript Game Loops
* **Styling:** CSS Grid, Flexbox, Inline React Styles

## 🎮 Current Games

### 🐍 Snake: Enhanced
A custom-engineered take on the classic arcade game, completely built from scratch using a recursive `setTimeout` loop to allow for dynamic frame rates.

**Custom Mechanics & Engineering:**
* **Screen Wrapping:** Edge-to-edge portal transitions.
* **Weighted RNG Drop Tables:** Power-ups spawn on a 5% chance, utilizing a custom 100-sided die roll system to balance drop rates.
* **Score-Gated Loot:** The drop table dynamically shifts after passing a score of 100 to introduce late-game items.
* **Active Buff Tracking:** Real-time speed modulation (Speed Boosts and Slow-mo) with overlapping timer mitigation.

## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>

    Navigate to the directory:
    Bash

    cd mini-arcade

    Install dependencies:
    Bash

    npm install

    Start the development server:
    Bash

    npm run dev