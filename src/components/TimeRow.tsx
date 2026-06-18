import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type TimeRowProps = {
  start: string;
  end: string;
};

export function TimeRow({ start, end }: TimeRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.start}>{start}</Text>
      <Text style={styles.end}>{end}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: s(12),
    alignItems: 'flex-start',
  },
  start: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.2,
    lineHeight: s(3) * 1.2,
  },
  end: {
    marginTop: s(1),
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
});
