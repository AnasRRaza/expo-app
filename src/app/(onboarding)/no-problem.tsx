import { useTranslation } from 'react-i18next';

import AdvisorOffRamp from '@/components/advisor-off-ramp';
import { ONBOARDING_STEP } from '@/constants/onboarding';

export default function NoProblemScreen() {
  const { t } = useTranslation();

  return (
    <AdvisorOffRamp
      step={ONBOARDING_STEP.noProblem}
      title={t('onboarding.noProblem.title')}
      subtitle={t('onboarding.noProblem.subtitle')}
    />
  );
}
