'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, TrendingUp, Zap, ArrowRight, Share2, Download, ShieldCheck, User as UserIcon, Smartphone, CreditCard, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScoreStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';

export default function LoanSuccess() {
    const router = useRouter();
    const [showConfetti, setShowConfetti] = useState(true);
    const [currentQuote, setCurrentQuote] = useState(0);
    const { total, grade, pillars } = useScoreStore();
    const user = useAuthStore((state) => state.user);

    const quotes = [
        "Every gig is a step towards financial freedom 🚀",
        "Your hustle deserves recognition, not rejection 💪",
        "Building credit, one delivery at a time 📦",
        "From the streets to success - your journey matters ⭐",
        "Gig workers are the backbone of India's economy 🇮🇳"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 4000);

        const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(confettiTimer);
        };
    }, []);

    const cibilId = `GC-${total}-${grade}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/30 to-indigo-500/30 rounded-full blur-3xl"
                />
            </div>

            {/* Confetti Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none z-50">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                    y: -20,
                                    rotate: 0,
                                    opacity: 1
                                }}
                                animate={{
                                    y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
                                    rotate: Math.random() * 360,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: Math.random() * 3 + 2,
                                    delay: Math.random() * 2,
                                    ease: "easeOut"
                                }}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-white/10 overflow-hidden relative z-10"
            >
                {/* Score Certificate Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center relative overflow-hidden">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-900 rounded-full mb-4 shadow-xl"
                    >
                        <CheckCircle2 className="w-12 h-12 text-indigo-600" strokeWidth={2.5} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight"
                    >
                        Success! Your CIBIL <br />Score is Live 🎯
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl py-3 px-6 inline-block border border-white/20 mt-4"
                    >
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Your Unique Credit ID</p>
                        <p className="text-2xl font-mono font-black text-white tracking-widest">{cibilId}</p>
                    </motion.div>

                    {/* Decorative Background Glows */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl" />
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    {/* Profile Preview Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-gray-100 dark:border-white/5"
                    >
                        <div className="flex items-center gap-5 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-tr from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <UserIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'Rajesh Kumar'}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter italic">Verified {user?.type || 'Gig Worker'}</span>
                                    <span className="flex items-center gap-1 text-[10px] text-success font-bold uppercase">
                                        <ShieldCheck className="w-3 h-3" /> Fully KYC'd
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-white/5 text-center">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2 text-blue-600">
                                    <Smartphone className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Mobile</p>
                                <p className="text-xs font-bold dark:text-gray-200">Verified</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-white/5 text-center">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2 text-purple-600">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Bank</p>
                                <p className="text-xs font-bold dark:text-gray-200">HDFC-4582</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-white/5 text-center">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-2 text-orange-600">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Proof</p>
                                <p className="text-xs font-bold dark:text-gray-200">Rapido Live</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-white/5 text-center">
                                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-2 text-emerald-600">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Score</p>
                                <p className="text-xs font-bold dark:text-gray-200">{total} ({grade})</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Loan Success Mini-Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-500/20 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Approved & Disbursed</p>
                            <h2 className="text-4xl font-black tracking-tight">₹50,000</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-indigo-100">Money arriving in 5 mins</span>
                            </div>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                    </motion.div>

                    {/* Quote Bubble */}
                    <motion.div
                        key={currentQuote}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl p-5 border-l-4 border-amber-500 flex gap-4 items-start"
                    >
                        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                        <p className="text-gray-700 dark:text-amber-100 text-sm font-medium italic leading-relaxed">
                            "{quotes[currentQuote]}"
                        </p>
                    </motion.div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/dashboard" className="col-span-2 md:col-span-1">
                            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center gap-2">
                                DASHBOARD
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 rounded-2xl font-bold border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-all">
                            <Share2 className="w-5 h-5" />
                            SHARE
                        </button>
                    </div>

                    <button className="w-full border-2 border-dashed border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all">
                        <Download className="w-5 h-5" />
                        DOWNLOAD CREDIT REPORT
                    </button>

                    <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest pt-4">
                        GigCredit AI • India's First Gig Worker Credit Bureau
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
