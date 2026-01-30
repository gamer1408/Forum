"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

const ENTRANCE_FRAMES = 40;
const STAIRS_FRAMES = 32;
const SECOND_FLOOR_FRAMES = 24;
const TOTAL_FRAMES = ENTRANCE_FRAMES + STAIRS_FRAMES + SECOND_FLOOR_FRAMES; // 96

export default function ForumScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();

    // Adjusted damping to 40 for heavier feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 40,
        restDelta: 0.001,
    });

    const getFrameData = (index: number) => {
        let folder = "";
        let localIndex = 0;

        if (index < ENTRANCE_FRAMES) {
            folder = "entrance";
            localIndex = index + 1;
        } else if (index < ENTRANCE_FRAMES + STAIRS_FRAMES) {
            folder = "stairs";
            localIndex = index - ENTRANCE_FRAMES + 1;
        } else {
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
                count++; // Proceed anyway
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
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx || images.length !== TOTAL_FRAMES) return;

            // Enable High Quality Scaling
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(latest * TOTAL_FRAMES)
            );

            const img = images[frameIndex];
            if (img && img.complete && img.naturalWidth > 0) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }
        });

        if (!loading && images.length > 0) {
            smoothProgress.set(0);
        }

        return () => unsubscribe();
    }, [smoothProgress, images, loading]);

    if (loading) {
        const progress = (loadedCount / TOTAL_FRAMES) * 100;
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forum-black">
                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-forum-gold transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-4 text-forum-gold font-serif text-sm tracking-widest">
                    LOADING EXPERIENCE
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
