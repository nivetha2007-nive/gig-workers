'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

interface ScoreCircleProps {
    score: number;
    max: number;
    grade: string;
}

export function ScoreCircle({ score, max, grade }: ScoreCircleProps) {
    const percentage = (score / max) * 100;
    const circumference = 2 * Math.PI * 120; // radius 120
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        // Number animation
        const duration = 2000;
        const steps = 60;
        const increment = score / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= score) {
                setDisplayScore(score);
                clearInterval(timer);
            } else {
                setDisplayScore(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [score]);

    return (
        <div className="relative flex flex-col items-center justify-center py-8">
            <div className="relative w-64 h-64">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-800"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className={cn(
                            "text-primary",
                            grade === 'A' && "text-primary",
                            grade === 'B' && "text-success", // Example logic
                            grade === 'C' && "text-warning",
                            grade === 'D' && "text-error"
                        )}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Credit Score</span>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        {displayScore}
                    </motion.div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                        out of {max}
                    </div>
                    {grade && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="mt-2 flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold"
                        >
                            <Trophy className="w-3 h-3" />
                            GRADE {grade}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
