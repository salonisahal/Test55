import React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type TodayBadgeProps = {
  onPress: () => void;
};

export function TodayBadge({ onPress }: TodayBadgeProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [styles.badge, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
    >
      <Text style={styles.text}>Today</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: s(4),
    paddingVertical: s(2),
    borderRadius: s(4),
  },
  text: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.primary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
});
