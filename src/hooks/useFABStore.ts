import { create } from 'zustand';

interface FABState {
    hasInteracted: boolean;
    setHasInteracted: (value: boolean) => void;
}

export const useFABStore = create<FABState>()(
    (set) => ({
        hasInteracted: false,
        setHasInteracted: (value) => set({ hasInteracted: value }),
    })
);
