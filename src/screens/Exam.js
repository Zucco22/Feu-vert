import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { C } from '../lib/theme';
import { MODULES } from '../data/content';
import Sign from '../components/Sign';

const EXAM_SIZE = 40; // format officiel : 40 questions
const PASS = 35; // réussite à 35/40
const XP_PER_CORRECT = 5;
const LETTERS = ['A', 'B', 'C', 'D'];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tire EXAM_SIZE questions au hasard parmi TOUS les thèmes.
function buildExam() {
  const all = [];
  for (const m of MODULES) for (const q of m.questions) all.push(q);
  return shuffle(all)
    .slice(0, Math.min(EXAM_SIZE, all.length))
    .map((qd) => ({
      sign: qd.sign,
      q: qd.q,
      explain: qd.explain,
      options: shuffle(qd.choices.map((text, idx) => ({ text, correct: idx === 0 }))),
    }));
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function Exam({ state, onCommit, onExit }) {
  const deck = useMemo(buildExam, []);
  const total = deck.length;
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // { correct: bool }
  const [phase, setPhase] = useState('exam'); // 'exam' | 'result'
  const [elapsed, setElapsed] = useState(0);
  const [savedResult, setSavedResult] = useState(null);

  // chrono
  useEffect(() => {
    if (phase !== 'exam') return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const q = deck[qi];

  function validate() {
    if (selected === null) return;
    const isCorrect = q.options[selected].correct;
    const nextAnswers = [...answers, { qi, correct: isCorrect, chosen: selected }];
    setAnswers(nextAnswers);
    if (qi + 1 >= total) {
      finish(nextAnswers);
    } else {
      setQi((i) => i + 1);
      setSelected(null);
    }
  }

  function finish(allAnswers) {
    const correct = allAnswers.filter((a) => a.correct).length;
    const pct = Math.round((correct / total) * 100);
    const passed = correct >= PASS;
    const gainedXp = correct * XP_PER_CORRECT;
    const next = { ...state, progress: { ...state.progress }, history: [...state.history] };
    next.xp += gainedXp;
    next.examBest = Math.max(next.examBest || 0, correct);
    next.history.unshift({
      date: new Date().toISOString().slice(0, 10),
      title: 'Examen blanc',
      pct,
      xp: gainedXp,
    });
    next.history = next.history.slice(0, 30);
    setSavedResult({ correct, pct, passed, gainedXp });
    setPhase('result');
    onCommit(next);
  }

  // ---------- RÉSULTAT ----------
  if (phase === 'result') {
    const r = savedResult;
    return (
      <View style={styles.overlay}>
        <View style={styles.head}>
          <Pressable onPress={onExit} style={styles.closeBtn}>
            <Text style={{ fontSize: 22, color: C.textMuted }}>✕</Text>
          </Pressable>
          <Text style={styles.headTitle}>Résultat de l'examen</Text>
        </View>
        <ScrollView contentContainerStyle={styles.body}>
          <View
            style={[
              styles.resultBadge,
              { backgroundColor: r.passed ? '#EAF7DE' : '#FDE7E7' },
            ]}
          >
            <Text style={[styles.resultScore, { color: r.passed ? C.success : C.danger }]}>
              {r.correct}/{total}
            </Text>
            <Text style={[styles.resultVerdict, { color: r.passed ? C.accentDark : C.dangerDark }]}>
              {r.passed ? '✓ RÉUSSI' : '✗ ÉCHOUÉ'}
            </Text>
            <Text style={styles.resultSub}>
              Réussite à partir de {PASS}/{total} · {fmtTime(elapsed)}
            </Text>
          </View>

          <View style={styles.summaryGrid}>
            <View>
              <Text style={styles.cellN}>{r.pct}%</Text>
              <Text style={styles.cellL}>Score</Text>
            </View>
            <View>
              <Text style={[styles.cellN, { color: C.blueDark }]}>+{r.gainedXp}</Text>
              <Text style={styles.cellL}>XP gagnés</Text>
            </View>
          </View>

          {/* révision des erreurs */}
          {answers.some((a) => !a.correct) ? (
            <>
              <Text style={styles.reviewHeading}>À revoir</Text>
              {answers
                .filter((a) => !a.correct)
                .map((a, i) => {
                  const dq = deck[a.qi];
                  const good = dq.options.find((o) => o.correct);
                  return (
                    <View key={i} style={styles.reviewCard}>
                      <View style={styles.reviewTop}>
                        <Sign xml={dq.sign} size={34} />
                        <Text style={styles.reviewQ}>{dq.q}</Text>
                      </View>
                      <Text style={styles.reviewGood}>✓ {good.text}</Text>
                      <Text style={styles.reviewExplain}>{dq.explain}</Text>
                    </View>
                  );
                })}
            </>
          ) : (
            <Text style={styles.perfect}>Sans faute, bravo ! 🎉</Text>
          )}

          <Pressable style={styles.primaryBtn} onPress={onExit}>
            <Text style={styles.primaryBtnText}>RETOUR À L'ACCUEIL</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // ---------- EXAMEN (pas de correction en direct) ----------
  return (
    <View style={styles.overlay}>
      <View style={styles.head}>
        <Pressable onPress={onExit} style={styles.closeBtn}>
          <Text style={{ fontSize: 22, color: C.textMuted }}>✕</Text>
        </Pressable>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${(qi / total) * 100}%` }]} />
        </View>
        <Text style={styles.timer}>{fmtTime(elapsed)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.counter}>
          Question {qi + 1} / {total}
        </Text>
        <View style={styles.qHeader}>
          <Sign xml={q.sign} size={54} />
          <Text style={styles.qText}>{q.q}</Text>
        </View>

        <View style={{ gap: 10 }}>
          {q.options.map((opt, idx) => (
            <Pressable
              key={idx}
              style={[styles.choice, idx === selected && styles.choiceSelected]}
              onPress={() => setSelected(idx)}
            >
              <View style={[styles.optLetter, idx === selected && styles.optLetterSel]}>
                <Text style={[styles.optLetterText, idx === selected && { color: '#fff' }]}>
                  {LETTERS[idx]}
                </Text>
              </View>
              <Text style={styles.optText}>{opt.text}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.primaryBtn, selected === null && styles.primaryBtnDisabled]}
          onPress={validate}
          disabled={selected === null}
        >
          <Text style={styles.primaryBtnText}>
            {qi + 1 >= total ? 'TERMINER L\'EXAMEN' : 'VALIDER'}
          </Text>
        </Pressable>
        <Text style={styles.note}>Pas de correction pendant l'examen — comme le vrai.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: C.bg },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  headTitle: { fontSize: 16, fontWeight: '700', color: C.text },
  closeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  bar: { flex: 1, height: 8, borderRadius: 999, backgroundColor: C.surface2, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: C.accent, borderRadius: 999 },
  timer: {
    fontWeight: '800',
    color: C.text,
    fontSize: 14,
    backgroundColor: C.surface2,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  body: { padding: 20, paddingBottom: 40, maxWidth: 640, width: '100%', alignSelf: 'center' },
  counter: { fontSize: 13, color: C.textMuted, fontWeight: '700', marginBottom: 10 },
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
  choiceSelected: { borderColor: C.blue, backgroundColor: '#E7F6FE' },
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
  optLetterSel: { backgroundColor: C.blue, borderColor: C.blue },
  optLetterText: { fontWeight: '700', fontSize: 13, color: C.textMuted },
  optText: { flex: 1, fontSize: 15, fontWeight: '700', color: C.text, lineHeight: 20 },
  primaryBtn: {
    backgroundColor: C.accent,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },
  primaryBtnDisabled: { backgroundColor: C.border },
  primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
  note: { fontSize: 12, color: C.textMuted, textAlign: 'center', marginTop: 12 },
  resultBadge: { borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 6 },
  resultScore: { fontSize: 52, fontWeight: '800' },
  resultVerdict: { fontSize: 18, fontWeight: '800', marginTop: 4, letterSpacing: 1 },
  resultSub: { fontSize: 13, color: C.textMuted, marginTop: 8 },
  summaryGrid: { flexDirection: 'row', gap: 32, marginVertical: 22, justifyContent: 'center' },
  cellN: { fontSize: 22, fontWeight: '800', color: C.text, textAlign: 'center' },
  cellL: { fontSize: 12, color: C.textMuted, textAlign: 'center' },
  reviewHeading: {
    fontSize: 12,
    letterSpacing: 1,
    color: C.textMuted,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 12,
  },
  reviewCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  reviewTop: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginBottom: 8 },
  reviewQ: { flex: 1, fontSize: 14.5, fontWeight: '700', color: C.text, lineHeight: 20 },
  reviewGood: { fontSize: 14, fontWeight: '700', color: C.success, marginBottom: 4 },
  reviewExplain: { fontSize: 13.5, color: C.textMuted, lineHeight: 19 },
  perfect: { fontSize: 16, color: C.success, fontWeight: '700', textAlign: 'center', marginVertical: 20 },
});
