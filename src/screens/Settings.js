import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useColors } from '../lib/theme';

const GOAL_STEP = 5;
const GOAL_MIN = 5;
const GOAL_MAX = 100;

export default function Settings({ state, onCommit, onExit }) {
  const C = useColors();
  const styles = useMemo(() => makeStyles(C), [C]);
  const dailyGoal = state.dailyGoal || 20;

  function changeGoal(delta) {
    const next = Math.max(GOAL_MIN, Math.min(GOAL_MAX, dailyGoal + delta));
    if (next === dailyGoal) return;
    onCommit({ ...state, dailyGoal: next });
  }

  return (
    <View style={styles.overlay}>
      <View style={[styles.head, { borderBottomColor: C.border }]}>
        <Pressable onPress={onExit} style={styles.closeBtn}>
          <Text style={{ fontSize: 22, color: C.textMuted }}>✕</Text>
        </Pressable>
        <Text style={styles.headTitle}>⚙️ Réglages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Objectif quotidien</Text>
          <Text style={styles.hint}>
            Combien d'XP veux-tu gagner chaque jour ? La barre sur l'accueil se remplit avec l'XP
            gagné aujourd'hui.
          </Text>
          <View style={styles.stepperRow}>
            <Pressable
              style={[styles.stepperBtn, dailyGoal <= GOAL_MIN && styles.stepperBtnDisabled]}
              disabled={dailyGoal <= GOAL_MIN}
              onPress={() => changeGoal(-GOAL_STEP)}
            >
              <Text style={styles.stepperBtnText}>−</Text>
            </Pressable>
            <Text style={styles.stepperValue}>{dailyGoal} XP</Text>
            <Pressable
              style={[styles.stepperBtn, dailyGoal >= GOAL_MAX && styles.stepperBtnDisabled]}
              disabled={dailyGoal >= GOAL_MAX}
              onPress={() => changeGoal(GOAL_STEP)}
            >
              <Text style={styles.stepperBtnText}>+</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function makeStyles(C) {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: C.bg },
    head: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderBottomWidth: 1,
    },
    closeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
    headTitle: { fontSize: 16, fontWeight: '700', color: C.text },
    body: { padding: 20, paddingBottom: 40, maxWidth: 640, width: '100%', alignSelf: 'center' },
    card: {
      backgroundColor: C.surface2,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: { fontSize: 15, fontWeight: '800', color: C.text, marginBottom: 8 },
    hint: { fontSize: 12.5, color: C.textMuted, lineHeight: 18, marginBottom: 16 },
    stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
    stepperBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: C.accent,
    },
    stepperBtnDisabled: { backgroundColor: C.border },
    stepperBtnText: { fontSize: 22, fontWeight: '800', color: '#fff' },
    stepperValue: { fontSize: 20, fontWeight: '800', color: C.text, minWidth: 80, textAlign: 'center' },
  });
}
