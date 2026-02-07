import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FABState {
    hasInteracted: boolean;
    setHasInteracted: (value: boolean) => void;
}

export const useFABStore = create<FABState>()(
    persist(
        (set) => ({
            hasInteracted: false,
            setHasInteracted: (value) => set({ hasInteracted: value }),
        }),
        {
            name: 'fab-storage', // Nombre único para el localStorage
        }
    )
);
