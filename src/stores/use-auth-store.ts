import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Session = {
  userId: string;
  token: string;
};

export type ProfessionalStatus = 'yes' | 'no' | 'dont-know';
export type SelfEmployedType = 'natural-person' | 'company-director';
export type Intention = 'want-to' | 'dont-plan' | 'not-sure';
export type OccupationType = 'secondary' | 'main' | 'student' | 'retired';
export type VatDeclaration = 'quarterly' | 'monthly' | 'small-business-exemption' | 'vat-exempt';
export type CompanyType = 'srl-bv' | 'sa-nv' | 'snc-vof' | 'asbl-vzw' | 'other';

type OnboardingData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  professionalStatus?: ProfessionalStatus;
  selfEmployedType?: SelfEmployedType;
  intention?: Intention;
  // Natural Self-Employment (Path A)
  occupationType?: OccupationType;
  business?: { confirmed?: boolean; vatNumber?: string };
  vatDeclaration?: VatDeclaration;
  profession?: string;
  professionCustom?: string;
  // Company Employment (Path B)
  companyType?: CompanyType;
  companyTypeOther?: string;
  companyName?: string;
  // Shared tail
  plan?: string;
  referralSource?: string;
  referrer?: string;
  // NOTE: the account password is intentionally never stored here (persisted to disk).
};

type AuthState = {
  session: Session | null;
  onboardingComplete: boolean;
  onboarding: OnboardingData;
  hasHydrated: boolean;
  setSession: (session: Session | null) => void;
  setOnboardingData: (partial: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      onboardingComplete: false,
      onboarding: {},
      hasHydrated: false,
      setSession: (session) => set({ session }),
      setOnboardingData: (partial) =>
        set((state) => ({ onboarding: { ...state.onboarding, ...partial } })),
      completeOnboarding: () => set({ onboardingComplete: true }),
      signOut: () => set({ session: null, onboardingComplete: false, onboarding: {} }),
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
        onboarding: state.onboarding,
      }),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
    },
  ),
);
