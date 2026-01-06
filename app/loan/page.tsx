'use client';
import { LoanCalculator } from '@/components/LoanCalculator';
import { ChevronLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoanApplication() {
    const router = useRouter();
    const [isSigning, setIsSigning] = useState(false);

    const handleESign = () => {
        setIsSigning(true);
        // Simulate eSign process
        setTimeout(() => {
            router.push('/loan/success');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-lg mb-8 flex items-center justify-between">
                <Link href="/score" className="text-gray-500 hover:text-primary transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold dark:text-white">Apply for Loan</h1>
                <div className="w-6" />
            </header>

            <div className="w-full max-w-lg space-y-6">
                <LoanCalculator maxAmount={100000} rate={12} />

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="font-bold text-2xl dark:text-white mb-2">Instantly Approved</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[250px] mx-auto">Based on your excellent GigCredit Score of 821 (Grade A).</p>

                    <div className="space-y-4 text-left mb-8">
                        <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Disburse to Account</p>
                                    <p className="font-semibold text-lg dark:text-white">HDFC Bank •••• 4582</p>
                                </div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png" alt="HDFC" className="h-4 object-contain opacity-70" />
                            </div>
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-2 font-medium">
                                <ShieldCheck className="w-3 h-3" /> Verified via Statement
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleESign}
                        disabled={isSigning}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSigning ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Signing...
                            </>
                        ) : (
                            <>
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" className="h-6 w-auto brightness-0 invert" alt="Aadhaar" />
                                eSign with Aadhaar
                            </>
                        )}
                    </button>
                    <p className="text-xs text-gray-400 mt-4 px-4 leading-relaxed">
                        By clicking eSign, you agree to the Loan Agreement and initiate the disbursement process. Money typically arrives in 5 mins.
                    </p>
                </div>
            </div>
        </div>
    )
}
