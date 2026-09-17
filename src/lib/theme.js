import { useColorScheme } from 'react-native';

const LIGHT = {
  bg: '#F5F5F5',
  surface: '#FFFFFF',
  surface2: '#EDEDF5',
  text: '#1A1A1A',
  textMuted: '#6B7280',
  border: '#E0E0E0',
  accent: '#58CC02',
  accentDark: '#46A302',
  blue: '#1CB0F6',
  blueDark: '#1899D6',
  danger: '#FF4B4B',
  dangerDark: '#EA2B2B',
  success: '#58CC02',
  amber: '#FFC800',
  amberDark: '#E6B400',
  flame: '#FF9600',
  flameDark: '#CC7A00',
  purple: '#CE82FF',
  correctBg: '#D1FAE5',
  incorrectBg: '#FEE2E2',
  selectedBg: '#E0F4FF',
  road: '#CBD2D9',
  roadLine: '#FFFFFF',
};

const DARK = {
  bg: '#111827',
  surface: '#1F2937',
  surface2: '#374151',
  text: '#F9FAFB',
  textMuted: '#9CA3AF',
  border: '#4B5563',
  accent: '#65E300',
  accentDark: '#58CC02',
  blue: '#38C5FF',
  blueDark: '#0EA5E9',
  danger: '#FF6B6B',
  dangerDark: '#EF4444',
  success: '#65E300',
  amber: '#FFD700',
  amberDark: '#F59E0B',
  flame: '#FF9500',
  flameDark: '#F97316',
  purple: '#DA8FFF',
  correctBg: '#064E3B',
  incorrectBg: '#7F1D1D',
  selectedBg: '#0C4A6E',
  road: '#2B3240',
  roadLine: '#E5E9F0',
};

export function useColors() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? DARK : LIGHT;
}

// Kept for Sign.js and any import that doesn't need reactivity
export const C = LIGHT;

export const HEARTS_START = 3;
export const XP_PER_CORRECT = 10;
