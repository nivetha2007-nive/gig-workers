import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PillarCardProps {
    icon: React.ReactNode;
    title: string;
    score: number;
    points: string;
    weight: string;
    boosts: string[];
    color?: string; // e.g., 'text-primary'
}

export function PillarCard({ icon, title, score, points, weight, boosts, color = "text-primary" }: PillarCardProps) {
    // Helper to map text color to bg color roughly
    const bgClass = color.includes('primary') ? 'bg-primary/10' :
        color.includes('success') ? 'bg-success/10' :
            color.includes('warning') ? 'bg-warning/10' :
                color.includes('error') ? 'bg-error/10' : 'bg-gray-100';

    const barClass = color.includes('primary') ? 'bg-primary' :
        color.includes('success') ? 'bg-success' :
            color.includes('warning') ? 'bg-warning' :
                color.includes('error') ? 'bg-error' : 'bg-gray-500';

    return (
        <div className="min-w-[280px] p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-glass border border-gray-100 dark:border-gray-700 flex flex-col gap-4 snap-center hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-xl", bgClass)}>
                    <div className={cn("w-6 h-6", color)}>{icon}</div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold dark:text-white">{score}%</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{points}</span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg dark:text-white">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Weight: {weight}</p>
            </div>

            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                    className={cn("h-2 rounded-full transition-all duration-1000 ease-out", barClass)}
                    style={{ width: `${score}%` }}
                />
            </div>

            <div className="space-y-2 mt-1">
                {boosts.map((boost, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <ArrowUp className="w-3 h-3 text-success mt-0.5 shrink-0" />
                        <span>{boost}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
