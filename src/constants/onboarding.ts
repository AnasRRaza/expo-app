import type { Intention, ProfessionalStatus, SelfEmployedType } from '@/stores/use-auth-store';

// Signup + onboarding share one progress bar. The design shows 6 segments; more
// onboarding steps follow the currently-designed screens (see next-steps.tsx).
export const ONBOARDING_TOTAL_STEPS = 6;

type Option<T> = {
  value: T;
  /** i18n key for the option label. */
  labelKey: string;
};

export const PROFESSIONAL_STATUS_OPTIONS: Option<ProfessionalStatus>[] = [
  { value: 'yes', labelKey: 'onboarding.professionalStatus.yes' },
  { value: 'no', labelKey: 'onboarding.professionalStatus.no' },
  { value: 'dont-know', labelKey: 'onboarding.professionalStatus.dontKnow' },
];

export const SELF_EMPLOYED_TYPE_OPTIONS: Option<SelfEmployedType>[] = [
  { value: 'natural-person', labelKey: 'onboarding.selfEmployed.naturalPerson' },
  { value: 'company-director', labelKey: 'onboarding.selfEmployed.companyDirector' },
];

export const INTENTION_OPTIONS: Option<Intention>[] = [
  { value: 'want-to', labelKey: 'onboarding.intentions.wantTo' },
  { value: 'dont-plan', labelKey: 'onboarding.intentions.dontPlan' },
  { value: 'not-sure', labelKey: 'onboarding.intentions.notSure' },
];
