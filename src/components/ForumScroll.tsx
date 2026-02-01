"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

// Configuration Constants
const ENTRANCE = 40;
const STAIRS = 32;
const SECOND_FLOOR = 24;
const TOTAL_FRAMES = ENTRANCE + STAIRS + SECOND_FLOOR; // 96

// Updated Physics for "Heavy" Architectural Feel (Mass & Weight)
const SCROLL_STIFFNESS = 60;
const SCROLL_DAMPING = 45;

export default function ForumScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: SCROLL_STIFFNESS,
        damping: SCROLL_DAMPING,
        restDelta: 0.001,
    });

    const getFrameData = (index: number) => {
        // Prevent 404s by clamping index
        if (index < 0 || index >= TOTAL_FRAMES) return "";

        let folder = "";
        let localIndex = 0;

        if (index < ENTRANCE) {
            // 0 - 39
            folder = "entrance";
            localIndex = index + 1;
        } else if (index < ENTRANCE + STAIRS) {
            // 40 - 71
            folder = "stairs";
            localIndex = index - ENTRANCE + 1;
        } else {
            // 72 - 95
            folder = "second-floor";
            localIndex = index - (ENTRANCE + STAIRS) + 1;
        }

        // Ensure strict 3-digit padding: ezgif-frame-001.jpg
        const filename = `ezgif-frame-${localIndex.toString().padStart(3, "0")}.jpg`;
        return `/assets/${folder}/${filename}`;
    };

    useEffect(() => {
        const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);
        let count = 0;

        // Preload all images
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFrameData(i);

            img.onload = () => {
                count++;
                setLoadedCount(count);
                if (count === TOTAL_FRAMES) setLoading(false);
            };
            img.onerror = () => {
                console.warn(`Frame broken/missing: ${img.src}`);
                setLoadedCount(prev => prev + 1);
                if (count + 1 >= TOTAL_FRAMES) setLoading(false);
            };
            imgArray[i] = img;
        }
        setImages(imgArray);
    }, []);

    useEffect(() => {
        const renderFrame = (latest: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d", { alpha: false });
            if (!canvas || !ctx || images.length !== TOTAL_FRAMES) return;

            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Manage Physical Dimensions
            if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
            }

            // Sync CSS Dimensions
            if (canvas.style.width !== `${width}px` || canvas.style.height !== `${height}px`) {
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
            }

            // Reset and Apply Scaling (Stateless approach)
            // This ensures logic is always correct even if context state drifts
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // High Quality Smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Clamp frame index
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(latest * TOTAL_FRAMES)
            );

            const img = images[frameIndex];

            if (img && img.complete && img.naturalWidth > 0) {
                // "Cover" logic based on logical pixels (since we scaled ctx)
                const hRatio = width / img.width;
                const vRatio = height / img.height;
                const ratio = Math.max(hRatio, vRatio);

                const finalWidth = img.width * ratio;
                const finalHeight = img.height * ratio;

                const centerShift_x = (width - finalWidth) / 2;
                const centerShift_y = (height - finalHeight) / 2;

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, finalWidth, finalHeight
                );
            }
        };

        const unsubscribe = smoothProgress.on("change", (latest) => {
            requestAnimationFrame(() => renderFrame(latest));
        });

        // Initial Render
        if (!loading && images.length === TOTAL_FRAMES) {
            renderFrame(smoothProgress.get());
        }

        // Handle resize
        const onResize = () => {
            if (!loading && images.length === TOTAL_FRAMES) {
                renderFrame(smoothProgress.get());
            }
        };
        window.addEventListener("resize", onResize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", onResize);
        };
    }, [smoothProgress, images, loading]);

    if (loading) {
        const progress = (loadedCount / TOTAL_FRAMES) * 100;
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forum-black">
                <div className="w-64 h-0.5 bg-gray-900 overflow-hidden relative">
                    <div
                        className="absolute top-0 left-0 h-full bg-forum-gold transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-4 text-[10px] text-forum-gold/60 font-sans tracking-[0.2em] uppercase">
                    Loading Experience
                </p>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full object-cover"
        />
    );
}
