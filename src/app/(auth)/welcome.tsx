import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import LanguageSwitcher from '@/components/language-switcher';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/theme';

const HERO_GRADIENT_COLORS = ['#BBDCC7', '#D3E9D9', Colors.white] as const;
const HERO_GRADIENT_LOCATIONS = [0, 0.55, 1] as const;
const FADE_GRADIENT_COLORS = [
  'rgba(255, 255, 255, 0.05)',
  'rgba(255, 255, 255, 0.1)',
  'rgba(255, 255, 255, 0.2)',
  'rgba(255, 255, 255, 0.4)',
  'rgba(255, 255, 255, 0.6)',
  'rgba(255, 255, 255, 0.8)',
  Colors.white,
] as const;
// Leo sits centered in the mint hero with green margins around him (he does NOT
// fill the screen width). Explicit dimensions preserve the source aspect ratio
// (750x1388) and render reliably (expo-image + `aspectRatio` + `%` width does
// not lay out on web).
const LEO_WIDTH = s(350);
const LEO_HEIGHT = LEO_WIDTH / (750 / 1388);
// Only the shirt is shown: the clip wrapper reveals the top ~70% of the image
// (head → waist) and hides the dark trousers below. Both dims use `s()` so the
// waist-crop line is identical on every device (no gray band on tall screens).
const LEO_VISIBLE_HEIGHT = LEO_HEIGHT * 0.75;

export default function WelcomeScreen() {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  // Tall mint hero (~half the screen, like the design). Leo is anchored to the
  // BOTTOM of it (see heroContainer) so there's green space above his head and
  // his waist fades straight into the heading — no white gap. Scales with height.
  const heroHeight = windowHeight * 0.6;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + vs(20) }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.heroContainer, { height: heroHeight }]}>
          <LinearGradient
            colors={HERO_GRADIENT_COLORS}
            locations={HERO_GRADIENT_LOCATIONS}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.leoClip}>
            <Image
              source={require('@/assets/images/png/leo.png')}
              style={styles.leoImage}
              contentFit="cover"
              contentPosition="top center"
              transition={150}
            />
          </View>
          <LinearGradient
            colors={FADE_GRADIENT_COLORS}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.fadeOverlay}
          />
          <View style={[styles.languageSwitcher, { top: insets.top + vs(12) }]}>
            <LanguageSwitcher />
          </View>
        </View>

        <View style={styles.content}>
          <Trans
            key={i18n.language}
            i18nKey="welcome.heading"
            parent={ThemedText}
            style={styles.heading}
            components={{ accent: <Text style={styles.headingAccent} /> }}
          />

          <Text style={styles.subheading}>{t('welcome.subheading')}</Text>
        </View>

        <View style={styles.buttonStack}>
          <Link href="/signup" asChild>
            <Button mode="contained" icon="chevron-right" contentStyle={styles.buttonContent}>
              {t('welcome.createAccount')}
            </Button>
          </Link>
          <Link href="/login" asChild>
            <Button mode="outlined" icon="chevron-right" contentStyle={styles.buttonContent}>
              {t('welcome.login')}
            </Button>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  leoClip: {
    width: LEO_WIDTH,
    height: LEO_VISIBLE_HEIGHT,
    overflow: 'hidden',
  },
  leoImage: {
    width: LEO_WIDTH,
    height: LEO_HEIGHT,
  },
  fadeOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: vs(96),
    pointerEvents: 'none',
  },
  languageSwitcher: {
    position: 'absolute',
    right: s(20),
  },
  content: {
    marginTop: 'auto',
    paddingHorizontal: s(24),
    alignItems: 'center',
  },
  heading: {
    fontSize: ms(26),
    lineHeight: ms(34),
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.light.text,
  },
  headingAccent: {
    color: Colors.light.primary,
  },
  subheading: {
    marginTop: vs(12),
    fontSize: ms(14),
    lineHeight: ms(20),
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.light.textSecondary,
    maxWidth: '90%',
  },
  buttonStack: {
    marginTop: vs(24),
    paddingHorizontal: s(24),
    gap: vs(12),
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
});
