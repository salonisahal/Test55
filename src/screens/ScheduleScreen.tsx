import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { lessons } from '../data/mockData';
import { Lesson } from '../types';
import { DayPill } from '../components/DayPill';
import { LessonCard } from '../components/LessonCard';
import { TimeRow } from '../components/TimeRow';
import { TodayBadge } from '../components/TodayBadge';
import { EmptyState } from '../components/EmptyState';

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

type WeekDay = {
  label: string;
  number: string;
};

const buildWeekDays = (): WeekDay[] => {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  return Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    return {
      label: dayLabels[day.getDay()],
      number: day.getDate().toString(),
    };
  });
};

export default function ScheduleScreen() {
  const [lessonList, setLessonList] = useState<Lesson[]>(lessons);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(dayLabels[new Date().getDay()]);
  const weekDays = useMemo(buildWeekDays, []);

  const filteredLessons = useMemo(
    () => lessonList.filter((lesson) => lesson.day === selectedDay),
    [lessonList, selectedDay],
  );
  const rowHeight = s(28);
  const listHeight = filteredLessons.length * rowHeight + Math.max(filteredLessons.length - 1, 0) * s(4);

  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', { weekday: 'short' });
  const monthLabel = today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.dateRow}>
          <View>
            <Text style={styles.dateNumber}>{today.getDate()}</Text>
            <Text style={styles.dateMonth}>{`${dateLabel} ${monthLabel}`}</Text>
          </View>
          <TodayBadge onPress={() => setSelectedDay(dayLabels[today.getDay()])} />
        </View>
        <ScrollView
          horizontal
          directionalLockEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayRow}
        >
          {weekDays.map((day, index) => (
            <DayPill
              key={`${day.label}-${index}`}
              label={day.label}
              number={day.number}
              active={day.label === selectedDay}
              onPress={() => setSelectedDay(day.label)}
            />
          ))}
        </ScrollView>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Time</Text>
          <Text style={styles.tableTitle}>Course</Text>
          <Pressable
            onPress={() => setLessonList((prev) => [...prev].reverse())}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.filterButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            hitSlop={s(2)}
          >
            <Ionicons name="options-outline" size={s(5)} color={colors.textSecondary} />
          </Pressable>
        </View>
        {filteredLessons.length ? (
          <FlatList
            data={filteredLessons}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.lessonRow}>
                <TimeRow start={item.timeStart} end={item.timeEnd} />
                <LessonCard
                  lesson={item}
                  highlight={item.id === selectedLessonId}
                  onPress={() => setSelectedLessonId(item.id === selectedLessonId ? null : item.id)}
                  onMore={() => setLessonList((prev) => prev.filter((lesson) => lesson.id !== item.id))}
                />
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.lessonSeparator} />}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'android'}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            scrollEnabled={false}
            style={[styles.list, { height: listHeight }]}
          />
        ) : (
          <EmptyState title="No lessons" subtitle="Try another day." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  scrollContent: {
    paddingHorizontal: s(4),
    paddingBottom: s(8),
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(4),
  },
  dateNumber: {
    fontSize: s(10),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.5,
    lineHeight: s(10) * 1.1,
  },
  dateMonth: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  dayRow: {
    marginTop: s(4),
    marginBottom: s(4),
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(3),
  },
  tableTitle: {
    flex: 1,
    fontSize: s(3),
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  filterButton: {
    width: s(8),
    height: s(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexGrow: 0,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: s(3),
  },
  lessonSeparator: {
    height: s(4),
  },
});
