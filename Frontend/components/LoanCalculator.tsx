'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';


interface LoanCalculatorProps {
    maxAmount?: number;
    minAmount?: number;
    rate: number; // annual rate in %
}

export function LoanCalculator({ maxAmount = 100000, minAmount = 10000, rate = 12 }: LoanCalculatorProps) {
    const [amount, setAmount] = useState(50000);
    const [tenure, setTenure] = useState(12);
    const [emi, setEmi] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);

    useEffect(() => {
        // EMI Calculation
        // P = amount
        // R = rate / 12 / 100
        // N = tenure
        const r = rate / 12 / 100;
        const n = tenure;
        const emiValue = amount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
        const total = emiValue * n;

        setEmi(Math.round(emiValue));
        setTotalPayable(Math.round(total));
    }, [amount, tenure, rate]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-glass border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 rounded-lg text-primary">⚡</span>
                Loan Calculator
            </h3>

            {/* Amount Slider */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">I want to borrow</span>
                    <div className="flex items-start">
                        <span className="text-gray-400 mt-1 mr-1">₹</span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {amount.toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>
                <input
                    type="range"
                    min={minAmount}
                    max={maxAmount}
                    step={5000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>₹{minAmount / 1000}k</span>
                    <span>₹{maxAmount / 1000}k</span>
                </div>
            </div>

            {/* Tenure Selection */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Duration</span>
                    <div className="flex gap-2">
                        {[6, 12, 24].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTenure(t)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                                    tenure === t
                                        ? "bg-primary text-white shadow-md shadow-primary/30 transform scale-105"
                                        : "bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600"
                                )}
                            >
                                {t} mo
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-xl flex items-center justify-between border border-yellow-100 dark:border-yellow-900/30">
                    <span className="text-xs font-medium text-yellow-800 dark:text-yellow-500">Interest Rate</span>
                    <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">{rate}% p.a. (Grade A)</span>
                </div>
            </div>

            {/* Result Section */}
            <div className="bg-slate-900 dark:bg-black rounded-xl p-5 text-white">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                    <div>
                        <p className="text-white/60 text-xs mb-1">Monthly EMI</p>
                        <p className="text-2xl font-bold">₹{emi.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold">
                        INSTANT
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Total Repayment</span>
                    <span className="font-semibold">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
    );
}
