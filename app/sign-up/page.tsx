'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/auth-store';

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate reg
        setTimeout(() => {
            login('Rajesh Kumar', '9876543210');
            router.push('/get-started');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-glass border border-white/20 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <UserPlus className="text-white dark:text-gray-900 w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Join 50k+ gig workers getting loans</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                            <input
                                required
                                type="text"
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                            <input
                                required
                                type="text"
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mobile Number</label>
                        <input
                            required
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Create Password</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" required id="terms" className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" />
                        <label htmlFor="terms" className="text-xs text-gray-500">I agree to the <a href="#" className="underline">Terms</a> & <a href="#" className="underline">Privacy Policy</a></label>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold shadow-lg mt-2 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>Get Started <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-500">
                    Already have an account? <Link href="/sign-in" className="text-primary font-bold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
