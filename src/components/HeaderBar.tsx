import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type HeaderBarProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
};

export function HeaderBar({ title, subtitle, onBackPress, rightIcon, onRightPress }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBackPress && (
          <Pressable
            onPress={onBackPress}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.iconButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            hitSlop={s(2)}
          >
            <Ionicons name="chevron-back" size={s(6)} color={colors.textPrimary} />
          </Pressable>
        )}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightIcon && onRightPress ? (
        <Pressable
          onPress={onRightPress}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.iconButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          hitSlop={s(2)}
        >
          <Ionicons name={rightIcon as any} size={s(6)} color={colors.textPrimary} />
        </Pressable>
      ) : (
        <View style={styles.rightSpacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(4),
    paddingVertical: s(3),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconButton: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    marginLeft: s(2),
  },
  title: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
  },
  subtitle: {
    marginTop: s(1),
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  rightSpacer: {
    width: s(8),
    height: s(8),
  },
});
