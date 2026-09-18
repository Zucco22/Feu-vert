import { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MODE_KEY = 'feuvert_thememode_v1';

// 'auto' follows the system light/dark setting; 'light'/'dark' overrides it.
// Kept in AsyncStorage only (device preference, not synced progress).
export const ThemeModeContext = createContext({ mode: 'auto', setMode: () => {} });

export function useThemeModeState() {
  const [mode, setModeState] = useState('auto');

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(MODE_KEY);
        if (raw === 'light' || raw === 'dark' || raw === 'auto') setModeState(raw);
      } catch (e) {}
    })();
  }, []);

  const setMode = useCallback((m) => {
    setModeState(m);
    AsyncStorage.setItem(MODE_KEY, m).catch(() => {});
  }, []);

  return { mode, setMode };
}
