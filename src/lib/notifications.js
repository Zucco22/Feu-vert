import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Local, on-device rappel only — no push token, no server involved.
const REMINDER_ID = 'feuvert-daily-reminder';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function getNotificationPermission() {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  } catch (e) {
    return 'undetermined';
  }
}

// Asks the user cleanly; returns whether we're now allowed to notify.
export async function requestNotificationPermission() {
  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.status === 'granted') return true;
    const { status } = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    return status === 'granted';
  } catch (e) {
    return false;
  }
}

export async function cancelDailyReminder() {
  try {
    await Notifications.cancelScheduledNotificationAsync(REMINDER_ID);
  } catch (e) {}
}

export async function scheduleDailyReminder(hour, minute = 0) {
  await cancelDailyReminder();
  const trigger =
    Platform.OS === 'ios'
      ? { type: Notifications.SchedulableTriggerInputTypes.CALENDAR, hour, minute, repeats: true }
      : { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute };
  try {
    await Notifications.scheduleNotificationAsync({
      identifier: REMINDER_ID,
      content: {
        title: 'Feu Vert',
        body: 'Révise ton code pour garder ta série 🔥',
        sound: true,
      },
      trigger,
    });
  } catch (e) {}
}

// Makes the on-device schedule match the saved preference, without ever
// prompting for permission itself (that only happens when the user flips
// the switch in Réglages). Called on load, after cloud merge, and after
// every commit so a setting synced from another device takes effect here.
export async function syncDailyReminder(state) {
  if (!state.notifEnabled) {
    await cancelDailyReminder();
    return;
  }
  const status = await getNotificationPermission();
  if (status !== 'granted') return;
  await scheduleDailyReminder(state.notifHour ?? 19, state.notifMinute ?? 0);
}
