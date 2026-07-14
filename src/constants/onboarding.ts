import type {
  Intention,
  OccupationType,
  ProfessionalStatus,
  SelfEmployedType,
  VatDeclaration,
} from '@/stores/use-auth-store';

// Signup + onboarding share one progress bar. The design shows 6 pill segments, but
// the natural-self-employment path is longer; StepProgress fills those 6 segments
// proportionally to step / ONBOARDING_TOTAL_STEPS. Each screen passes its step index.
export const ONBOARDING_TOTAL_STEPS = 11;

export const ONBOARDING_STEP = {
  signup: 1,
  fullName: 2,
  professionalStatus: 3,
  selfEmployedType: 4,
  occupationType: 5,
  businessDetails: 6,
  vatDeclaration: 7,
  profession: 8,
  selectPlan: 9,
  setPassword: 10,
  howDidYouFindUs: 11,
} as const;

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

// ── Natural Self-Employment (Path A) ──────────────────────────────────────────

export const OCCUPATION_TYPE_OPTIONS: Option<OccupationType>[] = [
  { value: 'secondary', labelKey: 'onboarding.occupationType.secondary' },
  { value: 'main', labelKey: 'onboarding.occupationType.main' },
  { value: 'student', labelKey: 'onboarding.occupationType.student' },
  { value: 'retired', labelKey: 'onboarding.occupationType.retired' },
];

export const VAT_DECLARATION_OPTIONS: Option<VatDeclaration>[] = [
  { value: 'quarterly', labelKey: 'onboarding.vatDeclaration.quarterly' },
  { value: 'monthly', labelKey: 'onboarding.vatDeclaration.monthly' },
  { value: 'small-business-exemption', labelKey: 'onboarding.vatDeclaration.smallBusiness' },
  { value: 'vat-exempt', labelKey: 'onboarding.vatDeclaration.vatExempt' },
];

// Static mock of the business a VAT lookup would return (no backend yet).
export const MOCK_BUSINESS = {
  name: 'Sky Industries',
  companyNumber: '2123124',
  address: '123 XYZ Street, Lorem ipsum',
} as const;

export type ReferralSource = 'recommended' | 'search' | 'social-media' | 'advertisement' | 'other';

export const REFERRAL_SOURCE_OPTIONS: { value: ReferralSource; labelKey: string }[] = [
  { value: 'recommended', labelKey: 'onboarding.howDidYouFindUs.sources.recommended' },
  { value: 'search', labelKey: 'onboarding.howDidYouFindUs.sources.search' },
  { value: 'social-media', labelKey: 'onboarding.howDidYouFindUs.sources.socialMedia' },
  { value: 'advertisement', labelKey: 'onboarding.howDidYouFindUs.sources.advertisement' },
  { value: 'other', labelKey: 'onboarding.howDidYouFindUs.sources.other' },
];

// Plans for the Select Plan screen. Price is display-only (no billing yet). The
// outlined name/price artwork is provided as SVGs, wired to each id in the screen.
export type PlanId = 'vat' | 'non-vat';

export const PLANS: {
  id: PlanId;
  chipKey: string;
  price: string;
  descriptionKey: string;
  badge: boolean;
}[] = [
  {
    id: 'vat',
    chipKey: 'onboarding.selectPlan.plans.vat.chip',
    price: '€35',
    descriptionKey: 'onboarding.selectPlan.plans.vat.description',
    badge: true,
  },
  {
    id: 'non-vat',
    chipKey: 'onboarding.selectPlan.plans.nonVat.chip',
    price: '€25',
    descriptionKey: 'onboarding.selectPlan.plans.nonVat.description',
    badge: false,
  },
];

// ── Profession dropdown ───────────────────────────────────────────────────────
// Categorized list. Flattened (via professionDropdownData) into DropdownItem[] with
// non-selectable header rows for the category titles.

type ProfessionGroup = {
  code: string;
  titleKey: string;
  items: { value: string; labelKey: string }[];
};

export const PROFESSION_GROUPS: ProfessionGroup[] = [
  {
    code: 'A',
    titleKey: 'onboarding.profession.groups.agriculture.title',
    items: [
      { value: 'crop-animal', labelKey: 'onboarding.profession.groups.agriculture.cropAnimal' },
      { value: 'forestry', labelKey: 'onboarding.profession.groups.agriculture.forestry' },
      { value: 'fishing', labelKey: 'onboarding.profession.groups.agriculture.fishing' },
    ],
  },
  {
    code: 'C',
    titleKey: 'onboarding.profession.groups.manufacturing.title',
    items: [
      { value: 'food-beverage', labelKey: 'onboarding.profession.groups.manufacturing.food' },
      { value: 'textiles', labelKey: 'onboarding.profession.groups.manufacturing.textiles' },
      { value: 'machinery', labelKey: 'onboarding.profession.groups.manufacturing.machinery' },
      { value: 'chemical', labelKey: 'onboarding.profession.groups.manufacturing.chemical' },
    ],
  },
  {
    code: 'F',
    titleKey: 'onboarding.profession.groups.construction.title',
    items: [
      { value: 'building', labelKey: 'onboarding.profession.groups.construction.building' },
      { value: 'electrical', labelKey: 'onboarding.profession.groups.construction.electrical' },
      { value: 'civil', labelKey: 'onboarding.profession.groups.construction.civil' },
    ],
  },
  {
    code: 'G',
    titleKey: 'onboarding.profession.groups.trade.title',
    items: [
      { value: 'retail', labelKey: 'onboarding.profession.groups.trade.retail' },
      { value: 'wholesale', labelKey: 'onboarding.profession.groups.trade.wholesale' },
      { value: 'motor', labelKey: 'onboarding.profession.groups.trade.motor' },
    ],
  },
  {
    code: 'H',
    titleKey: 'onboarding.profession.groups.transport.title',
    items: [
      { value: 'freight', labelKey: 'onboarding.profession.groups.transport.freight' },
      { value: 'passenger', labelKey: 'onboarding.profession.groups.transport.passenger' },
      { value: 'warehousing', labelKey: 'onboarding.profession.groups.transport.warehousing' },
    ],
  },
  {
    code: 'J',
    titleKey: 'onboarding.profession.groups.info.title',
    items: [
      { value: 'software', labelKey: 'onboarding.profession.groups.info.software' },
      { value: 'telecom', labelKey: 'onboarding.profession.groups.info.telecom' },
      { value: 'media', labelKey: 'onboarding.profession.groups.info.media' },
    ],
  },
  {
    code: 'K',
    titleKey: 'onboarding.profession.groups.finance.title',
    items: [
      { value: 'accounting', labelKey: 'onboarding.profession.groups.finance.accounting' },
      { value: 'consulting', labelKey: 'onboarding.profession.groups.finance.consulting' },
      { value: 'insurance', labelKey: 'onboarding.profession.groups.finance.insurance' },
    ],
  },
];
