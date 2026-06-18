import React, { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { lessons, subjects } from '../data/mockData';
import { Lesson, Subject } from '../types';
import { TabParamList } from '../navigation';
import { SectionHeader } from '../components/SectionHeader';
import { SubjectCard } from '../components/SubjectCard';
import { LessonCard } from '../components/LessonCard';
import { IconButton } from '../components/IconButton';
import { HeroIllustration } from '../components/HeroIllustration';
import { EmptyState } from '../components/EmptyState';

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList, 'Home'>>();
  const [subjectList, setSubjectList] = useState<Subject[]>(subjects);
  const [lessonList, setLessonList] = useState<Lesson[]>(lessons);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const todayLabel = dayLabels[new Date().getDay()];
  const lessonsToday = useMemo(() => lessonList.filter((lesson) => lesson.day === todayLabel), [lessonList, todayLabel]);
  const lessonsToShow = lessonsToday.length ? lessonsToday.slice(0, 2) : lessonList.slice(0, 2);
  const itemHeight = s(26);
  const listHeight = lessonsToShow.length * itemHeight + Math.max(lessonsToShow.length - 1, 0) * s(3);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <IconButton icon="search" onPress={() => navigation.navigate('Schedule')} backgroundColor={colors.surface} iconColor={colors.primaryDark} />
          </View>
          <HeroIllustration />
        </View>
        <View style={styles.content}>
          <SectionHeader title="Subjects" subtitle="Recommendations for you" />
          <ScrollView
            horizontal
            directionalLockEnabled
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subjectRow}
          >
            {subjectList.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onPress={() => navigation.navigate('Schedule')}
                onMore={() => setSubjectList((prev) => prev.filter((item) => item.id !== subject.id))}
              />
            ))}
          </ScrollView>
          <View style={styles.scheduleHeader}>
            <Text style={styles.scheduleTitle}>Your Schedule</Text>
            <Text style={styles.scheduleSubtitle}>Next lessons</Text>
          </View>
          {lessonsToShow.length ? (
            <FlatList
              data={lessonsToShow}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View style={styles.lessonRow}>
                  <LessonCard
                    lesson={item}
                    highlight={index === 0}
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
              style={{ height: listHeight }}
            />
          ) : (
            <EmptyState title="No lessons" subtitle="Enjoy your free time today." />
          )}
        </View>
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
    paddingBottom: s(8),
  },
  hero: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: s(4),
    paddingTop: s(4),
    paddingBottom: s(8),
    borderBottomLeftRadius: s(8),
    borderBottomRightRadius: s(8),
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  content: {
    backgroundColor: colors.surface,
    marginTop: s(-6),
    paddingHorizontal: s(4),
    paddingTop: s(6),
    paddingBottom: s(6),
    borderTopLeftRadius: s(8),
    borderTopRightRadius: s(8),
  },
  subjectRow: {
    paddingBottom: s(4),
  },
  scheduleHeader: {
    marginTop: s(4),
    marginBottom: s(3),
  },
  scheduleTitle: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
  },
  scheduleSubtitle: {
    marginTop: s(1),
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  lessonRow: {
    flexDirection: 'row',
  },
  lessonSeparator: {
    height: s(3),
  },
});
