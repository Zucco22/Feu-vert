import AsyncStorage from '@react-native-async-storage/async-storage';
import { LEVELS } from '../data/content';

// Mirrors the prototype's localStorage state, but persisted on-device.
// Cloud sync (Supabase, when signed in) lives in cloudSync.js and merges in via mergeStates below.

const STORE_KEY = 'feuvert_state_v1';

const EMPTY = {
  xp: 0,
  streak: 0,
  lastActive: null,
  progress: {},
  history: [],
  mistakes: [],
  dailyGoal: 20,
  xpToday: 0,
  xpTodayDate: null,
};

export async function loadState() {
  try {
    const raw = await AsyncStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return {
        ...EMPTY,
        ...s,
        progress: s.progress || {},
        history: s.history || [],
        mistakes: s.mistakes || [],
      };
    }
  } catch (e) {}
  return { ...EMPTY };
}

export async function saveState(state) {
  try {
    await AsyncStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {}
}

// Merge a local and a cloud state after login: always keep the best of both
// sides (higher XP, union of theme completions, best exam score) so neither
// device loses progress.
export function mergeStates(local, cloud) {
  if (!cloud) return local;
  if (!local) return cloud;

  const progress = { ...local.progress };
  for (const id of Object.keys(cloud.progress || {})) {
    const c = cloud.progress[id];
    const l = progress[id];
    progress[id] = l
      ? { bestPct: Math.max(l.bestPct, c.bestPct), stars: Math.max(l.stars, c.stars) }
      : c;
  }

  const seen = new Set();
  const history = [...(local.history || []), ...(cloud.history || [])].filter((h) => {
    const key = `${h.date}|${h.title}|${h.pct}|${h.xp}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  history.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  const mistakesById = new Map();
  for (const m of [...(local.mistakes || []), ...(cloud.mistakes || [])]) {
    const existing = mistakesById.get(m.id);
    if (!existing || m.addedAt < existing.addedAt) mistakesById.set(m.id, m);
  }

  // The daily XP counter only makes sense for the most recent of the two
  // dates; on a tie, keep whichever device logged more XP today.
  const xpTodayDate = [local.xpTodayDate, cloud.xpTodayDate].filter(Boolean).sort().pop() || null;
  const xpToday =
    local.xpTodayDate === cloud.xpTodayDate
      ? Math.max(local.xpToday || 0, cloud.xpToday || 0)
      : (local.xpTodayDate || '') >= (cloud.xpTodayDate || '')
      ? local.xpToday || 0
      : cloud.xpToday || 0;

  return {
    xp: Math.max(local.xp || 0, cloud.xp || 0),
    streak: Math.max(local.streak || 0, cloud.streak || 0),
    lastActive: [local.lastActive, cloud.lastActive].filter(Boolean).sort().pop() || null,
    progress,
    history: history.slice(0, 30),
    examBest: Math.max(local.examBest || 0, cloud.examBest || 0),
    mistakes: Array.from(mistakesById.values()),
    dailyGoal: local.dailyGoal || cloud.dailyGoal || 20,
    xpToday,
    xpTodayDate,
  };
}

// ---- Mode "Révise tes erreurs" ----
// A mistake is identified by the module id + the question's index within
// that module's `questions` array, which stays stable across shuffles.
export function mistakeId(modId, qIndex) {
  return `${modId}#${qIndex}`;
}

export function addMistake(mistakes, modId, qIndex) {
  const id = mistakeId(modId, qIndex);
  if ((mistakes || []).some((m) => m.id === id)) return mistakes;
  return [...(mistakes || []), { id, modId, qIndex, addedAt: Date.now() }];
}

export function removeMistake(mistakes, modId, qIndex) {
  const id = mistakeId(modId, qIndex);
  return (mistakes || []).filter((m) => m.id !== id);
}

// Records a finished "Révise tes erreurs" session: awards XP and logs
// history, but never touches module progress/stars (it isn't tied to one module).
export function recordReviewResult(state, correct, total, gainedXp) {
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
  state.xp += gainedXp;
  state.history.unshift({
    date: new Date().toISOString().slice(0, 10),
    title: 'Révision des erreurs',
    pct,
    xp: gainedXp,
  });
  state.history = state.history.slice(0, 30);
  const goalJustReached = addDailyXp(state, gainedXp);
  return { pct, stars, goalJustReached };
}

// ---- Objectif quotidien d'XP ----
// Tracks XP earned "today" (resets when the stored date differs from
// today's), independently from the lifetime XP total. Returns true if this
// call is what pushed xpToday from below the goal to at/above it.
export function addDailyXp(state, amount) {
  const todayISO = new Date().toISOString().slice(0, 10);
  if (state.xpTodayDate !== todayISO) {
    state.xpToday = 0;
    state.xpTodayDate = todayISO;
  }
  const before = state.xpToday || 0;
  state.xpToday = before + amount;
  const goal = state.dailyGoal || 20;
  return before < goal && state.xpToday >= goal;
}

// Increment the daily streak (same rule as the prototype).
export function bumpStreak(state) {
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);
  if (state.lastActive !== todayISO) {
    const y = new Date(today);
    y.setDate(y.getDate() - 1);
    const yISO = y.toISOString().slice(0, 10);
    state.streak = state.lastActive === yISO ? (state.streak || 0) + 1 : 1;
    state.lastActive = todayISO;
  } else if (!state.streak) {
    state.streak = 1;
  }
  return state;
}

export function levelInfo(xp) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) idx = i;
  }
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const pct = next ? Math.round(((xp - cur.min) / (next.min - cur.min)) * 100) : 100;
  return { name: cur.name, next, pct, xp };
}

// Record a finished lesson: award XP, save best score + stars, add to history.
export function recordResult(state, mod, correct, total, gainedXp) {
  const pct = Math.round((correct / total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
  const prev = state.progress[mod.id] || { bestPct: 0, stars: 0 };
  state.progress[mod.id] = {
    bestPct: Math.max(prev.bestPct, pct),
    stars: Math.max(prev.stars, stars),
  };
  state.xp += gainedXp;
  state.history.unshift({
    date: new Date().toISOString().slice(0, 10),
    title: mod.title,
    pct,
    xp: gainedXp,
  });
  state.history = state.history.slice(0, 30);
  const goalJustReached = addDailyXp(state, gainedXp);
  return { pct, stars, goalJustReached };
}
