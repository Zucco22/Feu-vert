import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { C } from '../lib/theme';
import { levelInfo } from '../lib/storage';
import { MODULES } from '../data/content';
import Sign from '../components/Sign';

function Stars({ n }) {
  return (
    <View style={{ flexDirection: 'row', gap: 3, marginTop: 6 }}>
      {[0, 1, 2].map((i) => (
        <Text key={i} style={{ fontSize: 14, color: i < n ? C.amber : C.border }}>
          ★
        </Text>
      ))}
    </View>
  );
}

export default function Home({ state, onOpenModule, onOpenExam }) {
  const lvl = levelInfo(state.xp);
  const done = Object.keys(state.progress).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.topbar}>
        <View style={styles.brand}>
          <Text style={styles.logoDot}>🚦</Text>
          <Text style={styles.h1}>Feu Vert</Text>
        </View>
        <View style={styles.stats}>
          <Text style={[styles.stat, { color: C.blueDark }]}>⚡ {state.xp}</Text>
          <Text style={[styles.stat, { color: C.flameDark }]}>🔥 {state.streak}</Text>
        </View>
      </View>

      {/* level card */}
      <View style={styles.levelCard}>
        <View style={styles.levelTop}>
          <Text style={styles.levelName}>{lvl.name}</Text>
          <Text style={styles.levelXp}>{state.xp} XP</Text>
        </View>
        <View style={styles.levelBar}>
          <View style={[styles.levelBarFill, { width: `${lvl.pct}%` }]} />
        </View>
        <Text style={styles.levelNext}>
          {lvl.next
            ? `Encore ${lvl.next.min - state.xp} XP pour « ${lvl.next.name} »`
            : 'Niveau maximum atteint !'}
        </Text>
      </View>

      <View style={styles.overview}>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${(done / MODULES.length) * 100}%` }]} />
        </View>
        <Text style={styles.count}>
          {done}/{MODULES.length} thèmes
        </Text>
      </View>

      {/* examen blanc */}
      <Pressable
        style={({ pressed }) => [styles.examBtn, pressed && { opacity: 0.9 }]}
        onPress={onOpenExam}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.examTitle}>🚦 Examen blanc</Text>
          <Text style={styles.examSub}>
            40 questions · réussite à 35/40 · chrono
            {state.examBest ? ` · record : ${state.examBest}/40` : ''}
          </Text>
        </View>
        <Text style={styles.examArrow}>›</Text>
      </Pressable>

      {/* module path */}
      <View style={styles.path}>
        {MODULES.map((mod, i) => {
          const prog = state.progress[mod.id];
          return (
            <Pressable
              key={mod.id}
              style={({ pressed }) => [styles.node, pressed && { opacity: 0.7 }]}
              onPress={() => onOpenModule(mod)}
            >
              <View
                style={[
                  styles.badge,
                  prog?.stars >= 3 && { borderColor: C.amber, backgroundColor: '#FFF7DB' },
                  prog && prog.stars < 3 && { borderColor: C.blue },
                ]}
              >
                <Sign xml={mod.sign} size={44} />
              </View>
              <View style={styles.nodeBody}>
                {i === 0 && !prog ? <Text style={styles.startTag}>COMMENCER</Text> : null}
                <Text style={styles.nodeTitle}>{mod.title}</Text>
                <Text style={styles.nodeBlurb} numberOfLines={2}>
                  {mod.blurb}
                </Text>
                {prog ? <Stars n={prog.stars} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.footer}>Feu Vert — apprends le code, un feu vert à la fois.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 48, maxWidth: 640, width: '100%', alignSelf: 'center' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoDot: { fontSize: 26 },
  h1: { fontSize: 22, fontWeight: '800', color: C.text },
  stats: { flexDirection: 'row', gap: 8 },
  stat: {
    fontWeight: '800',
    fontSize: 14,
    backgroundColor: C.surface2,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  levelCard: {
    backgroundColor: C.surface2,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  levelTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 },
  levelName: { fontSize: 18, fontWeight: '700', color: C.text },
  levelXp: { fontSize: 13, color: C.textMuted },
  levelBar: { height: 8, borderRadius: 999, backgroundColor: C.border, overflow: 'hidden' },
  levelBarFill: { height: '100%', backgroundColor: C.amber, borderRadius: 999 },
  levelNext: { fontSize: 12, color: C.textMuted, marginTop: 6 },
  overview: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 },
  track: { flex: 1, height: 8, borderRadius: 999, backgroundColor: C.surface2, overflow: 'hidden' },
  trackFill: { height: '100%', backgroundColor: C.success, borderRadius: 999 },
  count: { fontSize: 13, color: C.textMuted },
  examBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: C.blue,
  },
  examTitle: { fontSize: 17, fontWeight: '800', color: '#fff' },
  examSub: { fontSize: 12.5, color: '#EAF7FF', marginTop: 3, fontWeight: '600' },
  examArrow: { fontSize: 28, color: '#fff', fontWeight: '800' },
  path: { marginTop: 22, gap: 6 },
  node: { flexDirection: 'row', gap: 16, alignItems: 'flex-start', paddingVertical: 10 },
  badge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.surface,
    borderWidth: 3,
    borderColor: C.border,
  },
  nodeBody: { flex: 1, paddingTop: 4 },
  startTag: {
    alignSelf: 'flex-start',
    backgroundColor: C.accent,
    color: '#fff',
    fontWeight: '700',
    fontSize: 10.5,
    letterSpacing: 0.5,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 999,
    marginBottom: 5,
    overflow: 'hidden',
  },
  nodeTitle: { fontSize: 17, fontWeight: '700', color: C.text, marginBottom: 3 },
  nodeBlurb: { fontSize: 13, color: C.textMuted, lineHeight: 18 },
  footer: { marginTop: 36, textAlign: 'center', fontSize: 12, color: C.textMuted },
});
