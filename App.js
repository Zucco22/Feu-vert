import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ActivityIndicator, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useColors } from './src/lib/theme';
import { loadState, saveState, bumpStreak, mergeStates } from './src/lib/storage';
import { useAuth } from './src/lib/auth';
import { fetchCloudProgress, pushCloudProgress } from './src/lib/cloudSync';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Lesson from './src/screens/Lesson';
import Exam from './src/screens/Exam';
import Settings from './src/screens/Settings';
import TabBar from './src/components/TabBar';

export default function App() {
  const C = useColors();
  const scheme = useColorScheme();
  const auth = useAuth();
  const [state, setState] = useState(null);
  const [tab, setTab] = useState('home');
  const [activeModule, setActiveModule] = useState(null);
  const [examOpen, setExamOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const syncedUserId = useRef(null);

  useEffect(() => {
    (async () => {
      const s = bumpStreak(await loadState());
      await saveState(s);
      setState(s);
    })();
  }, []);

  // On login, merge local progress with whatever's already saved in the
  // cloud (keeping the best of both), then save the merged result on both sides.
  useEffect(() => {
    if (!auth.user) {
      syncedUserId.current = null;
      return;
    }
    if (!state || syncedUserId.current === auth.user.id) return;
    syncedUserId.current = auth.user.id;
    (async () => {
      const cloud = await fetchCloudProgress(auth.user.id);
      const merged = mergeStates(state, cloud);
      setState(merged);
      await saveState(merged);
      await pushCloudProgress(auth.user.id, merged);
    })();
  }, [auth.user, state]);

  const commit = useCallback(
    async (next) => {
      const copy = { ...next, progress: { ...next.progress }, history: [...next.history] };
      setState(copy);
      await saveState(copy);
      if (auth.user) pushCloudProgress(auth.user.id, copy);
    },
    [auth.user]
  );

  if (!state) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={C.bg}
      />
      {examOpen ? (
        <Exam state={state} onCommit={commit} onExit={() => setExamOpen(false)} />
      ) : activeModule ? (
        <Lesson
          mod={activeModule}
          state={state}
          onCommit={commit}
          onExit={() => setActiveModule(null)}
        />
      ) : settingsOpen ? (
        <Settings state={state} onCommit={commit} onExit={() => setSettingsOpen(false)} />
      ) : (
        <>
          <View style={{ flex: 1 }}>
            {tab === 'home' ? (
              <Home
                state={state}
                onOpenModule={setActiveModule}
                onOpenExam={() => setExamOpen(true)}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            ) : (
              <Profile state={state} auth={auth} />
            )}
          </View>
          <TabBar tab={tab} onChange={setTab} />
        </>
      )}
    </SafeAreaView>
  );
}
