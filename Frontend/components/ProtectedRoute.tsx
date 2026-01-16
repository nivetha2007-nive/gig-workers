'use client';

import { useAuthStore } from '@/lib/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Wait for hydration if using persist
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (isReady && !isLoggedIn) {
            // Define public routes
            const publicRoutes = ['/', '/sign-in', '/sign-up'];
            if (!publicRoutes.includes(pathname)) {
                router.push('/sign-in');
            }
        }
    }, [isLoggedIn, isReady, pathname, router]);

    // Prevent flash of content during redirect
    if (isReady && !isLoggedIn) {
        const publicRoutes = ['/', '/sign-in', '/sign-up'];
        if (!publicRoutes.includes(pathname)) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
            );
        }
    }

    return <>{children}</>;
}
