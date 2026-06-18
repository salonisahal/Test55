import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lesson } from '../types';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type LessonCardProps = {
  lesson: Lesson;
  highlight?: boolean;
  onPress: () => void;
  onMore: () => void;
};

export function LessonCard({ lesson, highlight, onPress, onMore }: LessonCardProps) {
  const textColor = highlight ? colors.textInverse : colors.textPrimary;
  const secondaryColor = highlight ? colors.textInverse : colors.textSecondary;

  return (
    <View style={[styles.card, highlight && styles.cardHighlight]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content} pointerEvents="none">
        <Text style={[styles.title, { color: textColor }]}>{lesson.title}</Text>
        <Text style={[styles.chapter, { color: secondaryColor }]}>{lesson.chapter}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={s(4)} color={secondaryColor} />
          <Text style={[styles.metaText, { color: secondaryColor }]}>{lesson.room}</Text>
        </View>
        <View style={styles.metaRow}>
          <View style={[styles.avatar, { backgroundColor: lesson.avatarColor }]}> 
            <Ionicons name="person" size={s(3)} color={colors.textInverse} />
          </View>
          <Text style={[styles.metaText, { color: secondaryColor }]}>{lesson.teacher}</Text>
        </View>
      </View>
      <Pressable
        onPress={onMore}
        android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
        style={({ pressed }) => [styles.moreButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        hitSlop={s(2)}
      >
        <Ionicons name="ellipsis-vertical" size={s(4)} color={secondaryColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: s(4),
    padding: s(4),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  cardHighlight: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: s(4),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.5,
    lineHeight: s(4) * 1.2,
  },
  chapter: {
    marginTop: s(1),
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(2),
  },
  metaText: {
    marginLeft: s(2),
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  avatar: {
    width: s(4),
    height: s(4),
    borderRadius: s(2),
    alignItems: 'center',
    justifyContent: 'center',
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
