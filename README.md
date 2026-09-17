# 🚦 Feu Vert — appli mobile (Code de la route)

Version mobile de ton prototype "Feu Vert" : apprentissage du Code de la route
à la façon Duolingo (parcours, XP, série/streak, cœurs, niveaux, quiz).
Construit avec **React Native + Expo**. Tout le contenu de ton prototype
(8 thèmes, 48 questions, panneaux) a été repris à l'identique.

---

## 1. Ce qu'il te faut (une seule fois)

1. **Node.js** (version 18 ou plus) → https://nodejs.org (prendre la version "LTS")
2. **Git** → https://git-scm.com
3. Sur ton téléphone : l'appli **Expo Go** (App Store / Play Store)
4. Un compte **GitHub** (gratuit) → https://github.com

Pour vérifier que Node et Git sont installés, ouvre un terminal et tape :

```bash
node -v
git --version
```

---

## 2. Lancer l'appli sur ton téléphone

Dans le dossier du projet :

```bash
npm install            # installe les dépendances (1ère fois seulement)
npx expo start         # démarre l'appli
```

Un **QR code** s'affiche. Ouvre **Expo Go** sur ton téléphone et scanne-le
(le téléphone et l'ordinateur doivent être sur le même Wi-Fi).
L'appli se recharge automatiquement à chaque modification du code.

> ⚠️ Si `npm install` râle sur les versions, lance :
> `npx expo install expo react-native react-native-svg @react-native-async-storage/async-storage`
> Expo choisira les versions exactes compatibles avec ta version d'Expo.

Pour tester dans le navigateur (pratique et rapide) : `npx expo start --web`.

---

## 3. Structure du projet

```
feu-vert/
├─ App.js                  # point d'entrée : charge la progression, aiguille les écrans
├─ index.js                # enregistre l'app pour Expo
├─ app.json                # config Expo (nom, icône, identifiants)
├─ src/
│  ├─ data/content.js      # ⭐ TOUT le contenu : thèmes, questions, panneaux (SVG)
│  ├─ lib/theme.js         # couleurs + réglages (cœurs, XP par bonne réponse)
│  ├─ lib/storage.js       # progression sauvegardée sur le téléphone + niveaux/streak
│  ├─ components/Sign.js   # affiche un panneau SVG
│  └─ screens/
│     ├─ Home.js           # le parcours (liste des thèmes, XP, niveau, série)
│     └─ Lesson.js         # leçon → quiz → résultat
└─ assets/                 # icônes
```

Pour **ajouter ou corriger une question**, tu ouvres `src/data/content.js`.
Dans chaque question, **la 1ère réponse (`choices[0]`) est la bonne** ; les
réponses sont mélangées automatiquement à l'affichage.

---

## 4. Mettre le code sur GitHub

D'abord crée un dépôt vide sur GitHub (bouton **New** → nom `feu-vert` →
**Create repository**, ne coche rien). GitHub t'affiche alors une adresse
`https://github.com/TON-PSEUDO/feu-vert.git`.

Ensuite, dans le dossier du projet :

```bash
git init
git add .
git commit -m "Feu Vert : version mobile initiale"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/feu-vert.git
git push -u origin main
```

Ensuite, à chaque fois que tu changes quelque chose :

```bash
git add .
git commit -m "décris ce que tu as changé"
git push
```

> `node_modules/` n'est PAS envoyé sur GitHub (c'est normal, c'est dans le
> `.gitignore`). Quelqu'un qui récupère le projet refait juste `npm install`.

---

## 5. Continuer avec Claude Code

**Claude Code** = Claude dans ton terminal, qui écrit/modifie directement les
fichiers du projet.

```bash
npm install -g @anthropic-ai/claude-code   # installe (une fois)
cd feu-vert                                # va dans le dossier du projet
claude                                     # lance Claude Code
```

Ensuite tu lui parles en français, par exemple :

- « Ajoute un **mode examen blanc** : 40 questions tirées au hasard, réussite à 35/40, chrono. »
- « Ajoute le **mode sombre** (dark mode) en suivant le thème du prototype. »
- « Ajoute un **écran Statistiques** avec l'historique des leçons et un graphe des XP. »
- « Fais que la série (streak) affiche un rappel si je n'ai pas révisé aujourd'hui. »
- « Ajoute 10 questions sur les **premiers secours** dans un nouveau thème. »

Claude Code modifie les fichiers, tu vois le résultat en direct dans Expo Go,
puis tu fais `git add . && git commit && git push` pour sauvegarder.

---

## 6. Prochaines étapes (idées de roadmap)

| Étape | Ce que ça apporte | Difficulté |
|-------|-------------------|-----------|
| Mode examen blanc (40 Q, chrono) | Cœur du produit "Code" | facile |
| Mode sombre | Confort | facile |
| Écran statistiques / historique | Rétention | moyen |
| **Comptes + sauvegarde dans le cloud (Supabase)** | Progression sur plusieurs appareils | moyen |
| Notifications ("révise aujourd'hui !") | Rétention | moyen |
| Publier sur l'App Store / Play Store (EAS Build) | Vraie appli téléchargeable | avancé |

### À propos du bouton "demander à l'IA"
Le prototype avait un bouton qui interrogeait Claude en direct. Ça ne
fonctionne QUE dans l'artefact publié sur claude.ai. Il n'a pas été repris ici.
Pour le remettre dans une vraie appli, il faudra appeler une API (Claude ou
autre) **depuis un petit serveur à toi** (jamais avec une clé API en dur dans
l'appli). Claude Code peut t'aider à le faire quand tu en seras là.

### Sauvegarde cloud (Supabase) — quand tu voudras des comptes
Aujourd'hui la progression est stockée **sur le téléphone** (elle disparaît si
on désinstalle l'appli). Pour qu'un utilisateur retrouve sa progression partout,
l'étape suivante est Supabase (base Postgres + connexion). Le fichier
`src/lib/storage.js` est déjà isolé exprès : il suffira d'y remplacer la lecture
/écriture locale par des appels Supabase, sans toucher au reste.

---

Bon code, et bonne route 🚗💨
