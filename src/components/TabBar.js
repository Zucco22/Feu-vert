import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useColors } from '../lib/theme';

const TABS = [
  { key: 'home', label: 'Accueil', icon: '🏠' },
  { key: 'profile', label: 'Profil', icon: '👤' },
];

export default function TabBar({ tab, onChange }) {
  const C = useColors();
  const styles = makeStyles(C);
  return (
    <View style={styles.bar}>
      {TABS.map((t) => {
        const active = t.key === tab;
        return (
          <Pressable key={t.key} style={styles.item} onPress={() => onChange(t.key)}>
            <Text style={[styles.icon, active && { opacity: 1 }]}>{t.icon}</Text>
            <Text style={[styles.label, active && { color: C.accent }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function makeStyles(C) {
  return StyleSheet.create({
    bar: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: C.border,
      backgroundColor: C.surface,
    },
    item: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 2 },
    icon: { fontSize: 20, opacity: 0.6 },
    label: { fontSize: 11.5, fontWeight: '700', color: C.textMuted },
  });
}
