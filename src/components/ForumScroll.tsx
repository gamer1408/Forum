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
                console.warn(`Frame missing or broken: ${img.src}`);
                setLoadedCount(prev => prev + 1);
                // Do not block loading, just skip
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

            // Device Pixel Ratio for Retina Displays
            const dpr = window.devicePixelRatio || 1;

            const width = window.innerWidth;
            const height = window.innerHeight;

            // Resize logic using physical pixels
            if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr); // Scale context to match
            }

            // Ensure style matches window size
            if (canvas.style.width !== `${width}px` || canvas.style.height !== `${height}px`) {
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
            }

            // Force High Quality Smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Clamp frame index
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(latest * TOTAL_FRAMES)
            );

            const img = images[frameIndex];
            // Check naturalWidth to avoid drawing broken images
            if (img && img.complete && img.naturalWidth > 0) {
                // "Cover" logic (using logical width/height)
                const hRatio = width / img.width;
                const vRatio = height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (width - img.width * ratio) / 2;
                const centerShift_y = (height - img.height * ratio) / 2;

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
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

        return () => unsubscribe();
    }, [smoothProgress, images, loading]);

    if (loading) {
        const progress = (loadedCount / TOTAL_FRAMES) * 100;
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forum-black">
                <div className="w-64 h-0.5 bg-gray-900 overflow-hidden relative">
                    <div
                        className="absolute top-0 left-0 h-full bg-forum-gold transition-all duration-200 ease-out"
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
