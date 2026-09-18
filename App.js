import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColors, useEffectiveScheme } from './src/lib/theme';
import { ThemeModeContext, useThemeModeState } from './src/lib/themeMode';
import { loadState, saveState, bumpStreak, mergeStates } from './src/lib/storage';
import { syncDailyReminder } from './src/lib/notifications';
import { useAuth } from './src/lib/auth';
import { fetchCloudProgress, pushCloudProgress } from './src/lib/cloudSync';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Lesson from './src/screens/Lesson';
import Exam from './src/screens/Exam';
import Settings from './src/screens/Settings';
import Onboarding from './src/screens/Onboarding';
import TabBar from './src/components/TabBar';

const ONBOARDING_KEY = 'feuvert_onboarding_v1';

export default function App() {
  const themeModeState = useThemeModeState();
  return (
    <ThemeModeContext.Provider value={themeModeState}>
      <AppInner />
    </ThemeModeContext.Provider>
  );
}

function AppInner() {
  const C = useColors();
  const scheme = useEffectiveScheme();
  const auth = useAuth();
  const [state, setState] = useState(null);
  const [tab, setTab] = useState('home');
  const [activeModule, setActiveModule] = useState(null);
  const [examOpen, setExamOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(undefined); // undefined = still loading
  const syncedUserId = useRef(null);

  useEffect(() => {
    (async () => {
      const s = bumpStreak(await loadState());
      await saveState(s);
      setState(s);
      syncDailyReminder(s).catch(() => {});
    })();
    (async () => {
      let seen = false;
      try {
        seen = (await AsyncStorage.getItem(ONBOARDING_KEY)) === '1';
      } catch (e) {}
      setOnboardingDone(seen);
    })();
  }, []);

  const finishOnboarding = useCallback(() => {
    setOnboardingDone(true);
    AsyncStorage.setItem(ONBOARDING_KEY, '1').catch(() => {});
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
      syncDailyReminder(merged).catch(() => {});
      await pushCloudProgress(auth.user.id, merged);
    })();
  }, [auth.user, state]);

  const commit = useCallback(
    async (next) => {
      const copy = { ...next, progress: { ...next.progress }, history: [...next.history] };
      setState(copy);
      await saveState(copy);
      syncDailyReminder(copy).catch(() => {});
      if (auth.user) pushCloudProgress(auth.user.id, copy);
    },
    [auth.user]
  );

  if (!state || onboardingDone === undefined) {
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
      {!onboardingDone ? (
        <Onboarding onDone={finishOnboarding} />
      ) : examOpen ? (
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
