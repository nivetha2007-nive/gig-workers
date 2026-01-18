'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Celebration() {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

    useEffect(() => {
        // Generate random particles
        const colors = ["#0066FF", "#FF3366", "#00C2FF", "#FFBB33"];
        const newParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{
                        opacity: 1,
                        scale: 0,
                        x: "50vw", // Center start (approx for now, relative to parent)
                        y: "50vh",
                    }}
                    animate={{
                        opacity: 0,
                        scale: Math.random() * 1.5 + 0.5,
                        x: `${p.x}vw`,
                        y: `${p.y}vh`,
                        rotate: Math.random() * 360,
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: Math.random() * 0.2, // Burst effect
                    }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{ backgroundColor: p.color, left: 0, top: 0 }}
                />
            ))}
        </div>
    );
}
