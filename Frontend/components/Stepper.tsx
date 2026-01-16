import { cn } from "@/lib/utils";

interface StepperProps {
    totalSteps: number;
    currentStep: number;
}

export function Stepper({ totalSteps, currentStep }: StepperProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-2 mb-8">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Step {currentStep} of {totalSteps}
            </div>
            <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => {
                    const stepNum = i + 1;
                    const isActive = stepNum === currentStep;
                    const isCompleted = stepNum < currentStep;

                    return (
                        <div
                            key={i}
                            className={cn(
                                "h-2 rounded-full transition-all duration-500",
                                isActive ? "w-8 bg-primary shadow-lg shadow-primary/30" :
                                    isCompleted ? "w-2 bg-primary/40" : "w-2 bg-gray-200 dark:bg-gray-700"
                            )}
                        />
                    )
                })}
            </div>
        </div>
    );
}
