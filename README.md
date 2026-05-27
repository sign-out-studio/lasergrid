# LaserGrid

A cyber-minimalist logic puzzle game for browsers. Place lasers on a grid to power all Target Cores with the exact number of beams required. Built for mobile and desktop, no account or download needed.

## How to Run Locally

1. Download or clone this repository.
2. Open `index.html` directly in your browser (no server required).

## How to Deploy as a Static Site

You can deploy LaserGrid for free using any static hosting service. No build step or backend is required.

### Recommended Free Hosting Options
- **Firebase Hosting**: [firebase.google.com/products/hosting](https://firebase.google.com/products/hosting)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)
- **Netlify**: [netlify.com](https://www.netlify.com/)

#### Steps (example: GitHub Pages)
1. Push all files to a public GitHub repository.
2. In repo settings, enable GitHub Pages (set source to main branch).
3. Visit the provided URL to play.

## Current MVP Scope
- 4x4 grid logic puzzle
- 4 handcrafted puzzles
- Laser placement/removal
- Beam/core logic
- Core visual states (under, perfect, overloaded)
- Win condition
- Toggle scoring
- Timer
- Rank logic
- Victory modal
- Non-spoiler share text
- Help modal
- Local save/restore
- Mobile-first cyber-minimalist design

## Out-of-Scope Features (for later)
- Daily puzzle rotation
- 5x5 mode
- Leaderboard
- Accounts or login
- Backend or database
- Puzzle generator
- Analytics or ads
- Monetization

## Manual Test Checklist
- [x] index.html opens locally in browser
- [x] CSS/JS load via relative paths
- [x] Game works without server
- [x] No external services required
- [x] Share text uses current page URL
- [x] Clipboard fallback for share
- [x] No solution is shown to player
- [x] No console errors during play
- [x] Mobile layout is usable
