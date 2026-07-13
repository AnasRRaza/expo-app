import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Menu } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { useTheme } from '@/hooks/use-theme';
import { LOCALE_META, SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const currentLocale =
    (i18n.language as SupportedLocale) in LOCALE_META ? (i18n.language as SupportedLocale) : 'en';
  const current = LOCALE_META[currentLocale];

  const handleSelect = (locale: SupportedLocale) => {
    setVisible(false);
    void i18n.changeLanguage(locale);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Pressable
          style={[
            styles.anchor,
            { backgroundColor: theme.inputBackground, borderColor: theme.primary },
          ]}
          onPress={() => setVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Change language"
        >
          <Text style={styles.flag}>{current.flag}</Text>
          <Text style={[styles.label, { color: theme.textSecondary }]}>{current.label}</Text>
          <Icon source="chevron-down" size={s(16)} color={theme.primary} />
        </Pressable>
      }
      style={styles.menuPosition}
      contentStyle={[styles.menuContent, { backgroundColor: theme.backgroundElement }]}
    >
      {SUPPORTED_LOCALES.map((locale) => {
        const isSelected = locale === currentLocale;

        return (
          <Menu.Item
            key={locale}
            onPress={() => handleSelect(locale)}
            title={`${LOCALE_META[locale].flag}   ${LOCALE_META[locale].label}`}
            trailingIcon={isSelected ? 'check' : undefined}
            style={styles.menuItem}
            titleStyle={[
              styles.menuItemTitle,
              { color: theme.text },
              isSelected && [styles.menuItemTitleSelected, { color: theme.primary }],
            ]}
          />
        );
      })}
    </Menu>
  );
}

const styles = StyleSheet.create({
  anchor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    paddingVertical: s(6),
    paddingHorizontal: s(8),
    borderRadius: s(8),
    borderWidth: 1,
  },
  flag: {
    fontSize: s(14),
  },
  label: {
    fontSize: s(14),
    fontWeight: '600',
  },
  menuPosition: {
    left: undefined,
    right: s(20),
  },
  menuContent: {
    borderRadius: s(10),
    paddingVertical: s(4),
    minWidth: s(120),
  },
  menuItem: {
    height: s(40),
  },
  menuItemTitle: {
    fontSize: s(14),
  },
  menuItemTitleSelected: {
    fontWeight: '700',
  },
});
