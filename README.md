# Desmond Chung — Developer Portfolio

A single-page developer portfolio with a dark, data-terminal aesthetic — interactive particle hero, animated sections, and a responsive bento-grid project showcase.

🔗 **Live site:** https://desmond-chung-portfolio.vercel.app/ 

![Portfolio preview](public/profile.jpg)

## Tech Stack

- **React 18** — UI
- **Vite 5** — build tooling & dev server
- **Framer Motion 11** — scroll and entrance animations
- **HTML Canvas** — interactive node-network hero background
- Zero CSS framework — styling is hand-rolled with design tokens

## Features

- Interactive particle canvas that reacts to the cursor
- Typewriter role headline and scroll-triggered reveals
- Responsive layout (mobile → desktop) with a bento-grid project section
- Open Graph / Twitter meta tags for rich link previews on LinkedIn & Slack
- Single dependency-light bundle, deployed on Vercel

## Run Locally

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Create a production build in /dist
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
.
├── index.html          # Entry HTML + meta tags
├── public/             # Static assets (resume, profile image)
├── src/
│   ├── main.jsx        # React root
│   ├── App.jsx         # App shell
│   └── Portfolio.jsx   # All sections + components
└── vite.config.js
```

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic build and deploy.

---

© 2026 Desmond Chung
