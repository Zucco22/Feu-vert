import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ceogfyhqjnfdptkdfjct.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlb2dmeWhxam5mZHB0a2RmamN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2OTU3MDEsImV4cCI6MjEwNTI3MTcwMX0.PuMhoa0ULG-pa7iaVIAVuxNuCAUT4v3NRUPO0H46fB4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
