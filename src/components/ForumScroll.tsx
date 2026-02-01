"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";

// Configuration Constants
const ENTRANCE = 40;
const STAIRS = 32;
const SECOND_FLOOR = 24;
const TOTAL_FRAMES = ENTRANCE + STAIRS + SECOND_FLOOR; // 96

// Updated Physics for "Premium Cinematic Weight"
const SCROLL_STIFFNESS = 60;
const SCROLL_DAMPING = 45;

export default function ForumScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();

    // Cinematic Non-Linear Mapping (The "Sticky" Logic)
    // 0.00 -> 0.35: Play Entrance (Frames 0-39)
    // 0.35 -> 0.55: FREEZE at Frame 39 (Read "Ground Floor")
    // 0.55 -> 0.75: Play Stairs (Frames 40-71)
    // 0.75 -> 0.90: FREEZE at Frame 71 (Read "Level Two")
    // 0.90 -> 1.00: Play Second Floor (Frames 72-95)

    // Normalize target frames to 0-1 range for the output
    const frame39 = 39 / TOTAL_FRAMES;
    const frame71 = 71 / TOTAL_FRAMES;

    const cinematicProgress = useTransform(
        scrollYProgress,
        [0, 0.35, 0.55, 0.75, 0.90, 1],
        [0, frame39, frame39, frame71, frame71, 1]
    );

    const smoothProgress = useSpring(cinematicProgress, {
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
            folder = "entrance";
            localIndex = index + 1;
        } else if (index < ENTRANCE + STAIRS) {
            folder = "stairs";
            localIndex = index - ENTRANCE + 1;
        } else {
            folder = "second-floor";
            localIndex = index - (ENTRANCE + STAIRS) + 1;
        }

        const filename = `ezgif-frame-${localIndex.toString().padStart(3, "0")}.jpg`;
        return `/assets/${folder}/${filename}`;
    };

    useEffect(() => {
        const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);
        let count = 0;

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

            const physicalWidth = width * dpr;
            const physicalHeight = height * dpr;

            // Manage Physical Dimensions
            if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
                canvas.width = physicalWidth;
                canvas.height = physicalHeight;
            }

            // Sync CSS Dimensions
            if (canvas.style.width !== `${width}px` || canvas.style.height !== `${height}px`) {
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
            }

            // Reset and Apply Scaling
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Force High Quality Smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Clamp frame index
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(latest * TOTAL_FRAMES)
            );

            const img = images[frameIndex];

            if (img && img.complete && img.naturalWidth > 0) {
                const imgW = img.naturalWidth;
                const imgH = img.naturalHeight;

                const hRatio = width / imgW;
                const vRatio = height / imgH;
                const ratio = Math.max(hRatio, vRatio);

                const finalWidth = imgW * ratio;
                const finalHeight = imgH * ratio;

                const centerShift_x = (width - finalWidth) / 2;
                const centerShift_y = (height - finalHeight) / 2;

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(
                    img,
                    0, 0, imgW, imgH,
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
                    FORUM ANGREN LOADING {Math.round(progress)}%
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
