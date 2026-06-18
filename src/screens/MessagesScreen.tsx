import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { lessons } from '../data/mockData';
import { Lesson } from '../types';

export default function MessagesScreen() {
  const [lessonList, setLessonList] = useState<Lesson[]>(lessons);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const messageThreads = useMemo(
    () => lessonList.map((lesson) => ({ id: lesson.id, teacher: lesson.teacher, subject: lesson.title })),
    [lessonList],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Chat with instructors</Text>
      </View>
      <FlatList
        data={messageThreads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable
              onPress={() => setSelectedId(item.id === selectedId ? null : item.id)}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.rowContent} pointerEvents="none">
              <View style={styles.avatar}>
                <Ionicons name="chatbubbles" size={s(4)} color={colors.textInverse} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.rowTitle}>{item.teacher}</Text>
                <Text style={styles.rowSubtitle}>{`Lesson: ${item.subject}`}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => setLessonList((prev) => prev.filter((lesson) => lesson.id !== item.id))}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.moreButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              hitSlop={s(2)}
            >
              <Ionicons name="ellipsis-vertical" size={s(4)} color={colors.textSecondary} />
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  header: {
    paddingHorizontal: s(4),
    paddingTop: s(4),
    paddingBottom: s(2),
  },
  title: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2,
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
  listContent: {
    paddingHorizontal: s(4),
    paddingBottom: s(8),
  },
  list: {
    flex: 1,
  },
  row: {
    backgroundColor: colors.surface,
    borderRadius: s(4),
    padding: s(4),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    marginLeft: s(3),
    flex: 1,
  },
  rowTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.2,
    lineHeight: s(4) * 1.2,
  },
  rowSubtitle: {
    marginTop: s(1),
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  moreButton: {
    width: s(6),
    height: s(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: s(3),
  },
});
