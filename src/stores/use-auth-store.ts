import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Session = {
  userId: string;
  token: string;
};

type AuthState = {
  session: Session | null;
  onboardingComplete: boolean;
  hasHydrated: boolean;
  setSession: (session: Session | null) => void;
  completeOnboarding: () => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      onboardingComplete: false,
      hasHydrated: false,
      setSession: (session) => set({ session }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      signOut: () => set({ session: null, onboardingComplete: false }),
    }),
    {
      name: 'sendelia-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Rehydration is triggered manually from a useEffect in the root layout (see
      // `useAuthStore.persist.rehydrate()`), not automatically on store creation. Expo Router's
      // static web export renders this module on Node during prerendering, and AsyncStorage's
      // web implementation touches `window.localStorage` — automatic rehydration would crash
      // with "window is not defined" there. useEffect never runs during that prerender pass.
      skipHydration: true,
      partialize: (state) => ({
        session: state.session,
        onboardingComplete: state.onboardingComplete,
      }),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
    },
  ),
);
