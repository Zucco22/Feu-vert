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
import { useColors } from '../lib/theme';
import { levelInfo } from '../lib/storage';
import { MODULES } from '../data/content';
import { BADGES } from '../data/badges';

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
