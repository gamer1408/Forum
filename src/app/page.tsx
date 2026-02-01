"use client";

import ForumScroll from "@/components/ForumScroll";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Opacity transforms - Aligned with the 'Sticky' Freeze Logic.
  // Standard Stop Points used: 0.1, 0.45, 0.825

  // 1. INTRO (Progress 0.1)
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.1, 0.2, 0.25], [20, 0, 0, -20]);

  // 2. GROUND FLOOR (Progress ~0.45)
  // Sticky Plateau: 0.35 -> 0.55
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.35, 0.55, 0.6], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.35, 0.55, 0.6], [20, 0, 0, -20]);

  // 3. LEVEL TWO (Progress ~0.825)
  // Sticky Plateau: 0.75 -> 0.9
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 0.95], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 0.95], [20, 0, 0, -20]);

  // Footer Reveal (Late: 0.98)
  const footerOpacity = useTransform(scrollYProgress, [0.96, 1], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.96, 1], [50, 0]);
  const maskOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  return (
    <main className="relative h-[600vh] bg-forum-black text-forum-white font-sans selection:bg-forum-gold selection:text-forum-black overflow-hidden">
      {/* Background Scroll Animation */}
      <ForumScroll />

      {/* Gradient Mask for Smooth Footer Transition */}
      <motion.div
        style={{ opacity: maskOpacity }}
        className="fixed bottom-0 left-0 w-full h-96 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none"
      />

      {/* Fixed Text Container - Responsive Flex Centering */}
      <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center p-6">

        {/* SEQUENCE 1: Entrance */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute w-full max-w-5xl flex flex-col items-center text-center px-6"
        >
          {/* Radial Gradient for readability */}
          <div className="absolute inset-0 bg-radial-faded from-forum-black/80 via-forum-black/20 to-transparent blur-3xl -z-10 scale-150" />

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-forum-white mb-6 leading-tight drop-shadow-2xl">
            FORUM <span className="text-forum-gold italic">ANGREN</span>
          </h1>
          <div className="h-px w-16 md:w-24 bg-forum-gold mb-6 opacity-60" />
          <p className="text-xs sm:text-sm md:text-lg font-sans text-forum-white/90 tracking-[0.3em] uppercase drop-shadow-lg">
            MODANING KELAJAGI
          </p>
        </motion.div>

        {/* SEQUENCE 2: Ground Floor */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute w-full max-w-4xl flex flex-col items-center text-center px-6"
        >
          <div className="absolute inset-0 bg-radial-faded from-forum-black/80 via-forum-black/20 to-transparent blur-3xl -z-10 scale-150" />

          <p className="text-forum-gold font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">
            BIRINCHI QAVAT
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif text-forum-white mb-6 drop-shadow-2xl">
            KLASSIK ERKAKLAR OLAMI
          </h2>
          <p className="text-sm md:text-xl font-sans text-forum-white/80 max-w-xl leading-relaxed">
            Zamonaviy jentlmenlar uchun yuqori did bilan tanlangan bejirim va hashamatli liboslar.
          </p>
        </motion.div>

        {/* SEQUENCE 3: Level Two */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute w-full max-w-4xl flex flex-col items-center text-center px-6"
        >
          <div className="absolute inset-0 bg-radial-faded from-forum-black/80 via-forum-black/20 to-transparent blur-3xl -z-10 scale-150" />

          <p className="text-forum-gold font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">
            IKKINCHI QAVAT
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif text-forum-white mb-6 drop-shadow-2xl">
            NAFOSAT VA ELEGANTLIK
          </h2>
          <p className="text-sm md:text-xl font-sans text-forum-white/80 max-w-xl leading-relaxed">
            Ayollar modasining eng nafis namunalari, avangard dizayn va o'zgacha uslublar jamlanmasi.
          </p>
        </motion.div>

      </div>

      {/* Flagship Footer - Responsive */}
      <motion.footer
        style={{ opacity: footerOpacity, y: footerY }}
        className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#050505] via-[rgb(5,5,5)] to-transparent z-30 pt-16 pb-8 px-6 md:px-16"
      >
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 border-t border-white/10 pt-12">

          {/* Left: Location */}
          <div className="space-y-4 max-w-xs">
            <h4 className="text-forum-gold font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
              MANZILIMIZ
            </h4>
            <div className="font-serif italic text-2xl md:text-3xl text-forum-white leading-tight">
              <p>Forum Binasi,</p>
              <p>Angren Shahri.</p>
            </div>
          </div>

          {/* Center: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-forum-gold font-sans text-xs tracking-[0.3em] uppercase mb-2 md:text-center">
              ALOQA
            </h4>
            <a href="tel:+998901234567" className="block font-serif text-xl md:text-2xl text-white/80 hover:text-forum-gold transition-colors">
              +998 90 123 45 67
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-left md:text-right">
            <p className="text-[10px] text-white/30 font-sans tracking-[0.2em] uppercase">
              © 2026 FORUM ANGREN.
            </p>
            <p className="text-[10px] text-white/30 font-sans tracking-[0.2em] uppercase mt-1">
              DESIGNED IN TASHKENT.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Scroll indicator - Centered & Subtle */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-forum-gold/40 flex flex-col items-center gap-3 pointer-events-none z-20"
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-forum-gold to-transparent" />
        <span className="text-[8px] md:text-[10px] font-sans tracking-[0.3em] uppercase">KASHF ETISH</span>
      </motion.div>
    </main>
  );
}
