"use client";

import ForumScroll from "@/components/ForumScroll";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Opacity transforms for each section text
  // Intro: 5% -> 25% "FORUM ANGREN..."
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [50, 0, -50]);

  // Ground Floor: 35% -> 65% "THE SARTORIAL GENTLEMAN"
  // Extended range for better reading time
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [50, 0, -50]);

  // Level Two: 80% -> 95% "ELEGANCE REDEFINED"
  // Aligns with the 2nd floor sequence
  const opacity3 = useTransform(scrollYProgress, [0.8, 0.87, 0.95], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.8, 0.87, 0.95], [50, 0, -50]);

  // Footer opacity - reveals at the very end
  const footerOpacity = useTransform(scrollYProgress, [0.96, 1], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.96, 1], [30, 0]);

  // Gradient Mask opacity - fades in to blend footer
  const maskOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <main className="relative h-[600vh] bg-forum-black">
      {/* Background Scroll Animation */}
      <ForumScroll />

      {/* Gradient Mask for Smooth Footer Transition */}
      <motion.div
        style={{ opacity: maskOpacity }}
        className="fixed bottom-0 left-0 w-full h-96 bg-gradient-to-t from-forum-black via-forum-black/80 to-transparent z-10 pointer-events-none"
      />

      {/* Fixed Text Container */}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-20 mix-blend-difference">

        {/* Sequence 1: Entrance */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <h1 className="text-5xl md:text-8xl font-serif text-forum-white mb-6">
            FORUM ANGREN
          </h1>
          <p className="text-xl md:text-2xl font-sans text-forum-gold tracking-[0.3em] uppercase">
            The Future of Fashion.
          </p>
        </motion.div>

        {/* Sequence 2: Stairs / Men's */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <h2 className="text-4xl md:text-7xl font-serif text-forum-white mb-6">
            GROUND FLOOR
          </h2>
          <p className="text-lg md:text-2xl font-sans text-forum-white/90 tracking-widest uppercase border-t border-forum-gold pt-6 inline-block">
            The Sartorial Gentleman.
          </p>
        </motion.div>

        {/* Sequence 3: 2nd Floor / Women's */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <h2 className="text-4xl md:text-7xl font-serif text-forum-white mb-6">
            LEVEL TWO
          </h2>
          <p className="text-lg md:text-2xl font-sans text-forum-white/90 tracking-widest uppercase border-b border-forum-gold pb-6 inline-block">
            Elegance Redefined.
          </p>
        </motion.div>
      </div>

      {/* High-End Footer */}
      <motion.footer
        style={{ opacity: footerOpacity, y: footerY }}
        className="fixed bottom-0 left-0 w-full bg-forum-black z-30 py-16 px-8 md:px-24 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-10 md:space-y-0">

          <div className="space-y-4">
            <h3 className="font-serif text-3xl text-forum-white">FORUM <span className="text-forum-gold">ANGREN</span></h3>
            <p className="text-forum-white/60 font-sans text-sm tracking-wide leading-relaxed">
              Forum Building, Angren City<br />
              Tashkent Region.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 text-left md:text-right">
            <div className="space-y-2">
              <p className="text-forum-gold font-sans text-xs tracking-[0.2em] uppercase">Opening Hours</p>
              <p className="text-forum-white font-sans text-sm">Mon - Sat: 10:00 — 21:00</p>
            </div>

            <div className="space-y-2">
              <p className="text-forum-gold font-sans text-xs tracking-[0.2em] uppercase">Contact</p>
              <a href="tel:+998901234567" className="block text-forum-white font-sans text-sm hover:text-forum-gold transition-colors">
                +998 90 123 45 67
              </a>
              <a href="mailto:info@forum-angren.uz" className="block text-forum-white font-sans text-sm hover:text-forum-gold transition-colors">
                info@forum-angren.uz
              </a>
            </div>
          </div>

        </div>
      </motion.footer>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-forum-gold/50 animate-bounce pointer-events-none z-20"
      >
        <span className="text-sm font-sans tracking-widest uppercase">Scroll to Explore</span>
      </motion.div>
    </main>
  );
}
