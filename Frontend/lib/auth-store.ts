import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    user: {
        name: string;
        mobile: string;
        type: string;
    } | null;
    login: (name: string, mobile: string) => void;
    logout: () => void;
    setUser: (user: { name: string; mobile: string; type: string } | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            login: (name, mobile) => set({
                isLoggedIn: true,
                user: { name, mobile, type: 'Gig Worker' }
            }),
            logout: () => set({ isLoggedIn: false, user: null }),
            setUser: (user) => set({ user, isLoggedIn: !!user }),
        }),
        {
            name: 'gig-credit-auth',
        }
    )
);
