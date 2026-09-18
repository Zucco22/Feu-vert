import { supabase } from './supabase';

// Fetch the saved progress blob for a user, or null if there's none yet
// (new account, or the request failed — we never want this to break the app).
export async function fetchCloudProgress(userId) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('data')
      .eq('user_id', userId)
      .maybeSingle();
    if (error || !data) return null;
    return data.data || null;
  } catch (e) {
    return null;
  }
}

// Upsert the full progress state for a user. Best-effort: offline or table
// errors are swallowed so cloud sync never blocks local usage.
export async function pushCloudProgress(userId, state) {
  try {
    await supabase.from('progress').upsert({ user_id: userId, data: state });
  } catch (e) {}
}
