import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useColors } from '../lib/theme';
import { useMuted } from '../lib/sound';
import { levelInfo } from '../lib/storage';
import { MODULES } from '../data/content';
import Sign from '../components/Sign';
import MuteButton from '../components/MuteButton';

const NODE_BLOCK_WIDTH = 172;
const ROW_HEIGHT = 176;
const TOP_PAD = 34;
const LOCK_MSG = 'Réussis le thème précédent pour débloquer';

function Stars({ n }) {
  const C = useColors();
  return (
    <View style={{ flexDirection: 'row', gap: 3, marginTop: 4, justifyContent: 'center' }}>
      {[0, 1, 2].map((i) => (
        <Text key={i} style={{ fontSize: 14, color: i < n ? C.amber : C.border }}>
          ★
        </Text>
      ))}
    </View>
  );
}

// A theme is unlocked once the previous one has been passed with >=1 star (>=50%). The 1st is always open.
function isUnlocked(state, idx) {
  if (idx === 0) return true;
  const prevProg = state.progress[MODULES[idx - 1].id];
  return !!prevProg && prevProg.stars >= 1;
}

function computePositions(width) {
  const w = width > 0 ? width : Dimensions.get('window').width - 32;
  const half = w / 2;
  const amplitude = Math.min(120, Math.max(30, half - NODE_BLOCK_WIDTH / 2 - 6));
  return MODULES.map((_, i) => ({
    x: half + Math.sin(i * 1.15) * amplitude,
    y: TOP_PAD + i * ROW_HEIGHT,
  }));
}

// Smooth winding "road" line running through every node center.
function buildRoadPath(positions) {
  if (positions.length < 2) return '';
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    const p0 = positions[i - 1];
    const p1 = positions[i];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export default function Home({ state, onOpenModule, onOpenExam }) {
  const C = useColors();
  const styles = useMemo(() => makeStyles(C), [C]);
  const lvl = levelInfo(state.xp);
  const done = Object.keys(state.progress).length;
  const [muted, toggleMuted] = useMuted();

  const [pathWidth, setPathWidth] = useState(Dimensions.get('window').width - 32);
  const positions = useMemo(() => computePositions(pathWidth), [pathWidth]);
  const roadD = useMemo(() => buildRoadPath(positions), [positions]);
  const pathHeight = TOP_PAD + (MODULES.length - 1) * ROW_HEIGHT + 96;

  let currentIndex = null;
  for (let i = 0; i < MODULES.length; i++) {
    const prog = state.progress[MODULES[i].id];
    if (isUnlocked(state, i) && !(prog && prog.stars >= 1)) {
      currentIndex = i;
      break;
    }
  }

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
          <MuteButton muted={muted} onToggle={toggleMuted} />
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

      {/* module path — winding road */}
      <View
        style={[styles.pathWrap, { height: pathHeight }]}
        onLayout={(e) => setPathWidth(e.nativeEvent.layout.width)}
      >
        <Svg width={pathWidth} height={pathHeight} style={StyleSheet.absoluteFill}>
          <Path d={roadD} stroke={C.road} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path
            d={roadD}
            stroke={C.roadLine}
            strokeOpacity={0.85}
            strokeWidth={3}
            strokeDasharray="10 9"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>

        {MODULES.map((mod, i) => {
          const prog = state.progress[mod.id];
          const unlocked = isUnlocked(state, i);
          const isCurrent = i === currentIndex;
          const pos = positions[i];

          return (
            <Pressable
              key={mod.id}
              disabled={!unlocked}
              onPress={() => unlocked && onOpenModule(mod)}
              style={({ pressed }) => [
                styles.nodeBlock,
                { left: pos.x - NODE_BLOCK_WIDTH / 2, top: pos.y - 34, width: NODE_BLOCK_WIDTH },
                pressed && unlocked && { opacity: 0.75 },
              ]}
            >
              {isCurrent ? (
                <View style={styles.currentTag}>
                  <Text style={styles.currentTagText}>{prog ? 'CONTINUER' : 'COMMENCER'}</Text>
                </View>
              ) : null}

              <View
                style={[
                  styles.badge,
                  !unlocked && styles.badgeLocked,
                  unlocked && isCurrent && styles.badgeCurrent,
                  unlocked && !isCurrent && prog?.stars >= 3 && styles.badgeGold,
                  unlocked && !isCurrent && prog && prog.stars < 3 && styles.badgeStarted,
                ]}
              >
                <Sign xml={mod.sign} size={44} style={!unlocked ? { opacity: 0.3 } : null} />
                {!unlocked ? (
                  <View style={styles.lockOverlay}>
                    <Text style={styles.lockIcon}>🔒</Text>
                  </View>
                ) : null}
              </View>

              <Text
                style={[styles.nodeTitle2, !unlocked && { color: C.textMuted }]}
                numberOfLines={2}
              >
                {mod.title}
              </Text>

              {unlocked && prog ? <Stars n={prog.stars} /> : null}
              {!unlocked ? <Text style={styles.lockMsg}>{LOCK_MSG}</Text> : null}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.footer}>Feu Vert — apprends le code, un feu vert à la fois.</Text>
    </ScrollView>
  );
}

function makeStyles(C) {
  return StyleSheet.create({
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

    pathWrap: { marginTop: 28, width: '100%', position: 'relative' },
    nodeBlock: { position: 'absolute', alignItems: 'center' },
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
    badgeCurrent: { borderColor: C.accent, backgroundColor: C.surface, borderWidth: 4 },
    badgeGold: { borderColor: C.amber, backgroundColor: C.surface2 },
    badgeStarted: { borderColor: C.blue },
    badgeLocked: { backgroundColor: C.surface2, borderColor: C.border, opacity: 0.75 },
    lockOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
    lockIcon: { fontSize: 22 },
    currentTag: {
      backgroundColor: C.accent,
      color: '#fff',
      borderRadius: 999,
      paddingVertical: 3,
      paddingHorizontal: 9,
      marginBottom: 6,
    },
    currentTagText: { color: '#fff', fontWeight: '700', fontSize: 10.5, letterSpacing: 0.5 },
    nodeTitle2: {
      fontSize: 14.5,
      fontWeight: '700',
      color: C.text,
      textAlign: 'center',
      marginTop: 8,
      lineHeight: 18,
    },
    lockMsg: {
      fontSize: 11,
      color: C.textMuted,
      textAlign: 'center',
      marginTop: 4,
      lineHeight: 14,
      paddingHorizontal: 4,
    },
    footer: { marginTop: 36, textAlign: 'center', fontSize: 12, color: C.textMuted },
  });
}
