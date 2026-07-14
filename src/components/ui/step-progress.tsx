import { StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';

import { useTheme } from '@/hooks/use-theme';

interface StepProgressProps {
  /** 1-indexed current step. */
  step: number;
  totalSteps: number;
  /** Number of visible pill segments (design shows 6, independent of the step count). */
  segments?: number;
}

const DEFAULT_SEGMENTS = 6;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

// The onboarding flow has more steps than the design's 6 pills, so we render a
// fixed number of segments and fill them proportionally to the overall progress
// (step / totalSteps). This advances on every screen while keeping the 6-pill look.
function segmentProgress(index: number, segments: number, overall: number): number {
  const segStart = index / segments;
  return clamp01((overall - segStart) * segments);
}

export default function StepProgress({
  step,
  totalSteps,
  segments = DEFAULT_SEGMENTS,
}: StepProgressProps) {
  const theme = useTheme();
  const overall = totalSteps > 0 ? clamp01(step / totalSteps) : 0;

  return (
    <View style={styles.row}>
      {Array.from({ length: segments }, (_, index) => (
        <View key={index} style={[styles.segment, { backgroundColor: theme.backgroundSelected }]}>
          <ProgressBar
            progress={segmentProgress(index, segments, overall)}
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
