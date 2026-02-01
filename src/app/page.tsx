"use client";

import ForumScroll from "@/components/ForumScroll";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Opacity transforms for each section text
  // Intro: 0% -> 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [50, 0, -50]);

  // Ground Floor: 35% -> 55%
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [50, 0, -50]);

  // Level Two: 80% -> 100%
  const opacity3 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, -50]);

  // Footer opacity - reveals at the very end
  const footerOpacity = useTransform(scrollYProgress, [0.96, 1], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.96, 1], [30, 0]);

  // Gradient Mask opacity - fades in to blend footer
  const maskOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <main className="relative h-[600vh] bg-forum-black text-forum-white font-sans selection:bg-forum-gold selection:text-forum-black">
      {/* Background Scroll Animation */}
      <ForumScroll />

      {/* Gradient Mask for Smooth Footer Transition */}
      <motion.div
        style={{ opacity: maskOpacity }}
        className="fixed bottom-0 left-0 w-full h-96 bg-gradient-to-t from-forum-black via-forum-black/90 to-transparent z-10 pointer-events-none"
      />

      {/* Fixed Text Container with Visibility Enhancements */}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-20">

        {/* Sequence 1: Entrance */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-center max-w-5xl px-4"
        >
          {/* Radial Gradient for Visibility */}
          <div className="absolute inset-0 bg-radial-gradient from-black/60 via-transparent to-transparent blur-3xl -z-10 scale-150" />

          <h1 className="text-5xl md:text-8xl font-serif text-forum-white mb-6 leading-tight drop-shadow-2xl">
            FORUM ANGREN
          </h1>
          <p className="text-xl md:text-2xl font-sans text-forum-gold tracking-[0.3em] uppercase drop-shadow-lg">
            The New Standard.
          </p>
        </motion.div>

        {/* Sequence 2: Stairs / Men's */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <div className="absolute inset-0 bg-radial-gradient from-black/60 via-transparent to-transparent blur-3xl -z-10 scale-150" />

          <h2 className="text-4xl md:text-7xl font-serif text-forum-white mb-6 drop-shadow-2xl">
            GROUND LEVEL
          </h2>
          <p className="text-lg md:text-2xl font-sans text-forum-white/90 tracking-widest uppercase border-t border-forum-gold pt-6 inline-block drop-shadow-lg">
            The Menswear Atelier.
          </p>
        </motion.div>

        {/* Sequence 3: 2nd Floor / Women's */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <div className="absolute inset-0 bg-radial-gradient from-black/60 via-transparent to-transparent blur-3xl -z-10 scale-150" />

          <h2 className="text-4xl md:text-7xl font-serif text-forum-white mb-6 drop-shadow-2xl">
            LEVEL TWO
          </h2>
          <p className="text-lg md:text-2xl font-sans text-forum-white/90 tracking-widest uppercase border-b border-forum-gold pb-6 inline-block drop-shadow-lg">
            The Haute Couture Gallery.
          </p>
        </motion.div>
      </div>

      {/* Flagship Footer */}
      <motion.footer
        style={{ opacity: footerOpacity, y: footerY }}
        className="fixed bottom-0 left-0 w-full bg-forum-black z-30 py-20 px-8 md:px-24 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">

          {/* Column 1: Brand & Location */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl text-forum-white">FORUM <span className="text-forum-gold">ANGREN</span></h3>
            <p className="text-forum-white/70 font-sans text-sm tracking-wide leading-relaxed">
              Forum Building, Angren City<br />
              Tashkent Region, Uzbekistan.
            </p>
            <button className="inline-block px-8 py-3 border border-forum-gold text-forum-gold hover:bg-forum-gold hover:text-forum-black transition-all duration-300 font-sans tracking-widest uppercase text-xs">
              Book an Appointment
            </button>
          </div>

          {/* Column 2: Hours */}
          <div className="space-y-4">
            <p className="text-forum-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 border-b border-white/10 pb-2 inline-block">Opening Hours</p>
            <ul className="space-y-2 text-forum-white/80 font-sans text-sm">
              <li>Mon - Fri: 10:00 — 21:00</li>
              <li>Saturday: 11:00 — 22:00</li>
              <li>Sunday: By Appointment Only</li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <p className="text-forum-gold font-sans text-xs tracking-[0.2em] uppercase mb-2 border-b border-white/10 pb-2 inline-block">Contact Atelier</p>
            <div className="space-y-2 text-forum-white/80 font-sans text-sm flex flex-col items-center md:items-start">
              <a href="tel:+998901234567" className="hover:text-forum-gold transition-colors">
                +998 90 123 45 67
              </a>
              <a href="mailto:concierge@forum-angren.uz" className="hover:text-forum-gold transition-colors">
                concierge@forum-angren.uz
              </a>
              <div className="flex space-x-4 mt-4 opacity-50">
                {/* Social Placeholders */}
                <span>INSTAGRAM</span>
                <span>TELEGRAM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 font-sans tracking-widest uppercase">
          <span>© 2026 Forum Angren. All Rights Reserved.</span>
          <span>Est. 2024 • Designed in Tashkent</span>
        </div>
      </motion.footer>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-forum-gold/50 animate-bounce pointer-events-none z-20"
      >
        <span className="text-xs font-sans tracking-[0.3em] uppercase">Scroll to Discover</span>
      </motion.div>
    </main>
  );
}
