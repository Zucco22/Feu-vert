import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { C } from './src/lib/theme';
import { loadState, saveState, bumpStreak } from './src/lib/storage';
import Home from './src/screens/Home';
import Lesson from './src/screens/Lesson';
import Exam from './src/screens/Exam';

export default function App() {
  const [state, setState] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [examOpen, setExamOpen] = useState(false);

  // Load saved progress once, bump the daily streak, persist.
  useEffect(() => {
    (async () => {
      const s = bumpStreak(await loadState());
      await saveState(s);
      setState(s);
    })();
  }, []);

  // Persist and re-render whenever state changes inside a lesson.
  const commit = useCallback(async (next) => {
    const copy = { ...next, progress: { ...next.progress }, history: [...next.history] };
    setState(copy);
    await saveState(copy);
  }, []);

  if (!state) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      {examOpen ? (
        <Exam state={state} onCommit={commit} onExit={() => setExamOpen(false)} />
      ) : activeModule ? (
        <Lesson
          mod={activeModule}
          state={state}
          onCommit={commit}
          onExit={() => setActiveModule(null)}
        />
      ) : (
        <Home
          state={state}
          onOpenModule={setActiveModule}
          onOpenExam={() => setExamOpen(true)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  loading: { flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' },
});
