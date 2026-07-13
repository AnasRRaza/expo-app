import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Menu } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { Colors } from '@/constants/theme';
import { LOCALE_META, SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
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
          style={styles.anchor}
          onPress={() => setVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Change language"
        >
          <Text style={styles.flag}>{current.flag}</Text>
          <Text style={styles.label}>{current.label}</Text>
          <Icon source="chevron-down" size={s(16)} color={Colors.light.primary} />
        </Pressable>
      }
      style={styles.menuPosition}
      contentStyle={styles.menuContent}
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
            titleStyle={[styles.menuItemTitle, isSelected && styles.menuItemTitleSelected]}
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
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.dark.primary,
  },
  flag: {
    fontSize: s(14),
  },
  label: {
    fontSize: s(14),
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  menuPosition: {
    left: undefined,
    right: s(20),
  },
  menuContent: {
    backgroundColor: Colors.white,
    borderRadius: s(10),
    paddingVertical: s(4),
    minWidth: s(120),
  },
  menuItem: {
    height: s(40),
  },
  menuItemTitle: {
    fontSize: s(14),
    color: Colors.light.text,
  },
  menuItemTitleSelected: {
    fontWeight: '700',
    color: Colors.light.primary,
  },
});
