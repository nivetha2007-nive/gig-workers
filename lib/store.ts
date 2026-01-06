import { create } from 'zustand';

interface Pillar {
    score: number;
    points: number;
    max: number;
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
