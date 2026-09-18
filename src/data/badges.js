import { EXAM_SIZE, EXAM_PASS } from './content';

// Badges are purely derived from data already tracked in state (progress,
// streak, examBest) — no extra storage needed, so they stay in sync with
// Supabase automatically through the normal progress sync.
export const BADGES = [
  {
    id: 'first_theme',
    icon: '🎯',
    label: 'Premier thème réussi',
    description: 'Termine un thème avec au moins 1 étoile',
    isUnlocked: (state) => Object.values(state.progress || {}).some((p) => p.stars >= 1),
  },
  {
    id: 'exam_perfect',
    icon: '💯',
    label: 'Sans-faute à un examen',
    description: `Obtiens ${EXAM_SIZE}/${EXAM_SIZE} à l'examen blanc`,
    isUnlocked: (state) => (state.examBest || 0) >= EXAM_SIZE,
  },
  {
    id: 'streak_3',
    icon: '🔥',
    label: 'Série de 3 jours',
    description: 'Reviens sur l\'appli 3 jours de suite',
    isUnlocked: (state) => (state.streak || 0) >= 3,
  },
  {
    id: 'five_mastered',
    icon: '⭐',
    label: '5 thèmes maîtrisés',
    description: 'Obtiens 3 étoiles sur 5 thèmes différents',
    isUnlocked: (state) =>
      Object.values(state.progress || {}).filter((p) => p.stars >= 3).length >= 5,
  },
  {
    id: 'exam_passed',
    icon: '🚦',
    label: 'Examen réussi',
    description: `Obtiens au moins ${EXAM_PASS}/${EXAM_SIZE} à l'examen blanc`,
    isUnlocked: (state) => (state.examBest || 0) >= EXAM_PASS,
  },
];
