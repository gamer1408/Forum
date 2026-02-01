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
    <main className="relative h-[600vh] bg-forum-black text-forum-white font-sans selection:bg-forum-gold selection:text-forum-black overflow-hidden">
      {/* Background Scroll Animation */}
      <ForumScroll />

      {/* Gradient Mask for Smooth Footer Transition */}
      <motion.div
        style={{ opacity: maskOpacity }}
        className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-forum-black via-forum-black/80 to-transparent z-10 pointer-events-none"
      />

      {/* Fixed Text Container with Visibility Enhancements */}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-20">

        {/* Sequence 1: Entrance */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-center max-w-5xl px-8 w-full flex flex-col items-center"
        >
          {/* Radial Gradient for Visibility */}
          <div className="absolute inset-0 bg-radial-faded from-forum-black/90 via-forum-black/20 to-transparent blur-3xl -z-10 scale-150" />

          <h1 className="text-6xl md:text-9xl font-serif text-forum-white mb-8 leading-tight drop-shadow-2xl">
            FORUM <span className="text-forum-gold italic">ANGREN</span>
          </h1>
          <div className="h-px w-24 bg-forum-gold mb-8 opacity-60" />
          <p className="text-sm md:text-lg font-sans text-forum-white/80 tracking-[0.3em] uppercase drop-shadow-lg">
            The Digital Flagship
          </p>
        </motion.div>

        {/* Sequence 2: Stairs / Men's */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute text-center max-w-5xl px-8 w-full flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-radial-faded from-forum-black/80 via-forum-black/30 to-transparent blur-3xl -z-10 scale-150" />

          <p className="text-forum-gold font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            Ground Level
          </p>
          <h2 className="text-5xl md:text-8xl font-serif text-forum-white mb-6 drop-shadow-2xl">
            The Men’s Atelier
          </h2>
          <p className="text-base md:text-xl font-sans text-forum-white/70 max-w-2xl leading-relaxed">
            A curated selection of the finest tailoring and casual luxury, designed for the modern gentleman.
          </p>
        </motion.div>

        {/* Sequence 3: 2nd Floor / Women's */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute text-center max-w-5xl px-8 w-full flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-radial-faded from-forum-black/80 via-forum-black/30 to-transparent blur-3xl -z-10 scale-150" />

          <p className="text-forum-gold font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            Level Two
          </p>
          <h2 className="text-5xl md:text-8xl font-serif text-forum-white mb-6 drop-shadow-2xl">
            Haute Couture
          </h2>
          <p className="text-base md:text-xl font-sans text-forum-white/70 max-w-2xl leading-relaxed">
            An exclusive gallery dedicated to women's fashion, featuring avant-garde designs and timeless elegance.
          </p>
        </motion.div>
      </div>

      {/* Flagship Footer */}
      <motion.footer
        style={{ opacity: footerOpacity, y: footerY }}
        className="fixed bottom-0 left-0 w-full bg-forum-black z-30 pt-16 pb-12 px-6 md:px-24 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">

          {/* Column 1: Visit */}
          <div className="space-y-4">
            <h4 className="text-forum-gold font-sans text-xs tracking-[0.3em] uppercase mb-2 border-b border-white/10 pb-2 inline-block">
              Visit Us
            </h4>
            <div className="text-forum-white/80 font-serif text-lg leading-relaxed">
              <p>Forum Building,</p>
              <p>Angren City, Uzbekistan.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 border border-forum-gold text-forum-gold hover:bg-forum-gold hover:text-forum-black transition-all duration-300 font-sans text-xs tracking-[0.3em] uppercase"
            >
              Contact Concierge
            </motion.button>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-4">
            <h4 className="text-forum-gold font-sans text-xs tracking-[0.3em] uppercase mb-2 border-b border-white/10 pb-2 inline-block">
              Contact
            </h4>
            <div className="space-y-2 text-forum-white/80 font-sans text-sm tracking-wide">
              <a href="mailto:info@forum-angren.uz" className="block hover:text-forum-gold transition-colors">
                info@forum-angren.uz
              </a>
              <a href="tel:+998901234567" className="block hover:text-forum-gold transition-colors">
                +998 90 123 45 67
              </a>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="space-y-4">
            <h4 className="text-forum-gold font-sans text-xs tracking-[0.3em] uppercase mb-2 border-b border-white/10 pb-2 inline-block">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-forum-white/80 font-sans text-sm tracking-wide">
              <li className="flex justify-center md:justify-start space-x-4">
                <span className="opacity-60">Mon - Sat:</span>
                <span>10:00 — 21:00</span>
              </li>
              <li className="flex justify-center md:justify-start space-x-4">
                <span className="opacity-60">Sunday:</span>
                <span className="text-forum-gold">By Appointment</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 font-sans tracking-[0.3em] uppercase">
          <span>© 2026 Forum Angren. All Rights Reserved.</span>
          <span className="mt-2 md:mt-0">Est. 2024 • Designed in Tashkent</span>
        </div>
      </motion.footer>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 text-forum-gold/40 flex flex-col items-center gap-4 pointer-events-none z-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-forum-gold to-transparent" />
        <span className="text-[10px] font-sans tracking-[0.3em] uppercase">Explore</span>
      </motion.div>
    </main>
  );
}
