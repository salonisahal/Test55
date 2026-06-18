import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Subject } from '../types';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type SubjectCardProps = {
  subject: Subject;
  onPress: () => void;
  onMore: () => void;
};

export function SubjectCard({ subject, onPress, onMore }: SubjectCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: subject.color }]}
      >
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content} pointerEvents="none">
        <View style={styles.iconCircle}>
          <Ionicons name={subject.icon as any} size={s(4)} color={colors.textInverse} />
        </View>
        <Text style={styles.title}>{subject.title}</Text>
      </View>
      <Pressable
        onPress={onMore}
        android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
        style={({ pressed }) => [styles.moreButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        hitSlop={s(2)}
      >
        <Ionicons name="ellipsis-vertical" size={s(4)} color={colors.textInverse} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: s(22),
    height: s(22),
    borderRadius: s(4),
    padding: s(3),
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginRight: s(3),
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textInverse,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
  },
  moreButton: {
    position: 'absolute',
    top: s(2),
    right: s(2),
    width: s(6),
    height: s(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
