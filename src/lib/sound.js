import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';

const MUTE_KEY = 'feuvert_muted_v1';

const correctSound = require('../../assets/sounds/correct.wav');
const incorrectSound = require('../../assets/sounds/incorrect.wav');
const completeSound = require('../../assets/sounds/complete.wav');

let audioModeReady = false;
function ensureAudioMode() {
  if (audioModeReady) return;
  audioModeReady = true;
  setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: false }).catch(() => {});
}

// Mute preference, memorized on-device so it survives navigation and app restarts.
export function useMuted() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(MUTE_KEY);
        if (raw != null) setMuted(raw === '1');
      } catch (e) {}
    })();
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      AsyncStorage.setItem(MUTE_KEY, next ? '1' : '0').catch(() => {});
      return next;
    });
  }, []);

  return [muted, toggleMuted];
}

// Short sound effects: correct answer, wrong answer, lesson passed.
export function useSoundEffects(muted) {
  const correctPlayer = useAudioPlayer(correctSound);
  const incorrectPlayer = useAudioPlayer(incorrectSound);
  const completePlayer = useAudioPlayer(completeSound);

  useEffect(() => {
    ensureAudioMode();
  }, []);

  const fire = useCallback(
    (player) => {
      if (muted) return;
      try {
        player.seekTo(0);
        player.play();
      } catch (e) {}
    },
    [muted]
  );

  return {
    playCorrect: useCallback(() => fire(correctPlayer), [fire, correctPlayer]),
    playIncorrect: useCallback(() => fire(incorrectPlayer), [fire, incorrectPlayer]),
    playComplete: useCallback(() => fire(completePlayer), [fire, completePlayer]),
  };
}
