import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type TabIconProps = {
  icon: string;
  label: string;
  focused: boolean;
};

export function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={s(5)} color={focused ? colors.accent : colors.textSecondary} />
      <Text style={[styles.label, focused && styles.labelFocused]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: s(1),
    fontSize: s(2),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(2) * 1.4,
  },
  labelFocused: {
    color: colors.accent,
  },
});
