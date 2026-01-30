"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

// Configuration Constants
const ENTRANCE_FRAMES = 40;
const STAIRS_FRAMES = 32;
const SECOND_FLOOR_FRAMES = 24;
const TOTAL_FRAMES = ENTRANCE_FRAMES + STAIRS_FRAMES + SECOND_FLOOR_FRAMES; // 96
const SCROLL_DAMPING = 40; // Heavy, premium feel

export default function ForumScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: SCROLL_DAMPING,
        restDelta: 0.001,
    });

    const getFrameData = (index: number) => {
        let folder = "";
        let localIndex = 0;

        if (index < ENTRANCE_FRAMES) {
            // 0 - 39
            folder = "entrance";
            localIndex = index + 1;
        } else if (index < ENTRANCE_FRAMES + STAIRS_FRAMES) {
            // 40 - 71
            folder = "stairs";
            localIndex = index - ENTRANCE_FRAMES + 1;
        } else {
            // 72 - 95
            folder = "second-floor";
            localIndex = index - (ENTRANCE_FRAMES + STAIRS_FRAMES) + 1;
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
                console.warn(`Frame missing: ${img.src}`);
                count++;
                setLoadedCount(count);
                if (count === TOTAL_FRAMES) setLoading(false);
            };
            imgArray[i] = img;
        }
        setImages(imgArray);
    }, []);

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (latest) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d", { alpha: false }); // Optimization
            if (!canvas || !ctx || images.length !== TOTAL_FRAMES) return;

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
                // Set canvas to full window size dynamically
                if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    // Re-apply smoothing after resize
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = "high";
                }

                // "Cover" logic
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }
        });

        // Initial Render
        if (!loading && images.length === TOTAL_FRAMES) {
            smoothProgress.set(0);
        }

        return () => unsubscribe();
    }, [smoothProgress, images, loading]);

    if (loading) {
        const progress = (loadedCount / TOTAL_FRAMES) * 100;
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forum-black">
                {/* Minimalist Gold Progress Bar */}
                <div className="w-64 h-0.5 bg-gray-900 overflow-hidden">
                    <div
                        className="h-full bg-forum-gold transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
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
