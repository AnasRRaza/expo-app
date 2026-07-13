import { StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';

import { useTheme } from '@/hooks/use-theme';

interface StepProgressProps {
  /** 1-indexed current step. */
  step: number;
  totalSteps: number;
}

// The active segment shows a small leading fill (matches the design's partially
// filled current step), completed segments are full, upcoming ones empty.
const ACTIVE_SEGMENT_FILL = 0.15;

function segmentProgress(segment: number, step: number): number {
  if (segment < step) return 1;
  if (segment === step) return ACTIVE_SEGMENT_FILL;
  return 0;
}

export default function StepProgress({ step, totalSteps }: StepProgressProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={[styles.segment, { backgroundColor: theme.backgroundSelected }]}>
          <ProgressBar
            progress={segmentProgress(index + 1, step)}
            color={theme.primary}
            style={styles.bar}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: s(8),
  },
  segment: {
    flex: 1,
    height: vs(5),
    borderRadius: vs(3),
    overflow: 'hidden',
  },
  // Paper's ProgressBar paints its own track; make it transparent so the
  // segment wrapper's rounded track colour shows through and only the fill draws.
  bar: {
    height: '100%',
    backgroundColor: 'transparent',
  },
});
