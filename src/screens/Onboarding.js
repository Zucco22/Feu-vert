import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useColors } from '../lib/theme';
import MascoLight from '../components/MascoLight';

const SLIDES = [
  {
    mood: 'happy',
    title: 'Bienvenue sur Feu Vert 🚦',
    text: "L'appli qui t'aide à préparer le code de la route, un thème à la fois, en t'entraînant comme dans un jeu.",
  },
  {
    mood: 'neutral',
    title: 'Comment ça marche',
    text: "Avance sur le parcours pour débloquer les thèmes, gagne de l'XP à chaque bonne réponse, monte de niveau, et teste-toi avec des examens blancs chronométrés.",
  },
  {
    mood: 'happy',
    title: 'Sauvegarde ta progression',
    text: "Crée un compte gratuit depuis l'onglet Profil, à tout moment, pour retrouver ton XP et tes thèmes sur un autre appareil.",
  },
];

export default function Onboarding({ onDone }) {
  const C = useColors();
  const styles = useMemo(() => makeStyles(C), [C]);
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  function next() {
    if (isLast) onDone();
    else setIndex((i) => i + 1);
  }

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.skipBtn} onPress={onDone} hitSlop={8}>
        <Text style={styles.skipText}>Passer</Text>
      </Pressable>

      <View style={styles.body}>
        <MascoLight mood={slide.mood} size={110} />
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <Pressable style={styles.primaryBtn} onPress={next}>
          <Text style={styles.primaryBtnText}>{isLast ? 'COMMENCER' : 'SUIVANT'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function makeStyles(C) {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: C.bg },
    skipBtn: { alignSelf: 'flex-end', padding: 18 },
    skipText: { fontSize: 14, fontWeight: '700', color: C.textMuted },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
      gap: 20,
    },
    title: { fontSize: 22, fontWeight: '800', color: C.text, textAlign: 'center' },
    text: { fontSize: 15, lineHeight: 22, color: C.textMuted, textAlign: 'center' },
    footer: { padding: 24, gap: 20 },
    dots: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.border },
    dotActive: { backgroundColor: C.accent, width: 22 },
    primaryBtn: {
      backgroundColor: C.accent,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: 'center',
    },
    primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
  });
}
