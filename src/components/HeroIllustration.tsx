import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

export function HeroIllustration() {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.globe}>
        <View style={styles.globeSpot} />
        <View style={styles.globeSpotSmall} />
      </View>
      <View style={styles.bookStack}>
        <View style={styles.book} />
        <View style={[styles.book, styles.bookMid]} />
        <View style={[styles.book, styles.bookTop]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: s(6),
  },
  globe: {
    width: s(26),
    height: s(26),
    borderRadius: s(13),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  globeSpot: {
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: colors.primaryLight,
  },
  globeSpotSmall: {
    position: 'absolute',
    top: s(4),
    right: s(4),
    width: s(6),
    height: s(6),
    borderRadius: s(3),
    backgroundColor: colors.surface,
  },
  bookStack: {
    alignItems: 'flex-end',
  },
  book: {
    width: s(14),
    height: s(3),
    borderRadius: s(2),
    backgroundColor: colors.warning,
    marginBottom: s(2),
  },
  bookMid: {
    width: s(16),
    backgroundColor: colors.primaryLight,
  },
  bookTop: {
    width: s(18),
    backgroundColor: colors.info,
  },
});
