import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { Dropdown as ElementDropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-paper';
import { ms, s, vs } from 'react-native-size-matters';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DropdownItem = {
  label: string;
  value: string;
  /** Non-selectable category header row. */
  isHeader?: boolean;
};

interface DropdownProps extends React.ComponentProps<typeof ElementDropdown> {
  label?: string;
  placeholder?: string;
  data: DropdownItem[];
  value?: string;
  search?: boolean;
  searchPlaceholder?: string;
  error?: boolean;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Dropdown({
  label,
  placeholder,
  data,
  value,
  onChange,
  search = false,
  searchPlaceholder,
  error = false,
  errorMessage,
  containerStyle,
}: DropdownProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <ThemedText type="small">{label}</ThemedText> : null}
      <ElementDropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value ?? null}
        placeholder={placeholder}
        search={search}
        searchPlaceholder={searchPlaceholder}
        maxHeight={vs(320)}
        // Headers are pressable in element-dropdown; ignore them so the value never
        // becomes a category title (corner case: non-selectable headers).
        onChange={(item) => {
          if (item.isHeader) return;
          onChange(item.value);
        }}
        style={[
          styles.trigger,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error ? Colors.red : theme.inputBorder,
          },
        ]}
        containerStyle={[
          styles.panel,
          { backgroundColor: theme.backgroundElement, borderColor: theme.inputBorder },
        ]}
        placeholderStyle={[styles.value, { color: theme.mutedText }]}
        selectedTextStyle={[styles.value, { color: theme.text }]}
        inputSearchStyle={[
          styles.search,
          {
            color: theme.text,
            borderColor: theme.inputBorder,
            backgroundColor: theme.inputBackground,
          },
        ]}
        activeColor="transparent"
        iconColor={theme.primary}
        renderRightIcon={() => <Icon source="chevron-down" size={s(20)} color={theme.primary} />}
        renderItem={(item, selected) => {
          if (item.isHeader) {
            return (
              <View style={styles.headerRow}>
                <ThemedText type="smallBold" themeColor="primary">
                  {item.label}
                </ThemedText>
              </View>
            );
          }
          return (
            <View
              style={[
                styles.itemRow,
                selected ? { backgroundColor: theme.optionSelectedBackground } : null,
              ]}
            >
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <ThemedText type="small" style={{ color: selected ? theme.primary : theme.text }}>
                {item.label}
              </ThemedText>
            </View>
          );
        }}
      />
      {error && errorMessage ? (
        <ThemedText type="small" style={styles.errorText}>
          {errorMessage}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: vs(8),
  },
  trigger: {
    height: vs(52),
    paddingHorizontal: s(16),
    borderWidth: 1,
    borderRadius: s(12),
  },
  panel: {
    borderWidth: 1,
    borderRadius: s(12),
    paddingVertical: vs(4),
  },
  value: {
    fontSize: ms(14),
  },
  search: {
    borderRadius: s(10),
    fontSize: ms(14),
  },
  headerRow: {
    paddingHorizontal: s(16),
    paddingTop: vs(12),
    paddingBottom: vs(6),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    borderRadius: s(8),
    marginHorizontal: s(6),
  },
  bullet: {
    width: s(6),
    height: s(6),
    borderRadius: s(3),
  },
  errorText: {
    marginLeft: s(2),
    color: Colors.red,
  },
});
