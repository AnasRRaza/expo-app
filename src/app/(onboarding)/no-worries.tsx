import { useTranslation } from 'react-i18next';

import AdvisorOffRamp from '@/components/advisor-off-ramp';
import { ONBOARDING_STEP } from '@/constants/onboarding';

export default function NoWorriesScreen() {
  const { t } = useTranslation();

  return (
    <AdvisorOffRamp
      step={ONBOARDING_STEP.noWorries}
      title={t('onboarding.noWorries.title')}
      subtitle={t('onboarding.noWorries.subtitle')}
    />
  );
}
