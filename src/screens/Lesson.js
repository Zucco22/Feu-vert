import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useColors, HEARTS_START, XP_PER_CORRECT } from '../lib/theme';
import { useMuted, useSoundEffects } from '../lib/sound';
import { recordResult } from '../lib/storage';
import { SCENES } from '../data/content';
import Sign from '../components/Sign';
import MascoLight from '../components/MascoLight';
import MuteButton from '../components/MuteButton';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// choices[0] in the data is the correct answer; shuffle for display.
function buildDeck(questions) {
  return questions.map((qd) => ({
    sign: qd.sign,
    q: qd.q,
    explain: qd.explain,
    options: shuffle(qd.choices.map((text, idx) => ({ text, correct: idx === 0 }))),
  }));
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Lesson({ mod, state, onCommit, onExit }) {
  const C = useColors();
  const styles = useMemo(() => makeStyles(C), [C]);
  const [muted, toggleMuted] = useMuted();
  const { playCorrect, playIncorrect, playComplete } = useSoundEffects(muted);

  const [phase, setPhase] = useState('intro');
  const deck = useMemo(() => buildDeck(mod.questions), [mod]);
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [mascoMood, setMascoMood] = useState('neutral');
  const [hearts, setHearts] = useState(HEARTS_START);
  const [correctCount, setCorrectCount] = useState(0);
  const [gainedXp, setGainedXp] = useState(0);
  const [result, setResult] = useState(null);

  const total = deck.length;
  const q = deck[qi];

  function choose(optIdx) {
    if (selected !== null) return;
    const isCorrect = q.options[optIdx].correct;
    setMascoMood(isCorrect ? 'happy' : 'sad');
    setSelected(optIdx);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setGainedXp((x) => x + XP_PER_CORRECT);
      playCorrect();
    } else {
      setHearts((h) => Math.max(0, h - 1));
      playIncorrect();
    }
  }

  function next() {
    const outOfHearts = hearts <= 0;
    if (qi + 1 >= total || outOfHearts) {
      finish();
    } else {
      setQi((i) => i + 1);
      setSelected(null);
      setMascoMood('neutral');
    }
  }

  function finish() {
    const next = { ...state, progress: { ...state.progress }, history: [...state.history] };
    const r = recordResult(next, mod, correctCount, total, gainedXp);
    if (r.pct >= 70) playComplete();
    setResult(r);
    setPhase('summary');
    onCommit(next);
  }

  // ---------- INTRO ----------
  if (phase === 'intro') {
    return (
      <View style={styles.overlay}>
        <Header onClose={onExit} muted={muted} onToggleMuted={toggleMuted} C={C} />
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.badge}>
            <Sign xml={mod.sign} size={56} />
          </View>
          <Text style={styles.h2}>{mod.title}</Text>
          <Text style={styles.blurb}>{mod.blurb}</Text>

          {mod.scene && SCENES[mod.scene] ? (
            <View style={styles.sceneBox}>
              <SvgXml xml={SCENES[mod.scene]} width="100%" height="100%" />
            </View>
          ) : null}

          {mod.facts ? (
            <View style={styles.factsRow}>
              {mod.facts.map((f, i) => (
                <View key={i} style={styles.factChip}>
                  <Text style={styles.factLabel}>{f.l} </Text>
                  <Text style={styles.factVal}>{f.v}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <Text style={styles.lessonHeading}>À RETENIR</Text>
          <View style={{ gap: 13, width: '100%' }}>
            {mod.points.map((p, i) => (
              <View key={i} style={styles.point}>
                <Sign xml={p.s} size={38} />
                <Text style={styles.pointText}>{p.t}</Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.primaryBtn} onPress={() => setPhase('quiz')}>
            <Text style={styles.primaryBtnText}>COMMENCER LE QUIZ</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // ---------- SUMMARY ----------
  if (phase === 'summary') {
    const summaryMood = result.pct >= 70 ? 'happy' : 'sad';
    return (
      <View style={styles.overlay}>
        <Header onClose={onExit} muted={muted} onToggleMuted={toggleMuted} C={C} />
        <ScrollView contentContainerStyle={styles.body}>
          <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <MascoLight mood={summaryMood} size={90} />
          </View>
          <Text style={styles.pct}>{result.pct}%</Text>
          <Text style={styles.pctLabel}>de bonnes réponses</Text>
          <View style={{ flexDirection: 'row', gap: 4, marginVertical: 8 }}>
            {[0, 1, 2].map((i) => (
              <Text key={i} style={{ fontSize: 28, color: i < result.stars ? C.amber : C.border }}>
                ★
              </Text>
            ))}
          </View>
          <View style={styles.summaryGrid}>
            <View>
              <Text style={styles.cellN}>
                {correctCount}/{total}
              </Text>
              <Text style={styles.cellL}>Réponses</Text>
            </View>
            <View>
              <Text style={[styles.cellN, { color: C.blueDark }]}>+{gainedXp}</Text>
              <Text style={styles.cellL}>XP gagnés</Text>
            </View>
          </View>
          <Pressable style={styles.primaryBtn} onPress={onExit}>
            <Text style={styles.primaryBtnText}>RETOUR AU PARCOURS</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // ---------- QUIZ ----------
  const answered = selected !== null;
  const isCorrect = answered && q.options[selected].correct;

  return (
    <View style={styles.overlay}>
      <Header
        onClose={onExit}
        progress={(qi + (answered ? 1 : 0)) / total}
        hearts={hearts}
        muted={muted}
        onToggleMuted={toggleMuted}
        C={C}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.qHeader}>
          <Sign xml={q.sign} size={54} />
          <Text style={styles.qText}>{q.q}</Text>
        </View>

        <View style={{ gap: 10 }}>
          {q.options.map((opt, idx) => {
            let extra = null;
            if (answered && opt.correct) extra = styles.choiceCorrect;
            else if (answered && idx === selected && !opt.correct) extra = styles.choiceIncorrect;
            return (
              <Pressable
                key={idx}
                style={[styles.choice, extra]}
                onPress={() => choose(idx)}
                disabled={answered}
              >
                <View style={styles.optLetter}>
                  <Text style={styles.optLetterText}>{LETTERS[idx]}</Text>
                </View>
                <Text style={styles.optText}>{opt.text}</Text>
              </Pressable>
            );
          })}
        </View>

        {answered ? (
          <View style={[styles.explain, { borderColor: isCorrect ? C.success : C.danger }]}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
              <MascoLight mood={mascoMood} size={56} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.verdict, { color: isCorrect ? C.success : C.danger }]}>
                  {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait.'}
                </Text>
                <Text style={styles.explainText}>{q.explain}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {answered ? (
          <Pressable style={styles.primaryBtn} onPress={next}>
            <Text style={styles.primaryBtnText}>
              {qi + 1 >= total || hearts <= 0 ? 'VOIR LE RÉSULTAT' : 'CONTINUER'}
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

function Header({ onClose, progress, hearts, muted, onToggleMuted, C }) {
  return (
    <View style={[hStyles.row, { borderBottomColor: C.border }]}>
      <Pressable onPress={onClose} style={hStyles.closeBtn}>
        <Text style={{ fontSize: 22, color: C.textMuted }}>✕</Text>
      </Pressable>
      {progress !== undefined ? (
        <View style={[hStyles.bar, { backgroundColor: C.surface2 }]}>
          <View style={[hStyles.barFill, { width: `${Math.round(progress * 100)}%`, backgroundColor: C.accent }]} />
        </View>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      {hearts !== undefined ? (
        <View style={{ flexDirection: 'row', gap: 3 }}>
          {[0, 1, 2].map((i) => (
            <Text key={i} style={{ fontSize: 18 }}>
              {i < hearts ? '❤️' : '🤍'}
            </Text>
          ))}
        </View>
      ) : null}
      <MuteButton muted={muted} onToggle={onToggleMuted} />
    </View>
  );
}

const hStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: 1 },
  closeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  bar: { flex: 1, height: 8, borderRadius: 999, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 999 },
});

function makeStyles(C) {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: C.bg },
    body: { padding: 20, paddingBottom: 40, maxWidth: 640, width: '100%', alignSelf: 'center' },
    badge: {
      width: 84,
      height: 84,
      borderRadius: 42,
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: C.surface,
      borderWidth: 3,
      borderColor: C.border,
    },
    h2: { fontSize: 24, fontWeight: '800', color: C.text, marginTop: 12 },
    blurb: { fontSize: 15, color: C.textMuted, lineHeight: 22, marginTop: 8 },
    sceneBox: {
      width: '100%',
      aspectRatio: 300 / 200,
      borderRadius: 16,
      overflow: 'hidden',
      marginTop: 14,
      borderWidth: 1,
      borderColor: C.border,
    },
    factsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 14 },
    factChip: {
      flexDirection: 'row',
      backgroundColor: C.surface2,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 999,
      paddingVertical: 7,
      paddingHorizontal: 13,
    },
    factLabel: { fontSize: 12.5, fontWeight: '600', color: C.textMuted },
    factVal: { fontSize: 12.5, fontWeight: '700', color: C.accent },
    lessonHeading: {
      fontSize: 12,
      letterSpacing: 1,
      color: C.textMuted,
      fontWeight: '700',
      marginTop: 20,
      marginBottom: 12,
    },
    point: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    pointText: { flex: 1, fontSize: 14.5, lineHeight: 20, color: C.text },
    qHeader: { flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginBottom: 18 },
    qText: { flex: 1, fontSize: 19, fontWeight: '700', color: C.text, lineHeight: 26 },
    choice: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 16,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: C.border,
      backgroundColor: C.surface,
    },
    choiceCorrect: { borderColor: C.success, backgroundColor: C.correctBg },
    choiceIncorrect: { borderColor: C.danger, backgroundColor: C.incorrectBg },
    optLetter: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: C.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: C.surface2,
    },
    optLetterText: { fontWeight: '700', fontSize: 13, color: C.textMuted },
    optText: { flex: 1, fontSize: 15, fontWeight: '700', color: C.text, lineHeight: 20 },
    explain: {
      marginTop: 18,
      padding: 16,
      borderRadius: 12,
      backgroundColor: C.surface2,
      borderWidth: 1.5,
    },
    verdict: { fontWeight: '800', marginBottom: 4, fontSize: 15 },
    explainText: { fontSize: 14, lineHeight: 21, color: C.text },
    primaryBtn: {
      backgroundColor: C.accent,
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 22,
    },
    primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
    pct: { fontSize: 56, fontWeight: '800', color: C.text, marginTop: 8, textAlign: 'center' },
    pctLabel: { color: C.textMuted, fontSize: 14, textAlign: 'center' },
    summaryGrid: { flexDirection: 'row', gap: 32, marginVertical: 22 },
    cellN: { fontSize: 20, fontWeight: '800', color: C.text },
    cellL: { fontSize: 12, color: C.textMuted },
  });
}
