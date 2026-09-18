import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

// Wraps Supabase auth so the rest of the app can stay in "mode local" when
// there's no session, and pick up the user + email once signed in.
export function useAuth() {
  const [session, setSession] = useState(undefined); // undefined = still loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  }, []);

  const signUp = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message, needsConfirmation: false };
    // If email confirmation is required, Supabase returns a user but no session yet.
    return { error: null, needsConfirmation: !data.session };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return {
    loading: session === undefined,
    user: session ? session.user : null,
    signIn,
    signUp,
    signOut,
  };
}
