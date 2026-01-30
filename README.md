# Forum Angren | Digital Flagship

A high-performance "Digital Flagship" experience for Forum Angren, featuring a scroll-linked 3D architectural journey.

## Features
- **Scroll-Linked Animation**: 96-frame seamless sequence using HTML5 Canvas.
- **Retina/High-DPI Support**: Automatic scaling for modern displays (`window.devicePixelRatio`).
- **Luxury UI**: Custom "Forum Gold" (#C5A059) & "Deep Black" (#050505) theme.
- **Smart Loading**: Minimalist preloader with error resilience.
- **Performance**: Optimized asset loading and high-quality image smoothing.

## Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Rendering**: HTML5 Canvas (2D Context)

## Project Structure
- `/public/assets/`: Contains image sequences (`entrance`, `stairs`, `second-floor`).
- `/src/components/ForumScroll.tsx`: Core animation engine.
- `/src/app/page.tsx`: Main layout, text triggers, and footer.

## Getting Started

```bash
npm install
npm run dev
```

## Deployment
Build for production:
```bash
npm run build
```
The output is optimized for Vercel or any static hosting.

---
© 2026 Forum Angren. All Rights Reserved.
