"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Dynamic visuals based on scroll
    const headerBg = useTransform(
        scrollY,
        [0, 100],
        ["rgba(0, 0, 0, 0)", "rgba(5, 5, 5, 0.4)"]
    );

    const textColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.95)", "#C5A059"]
    );

    const borderColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(197, 160, 89, 0.6)", "#C5A059"]
    );

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    // Combined links for mobile menu
    const navLinks = [
        { name: "KOLLEKSIYALAR", href: "#kolleksiyalar" },
        { name: "TARIXIMIZ", href: "#tariximiz" },
        { name: "MANZIL", href: "#manzil" }
    ];

    const containerVars = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            }
        }
    };

    const menuVars = {
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    return (
        <motion.header
            style={{ backgroundColor: headerBg }}
            initial="hidden"
            animate="visible"
            variants={containerVars}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 ease-out border-b border-white/5"
        >
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between relative">

                {/* Left: Mobile Menu Trigger / Desktop Nav */}
                <div className="flex-1 flex items-center justify-start">
                    {/* Desktop Left Nav */}
                    <nav className="hidden lg:flex space-x-12">
                        <Link href="#kolleksiyalar">
                            <motion.span style={{ color: textColor }} className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase hover:text-white transition-colors">
                                KOLLEKSIYALAR
                            </motion.span>
                        </Link>
                        <Link href="#tariximiz">
                            <motion.span style={{ color: textColor }} className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase hover:text-white transition-colors">
                                TARIXIMIZ
                            </motion.span>
                        </Link>
                    </nav>

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 -ml-2 text-forum-gold focus:outline-none"
                    >
                        <div className="space-y-1.5 pointer-events-none">
                            <span className={`block w-6 h-[1px] bg-forum-gold transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-4 h-[1px] bg-forum-gold transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-6 h-[1px] bg-forum-gold transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Center: Logo (Always Visible) */}
                <div className="flex-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Link href="/">
                        <motion.h1
                            className="font-serif text-2xl md:text-3xl text-forum-gold tracking-widest drop-shadow-md whitespace-nowrap text-center"
                        >
                            FORUM <span className="italic font-light">ANGREN</span>
                        </motion.h1>
                    </Link>
                </div>

                {/* Right: CTA & Desktop Nav */}
                <div className="flex-1 flex items-center justify-end space-x-8">
                    <nav className="hidden lg:flex">
                        <Link href="#manzil">
                            <motion.span style={{ color: textColor }} className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase hover:text-white transition-colors">
                                MANZIL
                            </motion.span>
                        </Link>
                    </nav>

                    {/* CTA - Always Visible, Scales on Mobile */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ color: textColor, borderColor: borderColor }}
                        className="px-4 py-2 md:px-6 md:py-3 border font-sans text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-300 hover:bg-forum-gold hover:text-black hover:border-forum-gold whitespace-nowrap"
                    >
                        QABULGA YOZILISH
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVars}
                        className="lg:hidden overflow-hidden bg-forum-black/95 backdrop-blur-xl border-t border-white/5"
                    >
                        <nav className="flex flex-col items-center py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    <span className="text-forum-gold font-sans text-xs tracking-[0.3em] uppercase hover:text-white transition-colors">
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
