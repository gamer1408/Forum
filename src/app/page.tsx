"use client";

import ForumScroll from "@/components/ForumScroll";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Opacity transforms for each section text
  // Intro: 0% -> 20%
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.1, 0.2], [0, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.1, 0.2], [50, 0, -50]);

  // Men's Floor (Entrance): 20% -> 50% (Peak around 35%)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [50, 0, -50]);

  // Women's Floor (Arrival): 80% -> 100% (Peak around 90%)
  const opacity3 = useTransform(scrollYProgress, [0.8, 0.9, 0.98], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.8, 0.9, 0.98], [50, 0, -50]);

  return (
    <main className="relative h-[600vh] bg-forum-white">
      {/* Background Scroll Animation */}
      <ForumScroll />

      {/* Fixed Text Container */}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-10">

        {/* Sequence 1: Entrance */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-forum-black mb-4">
            FORUM ANGREN
          </h1>
          <p className="text-xl md:text-2xl font-sans text-forum-black/80 tracking-widest uppercase">
            The Future of Fashion.
          </p>
        </motion.div>

        {/* Sequence 2: Stairs / Men's */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-forum-black mb-4">
            GROUND FLOOR
          </h2>
          <p className="text-lg md:text-xl font-sans text-forum-black/80 tracking-widest uppercase border-t border-forum-gold pt-4 inline-block">
            The Sartorial Gentleman.
          </p>
        </motion.div>

        {/* Sequence 3: 2nd Floor / Women's */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute text-center max-w-4xl px-4"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-forum-black mb-4">
            LEVEL TWO
          </h2>
          <p className="text-lg md:text-xl font-sans text-forum-black/80 tracking-widest uppercase border-b border-forum-gold pb-4 inline-block">
            Elegance Redefined.
          </p>
        </motion.div>

      </div>

      {/* Scroll indicator maybe? Optional but good for UX */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-forum-black/50 animate-bounce pointer-events-none z-20"
      >
        <span className="text-sm font-sans tracking-widest uppercase">Scroll to Explore</span>
      </motion.div>
    </main>
  );
}
