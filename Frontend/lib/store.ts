import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Pillar {
    score: number;
    points: number;
    max: number;
}

interface OnboardingData {
    step: number;
    step1?: any;
    step2?: any;
    step3?: any;
    step4?: any;
    step5?: any;
    score?: number;
    creditGrade?: string;
    results?: any;
}

interface ScoreState {
    pillars: {
        upi: Pillar;
        bills: Pillar;
        job: Pillar;
        social: Pillar;
        finance: Pillar;
        identity: Pillar;
    };
    total: number;
    grade: string;
    eligibleAmount: number;
    emi: number;
    setScore: (scoreData: Partial<ScoreState>) => void;
    reset: () => void;
}

const initialPillars = {
    upi: { score: 91, points: 332, max: 350 },
    bills: { score: 100, points: 200, max: 200 },
    job: { score: 73, points: 110, max: 150 },
    social: { score: 80, points: 80, max: 100 },
    finance: { score: 70, points: 70, max: 100 },
    identity: { score: 100, points: 100, max: 100 },
};

export const useScoreStore = create<ScoreState>((set) => ({
    pillars: initialPillars,
    total: 821,
    grade: 'A',
    eligibleAmount: 50000,
    emi: 4583,
    setScore: (scoreData) => set((state) => ({ ...state, ...scoreData })),
    reset: () => set({
        pillars: initialPillars,
        total: 821,
        grade: 'A',
        eligibleAmount: 50000,
        emi: 4583,
    }),
}));

interface StoreState {
    onboarding: OnboardingData;
    onboardingData: OnboardingData;
    currentStep: number;
    userId: string | null;
    setCurrentStep: (step: number) => void;
    setOnboardingData: (data: Partial<OnboardingData>) => void;
    setUserId: (userId: string | null) => void;
    resetOnboarding: () => void;
}

const initialOnboarding: OnboardingData = {
    step: 1,
};

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            onboarding: initialOnboarding,
            onboardingData: initialOnboarding, // Actual state property
            userId: null,
            get currentStep() { return get().onboardingData.step; },
            setCurrentStep: (step) => set((state) => ({
                onboardingData: { ...state.onboardingData, step }
            })),
            setOnboardingData: (data) => {
                set((state) => {
                    const updated = { ...state.onboardingData, ...data };
                    return { onboardingData: updated };
                });
            },
            setUserId: (userId) => set({ userId }),
            resetOnboarding: () => set({ 
                onboardingData: initialOnboarding,
                onboarding: initialOnboarding 
            }),
        }),
        {
            name: 'fintech-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
