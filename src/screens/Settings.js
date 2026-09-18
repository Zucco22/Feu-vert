import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useColors } from '../lib/theme';
import { ThemeModeContext } from '../lib/themeMode';
import { useMuted } from '../lib/sound';

const GOAL_STEP = 5;
const GOAL_MIN = 5;
const GOAL_MAX = 100;

const THEME_OPTIONS = [
  { key: 'auto', label: 'Auto' },
  { key: 'light', label: 'Clair' },
  { key: 'dark', label: 'Sombre' },
];

export default function Settings({ state, onCommit, onExit }) {
  const C = useColors();
  const styles = useMemo(() => makeStyles(C), [C]);
  const { mode, setMode } = useContext(ThemeModeContext);
  const [muted, toggleMuted] = useMuted();
  const dailyGoal = state.dailyGoal || 20;

  function changeGoal(delta) {
    const next = Math.max(GOAL_MIN, Math.min(GOAL_MAX, dailyGoal + delta));
    if (next === dailyGoal) return;
    onCommit({ ...state, dailyGoal: next });
  }

  function resetProgress() {
    Alert.alert(
      'Réinitialiser ta progression ?',
      "Ton XP, ta série, tes thèmes, ton historique, tes erreurs mémorisées et ton record d'examen repartiront à zéro, sur cet appareil et dans le cloud. Cette action est irréversible.",
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            onCommit({
              xp: 0,
              streak: 0,
              lastActive: null,
              progress: {},
              history: [],
              mistakes: [],
              examBest: 0,
              dailyGoal,
              xpToday: 0,
              xpTodayDate: null,
            });
          },
        },
      ]
    );
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
          <Text style={styles.sectionTitle}>Thème</Text>
          <View style={styles.segmentRow}>
            {THEME_OPTIONS.map((opt) => {
              const active = mode === opt.key;
              return (
                <Pressable
                  key={opt.key}
                  style={[styles.segmentBtn, active && styles.segmentBtnActive]}
                  onPress={() => setMode(opt.key)}
                >
                  <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Son</Text>
              <Text style={styles.hint}>Bruitages de bonne/mauvaise réponse et de victoire.</Text>
            </View>
            <Pressable
              style={[styles.switch, !muted && styles.switchOn]}
              onPress={toggleMuted}
              hitSlop={8}
            >
              <View style={[styles.switchKnob, !muted && styles.switchKnobOn]} />
            </Pressable>
          </View>
        </View>

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

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Progression</Text>
          <Text style={styles.hint}>
            Remet ton XP, ta série, tes thèmes et ton historique à zéro, sur cet appareil et dans
            le cloud si tu es connecté.
          </Text>
          <Pressable style={styles.dangerBtn} onPress={resetProgress}>
            <Text style={styles.dangerBtnText}>RÉINITIALISER MA PROGRESSION</Text>
          </Pressable>
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

    segmentRow: { flexDirection: 'row', gap: 8 },
    segmentBtn: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: C.border,
    },
    segmentBtnActive: { backgroundColor: C.accent, borderColor: C.accent },
    segmentText: { fontSize: 13, fontWeight: '700', color: C.textMuted },
    segmentTextActive: { color: '#fff' },

    switchRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    switch: {
      width: 50,
      height: 30,
      borderRadius: 15,
      backgroundColor: C.border,
      padding: 3,
      justifyContent: 'center',
    },
    switchOn: { backgroundColor: C.accent },
    switchKnob: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#fff',
    },
    switchKnobOn: { alignSelf: 'flex-end' },

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

    dangerBtn: {
      backgroundColor: C.danger,
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: 'center',
    },
    dangerBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },
  });
}
