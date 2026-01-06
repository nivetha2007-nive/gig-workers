'use client';

import { useScoreStore } from '@/lib/store';
import {
    Zap,
    Target,
    Crown,
    ArrowRight,
    Gift,
    ShieldCheck,
    Rocket,
    Flame,
    LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function UserDashboard() {
    const { total, grade } = useScoreStore();

    const perks = [
        { title: "0% Downpayment", provider: "TVS Motor", icon: Rocket, color: "text-blue-500", bg: "bg-blue-50" },
        { title: "Instant ₹10K Limit", provider: "LazyPay", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
        { title: "Free Health Cover", provider: "Digit", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
    ];

    const growthSteps = [
        { title: "Connect Zomato API", reward: "+25 pts", status: "Available" },
        { title: "Maintain ₹5K Balance", reward: "+15 pts", status: "In Progress" },
        { title: "Pay Electricity Bill", reward: "+10 pts", status: "Available" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
            {/* Minimal Header */}
            <header className="px-6 py-6 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <Crown className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-black text-xl text-gray-900 dark:text-white">GIG IDENTITY</h1>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest -mt-1">Verified Partner</p>
                    </div>
                </div>
                <button className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-gray-200 transition-colors">
                    <LayoutDashboard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
            </header>

            <div className="p-6 space-y-8 max-w-2xl mx-auto">

                {/* Visual Identity Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group cursor-pointer"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-white/50 dark:border-gray-800 flex flex-col items-center text-center overflow-hidden">

                        <div className="absolute top-0 right-0 p-4">
                            <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black text-primary border border-primary/20">
                                UNIQUE CIBIL CODE: GC-{total}-{grade}
                            </div>
                        </div>

                        <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-full flex items-center justify-center shadow-inner mb-6 relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                            />
                            <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-indigo-600">{total}</span>
                        </div>

                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Financial Potential</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Your gig worker identity is elite</p>

                        <div className="flex gap-3">
                            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 text-xs font-bold flex items-center gap-2">
                                <Flame className="w-4 h-4" /> Grade {grade}
                            </div>
                            <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 text-xs font-bold flex items-center gap-2">
                                <Target className="w-4 h-4" /> Top 5%
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Growth Roadmap */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black text-lg text-gray-900 dark:text-white">Score Boosters</h3>
                        <span className="text-xs font-bold text-primary">View All</span>
                    </div>
                    <div className="space-y-3">
                        {growthSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group hover:border-primary/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                        <Rocket className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900 dark:text-white">{step.title}</p>
                                        <p className="text-[10px] text-gray-500">{step.status}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg">{step.reward}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Exclusive Perks */}
                <section>
                    <h3 className="font-black text-lg text-gray-900 dark:text-white mb-4">Master Perks</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {perks.map((perk, i) => (
                            <div
                                key={i}
                                className="p-5 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all"
                            >
                                <div className={`w-14 h-14 ${perk.bg} rounded-2xl flex items-center justify-center ${perk.color}`}>
                                    <perk.icon className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black text-gray-900 dark:text-white">{perk.title}</h4>
                                    <p className="text-xs text-gray-500 font-medium">via {perk.provider}</p>
                                </div>
                                <button className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/loan" className="w-full">
                        <button className="w-full bg-primary text-white p-5 rounded-3xl font-black shadow-lg shadow-primary/30 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
                            <Zap className="w-6 h-6" />
                            <span className="text-sm">Get Finance</span>
                        </button>
                    </Link>
                    <button className="w-full bg-white dark:bg-slate-900 p-5 rounded-3xl font-black border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                        <Gift className="w-6 h-6 text-pink-500" />
                        <span className="text-sm">Refer & Earn</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
