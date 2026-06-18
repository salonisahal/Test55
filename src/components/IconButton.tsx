import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type IconButtonProps = {
  icon: string;
  onPress: () => void;
  backgroundColor?: string;
  iconColor?: string;
};

export function IconButton({ icon, onPress, backgroundColor, iconColor }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
      style={({ pressed }) => [styles.button, backgroundColor ? { backgroundColor } : undefined, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
      hitSlop={s(2)}
    >
      <Ionicons name={icon as any} size={s(5)} color={iconColor || colors.textInverse} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
