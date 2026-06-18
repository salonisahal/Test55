import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

const settings = [
  { id: 'set-1', label: 'Notifications' },
  { id: 'set-2', label: 'Study reminders' },
  { id: 'set-3', label: 'Weekly summary' },
];

export default function ProfileScreen() {
  const [enabledIds, setEnabledIds] = useState<string[]>(['set-1']);

  const toggleSetting = (id: string) => {
    setEnabledIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={s(6)} color={colors.textInverse} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Brooklyn Williamson</Text>
          <Text style={styles.subtitle}>Student profile</Text>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Preferences</Text>
      </View>
      <FlatList
        data={settings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const active = enabledIds.includes(item.id);
          return (
            <View style={styles.row}>
              <Pressable
                onPress={() => toggleSetting(item.id)}
                android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.rowContent} pointerEvents="none">
                <Text style={styles.rowLabel}>{item.label}</Text>
              </View>
              <View style={[styles.toggle, active && styles.toggleActive]}>
                <View style={[styles.toggleKnob, active && styles.toggleKnobActive]} />
              </View>
            </View>
          );
        }}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(4),
    paddingTop: s(4),
    paddingBottom: s(4),
  },
  avatar: {
    width: s(14),
    height: s(14),
    borderRadius: s(7),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: s(4),
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
  sectionHeader: {
    paddingHorizontal: s(4),
    marginBottom: s(2),
  },
  sectionTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: -0.2,
    lineHeight: s(4) * 1.2,
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
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textPrimary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  toggle: {
    width: s(12),
    height: s(6),
    borderRadius: s(3),
    backgroundColor: colors.border,
    padding: s(1),
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleKnob: {
    width: s(4),
    height: s(4),
    borderRadius: s(2),
    backgroundColor: colors.surface,
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  separator: {
    height: s(3),
  },
});
