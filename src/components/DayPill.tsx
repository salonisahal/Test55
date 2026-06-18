import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type DayPillProps = {
  label: string;
  number: string;
  active: boolean;
  onPress: () => void;
};

export function DayPill({ label, number, active, onPress }: DayPillProps) {
  return (
    <View style={[styles.container, active && styles.containerActive]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content} pointerEvents="none">
        <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
        <Text style={[styles.number, active && styles.numberActive]}>{number}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: s(10),
    height: s(12),
    borderRadius: s(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    marginRight: s(3),
    overflow: 'hidden',
  },
  containerActive: {
    backgroundColor: colors.accent,
  },
  content: {
    alignItems: 'center',
  },
  label: {
    fontSize: s(2),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(2) * 1.4,
  },
  labelActive: {
    color: colors.textInverse,
  },
  number: {
    marginTop: s(1),
    fontSize: s(4),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.5,
    lineHeight: s(4) * 1.2,
  },
  numberActive: {
    color: colors.textInverse,
  },
});
