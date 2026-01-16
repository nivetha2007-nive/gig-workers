'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, User, Smartphone, Fingerprint, CreditCard, Briefcase, Rocket, Check, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FileUploadZone } from '@/Frontend/components/FileUploadZone';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const handleStepComplete = () => {
        // Mark current step as completed
        setCompletedSteps(prev => [...prev, currentStep]);

        // Show success animation
        setShowSuccess(true);

        // Wait for animation, then move to next step
        setTimeout(() => {
            setShowSuccess(false);

            if (currentStep < 5) {
                setCurrentStep(c => c + 1);
                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Final step - redirect to score
                router.push('/score');
            }
        }, 1500);
    };

    const steps = [
        { id: 1, title: "Basic Information", icon: User, Content: Step1BasicInfo, summary: "Name & Mobile Verified" },
        { id: 2, title: "Identity Verification", icon: Fingerprint, Content: Step2Identity, summary: "Aadhaar & PAN Verified" },
        { id: 3, title: "Financial Data", icon: CreditCard, Content: Step3Financial, summary: "Bank Statement Uploaded" },
        { id: 4, title: "Gig Work Proof", icon: Briefcase, Content: Step4Employment, summary: "Platform Proof Uploaded" },
        { id: 5, title: "Boosters & Score", icon: Rocket, Content: Step5Boosters, summary: "Ready for calculation" },
    ];

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center p-6 md:p-12 relative">
            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-20 h-20 bg-success rounded-full flex items-center justify-center"
                            >
                                <Check className="w-10 h-10 text-white" strokeWidth={3} />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Step {currentStep} Complete!</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-center">{steps[currentStep - 1].summary}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full max-w-2xl">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="font-bold text-2xl text-gray-900 dark:text-white">Get Started</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 font-medium">Step {currentStep} of 5</span>
                        <div className="flex gap-1">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300",
                                        completedSteps.includes(step.id) ? "bg-success w-3" :
                                            step.id === currentStep ? "bg-primary w-4" :
                                                "bg-gray-200 dark:bg-gray-700"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </header>

                <div className="space-y-6">
                    {steps.map((step) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = completedSteps.includes(step.id);
                        const isLocked = currentStep < step.id;

                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    "bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border transition-all duration-500",
                                    isActive ? "ring-2 ring-primary border-transparent shadow-xl shadow-primary/10" : "border-gray-100 dark:border-gray-700",
                                    isLocked && "opacity-60 grayscale-[0.5]"
                                )}
                            >
                                {/* Step Header */}
                                <div
                                    className="p-4 flex items-center justify-between cursor-pointer"
                                    onClick={() => isCompleted && setCurrentStep(step.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
                                            isCompleted ? "bg-success text-white" : isActive ? "bg-primary text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-400"
                                        )}>
                                            {isCompleted ? <Check className="w-5 h-5" /> : (
                                                isActive ? <step.icon className="w-5 h-5" /> : <span className="font-bold">{step.id}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className={cn("font-bold text-lg", isLocked ? "text-gray-500" : "text-gray-900 dark:text-white")}>
                                                {step.title}
                                            </h3>
                                            {isCompleted && (
                                                <p className="text-xs text-success font-medium flex items-center gap-1">
                                                    {step.summary}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                                    {isActive && <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">IN PROGRESS</div>}
                                </div>

                                {/* Step Content Content */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700">
                                                <step.Content onNext={handleStepComplete} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

const step1Schema = z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().regex(/^[0-9]{10}$/, "Valid mobile number required")
});

function Step1BasicInfo({ onNext }: { onNext: () => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(step1Schema)
    });

    return (
        <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                        {...register('name')}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    {errors.name && <span className="text-error text-xs ml-1">{errors.name.message as string}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-gray-500 font-medium">+91</span>
                        <input
                            {...register('mobile')}
                            type="tel"
                            placeholder="98765 43210"
                            className="w-full p-4 pl-12 rounded-xl bg-gray-50 dark:bg-slate-700 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        <button type="button" className="absolute right-4 top-3 text-xs font-bold text-primary hover:text-indigo-700">
                            Send OTP
                        </button>
                    </div>
                    {errors.mobile && <span className="text-error text-xs ml-1">{errors.mobile.message as string}</span>}
                </div>
            </div>
            <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all text-sm uppercase tracking-wide">
                Continue
            </button>
        </form>
    )
}

function Step2Identity({ onNext }: { onNext: () => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aadhaar Number</label>
                    <div className="flex gap-2">
                        <input
                            placeholder="1234 5678 9012"
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 rounded-xl text-xs font-bold whitespace-nowrap">
                            Verify OTP
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PAN Number</label>
                    <input
                        placeholder="ABCDE1234F"
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-700 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
                <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selfie Verification</label>
                    <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <Camera className="w-5 h-5" />
                        Take Selfie
                    </button>
                </div>
            </div>
            <button onClick={onNext} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all text-sm uppercase tracking-wide">
                Continue
            </button>
        </div>
    )
}

function Step3Financial({ onNext }: { onNext: () => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-6">
                <div>
                    <p className="text-sm font-medium mb-3">Upload Bank Statement</p>
                    <FileUploadZone type="bank-statement" accept={{ 'application/pdf': ['.pdf'], 'text/csv': ['.csv'] }} cameraEnabled={true} />
                </div>

                <button className="w-full py-3 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-semibold border border-blue-100 dark:border-blue-900/30">
                    Connect Email for Auto-Bills
                </button>
            </div>
            <button onClick={onNext} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all text-sm uppercase tracking-wide">
                Continue
            </button>
        </div>
    )
}

function Step4Employment({ onNext }: { onNext: () => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-6">
                <p className="text-sm text-gray-500">Upload screenshot of your Rapido/Swiggy/Zomato earnings dashboard.</p>

                <FileUploadZone type="gig-dashboard" accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} cameraEnabled={true} />

                <div className="flex items-center gap-4 my-2">
                    <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
                </div>

                <button className="w-full py-3 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-600 flex items-center justify-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Connect Platform API
                </button>
            </div>
            <button onClick={onNext} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all text-sm uppercase tracking-wide">
                Continue
            </button>
        </div>
    )
}

function Step5Boosters({ onNext }: { onNext: () => void }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-3">
                {[
                    { icon: "📧", title: "Connect Email", desc: "Auto-verify bills", points: "+15 pts" },
                    { icon: "💼", title: "LinkedIn", desc: "Job verification", points: "+10 pts" },
                    { icon: "📈", title: "Investment App", desc: "Groww/Zerodha", points: "+20 pts" },
                    { icon: "📍", title: "Verify Location", desc: "Address stability", points: "+5 pts" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-transparent hover:border-primary/30 cursor-pointer transition-all">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                                <p className="font-semibold text-sm">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">{item.points}</span>
                    </div>
                ))}
            </div>
            <button onClick={onNext} className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                Calculate Score Now <Rocket className="w-4 h-4 fill-current" />
            </button>
        </div>
    )
}
