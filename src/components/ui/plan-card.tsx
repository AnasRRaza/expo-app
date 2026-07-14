import { StyleSheet, View } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import { Image, type ImageSource } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface PlanCardProps {
  chipLabel: string;
  name: string;
  nameImage?: ImageSource;
  price: string;
  priceImage?: ImageSource;
  period: string;
  exclVat: string;
  description: string;
  cta: string;
  badgeLabel?: string;
  onSelect: () => void;
}

// SVG artwork aspect ratios (viewBox w/h) — width is derived from a chosen height.
const NAME_HEIGHT = vs(24);
const NAME_WIDTH = NAME_HEIGHT * (76 / 17);
const PRICE_HEIGHT = vs(30);
const PRICE_WIDTH = PRICE_HEIGHT * (50 / 24);

export default function PlanCard({
  chipLabel,
  name,
  nameImage,
  price,
  priceImage,
  period,
  exclVat,
  description,
  cta,
  badgeLabel,
  onSelect,
}: PlanCardProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.inputBackground,
            borderColor: `${theme.primary}50`, // 50% opacity
            shadowColor: theme.primary,
          },
        ]}
      >
        <View style={[styles.chip, { backgroundColor: theme.optionSelectedBackground }]}>
          <ThemedText type="small" themeColor="primary" style={styles.chipText}>
            {chipLabel}
          </ThemedText>
        </View>

        <View style={styles.headerRow}>
          {nameImage ? (
            <Image source={nameImage} contentFit="contain" style={styles.nameImage} />
          ) : (
            <ThemedText themeColor="primary" style={styles.nameText}>
              {name}
            </ThemedText>
          )}

          <View style={styles.priceBlock}>
            <View style={styles.priceRow}>
              {priceImage ? (
                <Image source={priceImage} contentFit="contain" style={styles.priceImage} />
              ) : (
                <ThemedText themeColor="primary" style={styles.priceText}>
                  {price}
                </ThemedText>
              )}
              <ThemedText type="small" themeColor="textSecondary">
                {period}
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary" style={styles.exclVat}>
              {exclVat}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
          {description}
        </ThemedText>

        <Button
          mode="outlined"
          icon="chevron-right"
          contentStyle={styles.ctaContent}
          onPress={onSelect}
        >
          {cta}
        </Button>
      </View>

      {badgeLabel ? (
        <View style={styles.badgeContainer} pointerEvents="none">
          <View style={[styles.badge, { backgroundColor: theme.primary }]}>
            <ThemedText type="smallBold" style={styles.badgeText}>
              {badgeLabel}
            </ThemedText>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginTop: vs(14),
  },
  card: {
    borderWidth: 1,
    borderRadius: s(20),
    padding: s(18),
    gap: vs(14),
    // Green glow (iOS). Android colors elevation shadow gray — acceptable.
    shadowOpacity: 0.18,
    shadowRadius: s(12),
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: s(10),
    paddingVertical: vs(4),
    borderRadius: s(8),
  },
  chipText: {
    fontSize: ms(11),
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: s(12),
  },
  nameImage: {
    width: NAME_WIDTH,
    height: NAME_HEIGHT,
  },
  nameText: {
    fontSize: ms(24),
    fontWeight: '800',
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: s(3),
  },
  priceImage: {
    width: PRICE_WIDTH,
    height: PRICE_HEIGHT,
  },
  priceText: {
    fontSize: ms(24),
    fontWeight: '800',
  },
  exclVat: {
    fontSize: ms(10),
    lineHeight: ms(14),
  },
  description: {
    marginTop: -vs(4),
  },
  ctaContent: {
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
  badgeContainer: {
    position: 'absolute',
    top: -vs(12),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  badge: {
    paddingHorizontal: s(16),
    paddingVertical: vs(5),
    borderRadius: s(20),
  },
  badgeText: {
    color: Colors.white,
    fontSize: ms(11),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
