import { useTranslation } from 'react-i18next';

import BusinessDetailsForm from '@/components/business-details-form';
import { ONBOARDING_STEP } from '@/constants/onboarding';

export default function CompanyDetailsScreen() {
  const { t } = useTranslation();

  return (
    <BusinessDetailsForm
      step={ONBOARDING_STEP.companyDetails}
      title={t('onboarding.companyEmployment.title')}
      subtitle={t('onboarding.companyEmployment.detailsSubtitle')}
      nextRoute="/select-plan"
    />
  );
}
