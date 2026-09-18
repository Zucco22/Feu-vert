import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useColors, XP_PER_CORRECT, EXAM_XP_PER_CORRECT } from '../lib/theme';
import { levelInfo } from '../lib/storage';
import { MODULES, EXAM_SIZE } from '../data/content';
import { BADGES } from '../data/badges';

const DAY_LETTERS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

// History entries only store the % and the XP earned, not the raw question
// count, so we back it out from the XP-per-correct-answer for that kind of
// session. History is capped to the last 30 sessions, so this is a recent
// count, not a lifetime total.
function estimateAnsweredQuestions(history) {
  let total = 0;
  for (const h of history || []) {
    if (!h.pct) continue;
    const perCorrect = h.title === 'Examen blanc' ? EXAM_XP_PER_CORRECT : XP_PER_CORRECT;
    const correct = Math.round(h.xp / perCorrect);
    const count = Math.round(correct / (h.pct / 100));
    if (Number.isFinite(count) && count > 0) total += count;
  }
  return total;
}

// Sums XP earned per day (from history) for the last 7 days, oldest first.
function last7DaysXp(history) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ iso: d.toISOString().slice(0, 10), dow: d.getDay(), xp: 0 });
  }
  const byDate = new Map(days.map((d) => [d.iso, d]));
  for (const h of history || []) {
    const day = byDate.get(h.date);
    if (day) day.xp += h.xp || 0;
  }
  return days;
}

export default function Profile({ state, auth }) {
  const C = useColors();
  const styles = useMemo(() => makeStyles(C), [C]);
  const { loading, user, signIn, signUp, signOut } = auth;
  const lvl = levelInfo(state.xp);
  const done = Object.keys(state.progress).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Profil</Text>

      <View style={styles.card}>
        <View style={styles.statsRow}>
          <Stat C={C} label="Niveau" value={lvl.name} />
          <Stat C={C} label="XP" value={state.xp} />
          <Stat C={C} label="Série" value={`${state.streak} 🔥`} />
        </View>
        <View style={styles.statsRow}>
          <Stat C={C} label="Thèmes" value={`${done}/${MODULES.length}`} />
          <Stat C={C} label="Record examen" value={state.examBest ? `${state.examBest}/40` : '—'} />
        </View>
      </View>

      <BadgesCard C={C} styles={styles} state={state} />

      <StatsCard C={C} styles={styles} state={state} />

      {loading ? (
        <View style={[styles.card, { alignItems: 'center' }]}>
          <ActivityIndicator color={C.accent} />
        </View>
      ) : user ? (
        <AccountCard C={C} styles={styles} user={user} onSignOut={signOut} />
      ) : (
        <AuthCard C={C} styles={styles} signIn={signIn} signUp={signUp} />
      )}
    </ScrollView>
  );
}

function BadgesCard({ C, styles, state }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Badges</Text>
      <View style={styles.badgeGrid}>
        {BADGES.map((b) => {
          const unlocked = b.isUnlocked(state);
          return (
            <View key={b.id} style={[styles.badgeItem, !unlocked && styles.badgeItemLocked]}>
              <Text style={[styles.badgeIcon, !unlocked && styles.badgeIconLocked]}>{b.icon}</Text>
              <Text style={[styles.badgeLabel, !unlocked && { color: C.textMuted }]}>{b.label}</Text>
              <Text style={styles.badgeDesc}>{b.description}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function StatsCard({ C, styles, state }) {
  const answered = estimateAnsweredQuestions(state.history);
  const week = last7DaysXp(state.history);
  const maxXp = Math.max(1, ...week.map((d) => d.xp));
  const attempted = MODULES.filter((m) => state.progress[m.id]);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Statistiques</Text>

      <View style={styles.statsRow}>
        <Stat C={C} label="Questions répondues" value={answered} />
        <Stat C={C} label="Meilleur score examen" value={state.examBest ? `${state.examBest}/${EXAM_SIZE}` : '—'} />
      </View>
      <Text style={styles.hint}>
        « Questions répondues » couvre les 30 dernières sessions (historique conservé par l'appli).
      </Text>

      <Text style={styles.subTitle}>XP gagné — 7 derniers jours</Text>
      <View style={styles.chartRow}>
        {week.map((d, i) => (
          <View key={i} style={styles.chartCol}>
            <View style={styles.chartBarTrack}>
              <View
                style={[
                  styles.chartBar,
                  { height: `${Math.max(4, Math.round((d.xp / maxXp) * 100))}%` },
                ]}
              />
            </View>
            <Text style={styles.chartLabel}>{DAY_LETTERS[d.dow]}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subTitle}>Taux de réussite par thème</Text>
      {attempted.length === 0 ? (
        <Text style={styles.hint}>Termine un premier thème pour voir tes statistiques ici.</Text>
      ) : (
        <View style={{ gap: 10 }}>
          {attempted.map((m) => {
            const p = state.progress[m.id];
            return (
              <View key={m.id}>
                <View style={styles.themeRowTop}>
                  <Text style={styles.themeRowTitle} numberOfLines={1}>
                    {m.title}
                  </Text>
                  <Text style={styles.themeRowPct}>{p.bestPct}%</Text>
                </View>
                <View style={styles.themeTrack}>
                  <View style={[styles.themeTrackFill, { width: `${p.bestPct}%` }]} />
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function Stat({ C, label, value }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: '800', color: C.text }}>{value}</Text>
      <Text style={{ fontSize: 12, marginTop: 2, color: C.textMuted }}>{label}</Text>
    </View>
  );
}

function AccountCard({ C, styles, user, onSignOut }) {
  const [busy, setBusy] = useState(false);
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Compte</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.hint}>Ta progression est synchronisée avec le cloud.</Text>
      <Pressable
        style={[styles.primaryBtn, { backgroundColor: C.danger }]}
        disabled={busy}
        onPress={async () => {
          setBusy(true);
          await onSignOut();
          setBusy(false);
        }}
      >
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>SE DÉCONNECTER</Text>}
      </Pressable>
    </View>
  );
}

function AuthCard({ C, styles, signIn, signUp }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState(false);

  async function submit() {
    if (!email.trim() || !password) {
      setError('Renseigne un email et un mot de passe.');
      return;
    }
    setBusy(true);
    setError(null);
    setConfirmMsg(false);
    const res = mode === 'signin' ? await signIn(email.trim(), password) : await signUp(email.trim(), password);
    setBusy(false);
    if (res.error) {
      setError(res.error);
    } else if (mode === 'signup' && res.needsConfirmation) {
      setConfirmMsg(true);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Mode local</Text>
      <Text style={styles.hint}>
        L'appli fonctionne sans compte, ta progression reste sur cet appareil. Connecte-toi pour la
        sauvegarder dans le cloud et la retrouver sur un autre appareil.
      </Text>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={C.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor={C.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {confirmMsg ? (
          <Text style={styles.confirm}>Compte créé ! Vérifie tes emails pour confirmer ton compte.</Text>
        ) : null}

        <Pressable style={styles.primaryBtn} disabled={busy} onPress={submit}>
          {busy ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryBtnText}>
              {mode === 'signin' ? 'SE CONNECTER' : "CRÉER UN COMPTE"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
            setError(null);
            setConfirmMsg(false);
          }}
          style={{ marginTop: 14, alignItems: 'center' }}
        >
          <Text style={styles.switchLink}>
            {mode === 'signin' ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

function makeStyles(C) {
  return StyleSheet.create({
    container: { padding: 16, paddingBottom: 48, maxWidth: 640, width: '100%', alignSelf: 'center' },
    h1: { fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 16 },
    card: {
      backgroundColor: C.surface2,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
    },
    statsRow: { flexDirection: 'row', marginBottom: 12 },
    sectionTitle: { fontSize: 15, fontWeight: '800', color: C.text, marginBottom: 8 },
    badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    badgeItem: {
      width: '47%',
      backgroundColor: C.surface,
      borderWidth: 1.5,
      borderColor: C.amber,
      borderRadius: 14,
      padding: 12,
      alignItems: 'center',
    },
    badgeItemLocked: { borderColor: C.border, opacity: 0.6 },
    badgeIcon: { fontSize: 26, marginBottom: 6 },
    badgeIconLocked: { opacity: 0.4 },
    badgeLabel: {
      fontSize: 12.5,
      fontWeight: '800',
      color: C.text,
      textAlign: 'center',
      marginBottom: 3,
    },
    badgeDesc: { fontSize: 10.5, color: C.textMuted, textAlign: 'center', lineHeight: 14 },

    subTitle: {
      fontSize: 12,
      letterSpacing: 0.5,
      color: C.textMuted,
      fontWeight: '700',
      textTransform: 'uppercase',
      marginTop: 16,
      marginBottom: 10,
    },
    chartRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 90,
    },
    chartCol: { flex: 1, alignItems: 'center', gap: 6 },
    chartBarTrack: {
      width: 16,
      height: 70,
      borderRadius: 8,
      backgroundColor: C.surface,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    chartBar: { width: '100%', backgroundColor: C.blue, borderRadius: 8 },
    chartLabel: { fontSize: 10.5, color: C.textMuted, fontWeight: '700' },

    themeRowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    themeRowTitle: { flex: 1, fontSize: 13, fontWeight: '700', color: C.text, marginRight: 8 },
    themeRowPct: { fontSize: 12.5, fontWeight: '800', color: C.accentDark },
    themeTrack: { height: 6, borderRadius: 999, backgroundColor: C.surface, overflow: 'hidden' },
    themeTrackFill: { height: '100%', backgroundColor: C.accent, borderRadius: 999 },
    email: { fontSize: 15, fontWeight: '700', color: C.accentDark, marginBottom: 6 },
    hint: { fontSize: 12.5, color: C.textMuted, lineHeight: 18, marginBottom: 14 },
    input: {
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 14,
      fontSize: 15,
      color: C.text,
      marginBottom: 10,
    },
    error: { color: C.danger, fontSize: 12.5, marginBottom: 10, fontWeight: '600' },
    confirm: { color: C.success, fontSize: 12.5, marginBottom: 10, fontWeight: '600' },
    primaryBtn: {
      backgroundColor: C.accent,
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 4,
    },
    primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
    switchLink: { color: C.blueDark, fontSize: 13, fontWeight: '700' },
  });
}
