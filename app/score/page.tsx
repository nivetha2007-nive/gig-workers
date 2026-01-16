'use client';

import { useScoreStore } from '@/lib/store';
import { ScoreCircle } from '@/Frontend/components/ScoreCircle';
import { PillarCard } from '@/Frontend/components/PillarCard';
import { Share2, RefreshCw, ChevronLeft, ArrowRight, Zap, FileText, Briefcase, Users, Activity, Lock, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { useAuthStore } from '@/lib/auth-store';

export default function ScoreDashboard() {
    const { pillars, total, grade, eligibleAmount } = useScoreStore();
    const user = useAuthStore((state) => state.user);

    const userName = user?.name || 'Rajesh Kumar';
    const handleShare = () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({
                title: 'My GigCredit Score',
                text: `I scored ${total} on GigCredit AI! Check my eligibility.`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert('Share functionality not available on this device.');
        }
    }

    const pillarsList = [
        { key: 'upi' as const, icon: <Zap />, title: 'UPI Behavior', color: 'text-indigo-500', boosts: ['Consistent income +140', 'Perfect discipline +70'] },
        { key: 'bills' as const, icon: <FileText />, title: 'Bills Utility', color: 'text-emerald-500', boosts: ['All bills paid on time'] },
        { key: 'job' as const, icon: <Briefcase />, title: 'Employment', color: 'text-blue-500', boosts: ['Stable gig work > 6 mos'] },
        { key: 'social' as const, icon: <Users />, title: 'Social', color: 'text-pink-500', boosts: ['Verified contacts'] },
        { key: 'finance' as const, icon: <Activity />, title: 'Finance', color: 'text-amber-500', boosts: ['Good savings ratio'] },
        { key: 'identity' as const, icon: <Lock />, title: 'Identity', color: 'text-purple-500', boosts: ['Fully KYC verified'] },
    ];

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24">
            {/* Header */}
            <header className="px-4 py-4 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-slate-900/50">
                <Link href="/" className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Back</span>
                </Link>
                <h1 className="font-bold text-gray-900 dark:text-white">{userName}</h1>
                <button className="flex items-center gap-1 text-primary text-sm font-medium bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Refresh</span>
                </button>
            </header>

            <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
                {/* Score Section */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-glass text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

                    <ScoreCircle score={total} max={900} grade={grade} />

                    <div className="mt-2 mb-6">
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Eligible Amount</p>
                        <p className="text-4xl font-extrabold text-gray-900 dark:text-white my-2 tracking-tight">₹{(eligibleAmount).toLocaleString('en-IN')}</p>
                        <p className="text-xs text-primary font-bold bg-primary/10 inline-block px-3 py-1 rounded-full border border-primary/20">@ 12% Interest p.a.</p>
                    </div>

                    <div className="flex gap-4 justify-center items-center">
                        <Link href="/loan" className="w-full max-w-xs">
                            <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Apply for ₹50K Loan
                            </button>
                        </Link>
                        <button onClick={handleShare} className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-2xl hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors">
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Pillars Scroll */}
                <div>
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Score Breakdown</h3>
                        <span className="text-xs text-gray-500 font-medium">Swipe to see all →</span>
                    </div>
                    <div className="flex overflow-x-auto gap-4 pb-6 px-2 -mx-2 hide-scrollbar snap-x snap-mandatory">
                        {pillarsList.map((p) => {
                            const data = pillars[p.key];
                            return (
                                <PillarCard
                                    key={p.key}
                                    icon={p.icon}
                                    title={p.title}
                                    score={data.score}
                                    points={`${data.points}/${data.max}`}
                                    weight="35%"
                                    boosts={p.boosts}
                                    color={p.color}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-lg mb-4 dark:text-white">Detailed Report</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left dark:text-gray-300">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Pillar</th>
                                    <th className="px-4 py-3">Score</th>
                                    <th className="px-4 py-3">Weight</th>
                                    <th className="px-4 py-3 rounded-r-lg">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {pillarsList.map((p) => {
                                    const data = pillars[p.key];
                                    return (
                                        <tr key={p.key}>
                                            <td className="px-4 py-3 font-medium flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full hidden sm:block", p.color.replace('text-', 'bg-'))} />
                                                {p.title}
                                            </td>
                                            <td className="px-4 py-3 font-bold">{data.score}%</td>
                                            <td className="px-4 py-3 text-gray-500">15%</td>
                                            <td className="px-4 py-3">{data.points}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Factors & Improvment */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg mb-4 dark:text-white">What Boosted Your Score</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2 text-sm dark:text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                                <span>Perfect bill payments <span className="font-bold text-success">+65 pts</span></span>
                            </div>
                            <div className="flex items-start gap-2 text-sm dark:text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                                <span>Stable Rapido income <span className="font-bold text-success">+55 pts</span></span>
                            </div>
                            <div className="flex items-start gap-2 text-sm dark:text-gray-300">
                                <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
                                <span>New credit account <span className="font-bold text-error">-15 pts</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 to-primary rounded-3xl p-6 text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Improvement Plan
                        </h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                <span>1. Wait 4 months</span>
                                <span className="font-bold text-green-300">+10 pts</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                <span>2. Save 20% monthly</span>
                                <span className="font-bold text-green-300">+15 pts</span>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
                            <p className="text-sm opacity-80 mb-1">Potential Score</p>
                            <p className="text-3xl font-bold flex items-center justify-center gap-3">
                                821
                                <ArrowRight className="w-5 h-5 text-white/50" />
                                844
                            </p>
                            <p className="text-xs opacity-60 mt-1 uppercase tracking-widest">in 6 months 🎯</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
