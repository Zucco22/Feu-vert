import React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

// Traffic-light mascot. mood: 'happy' (green on), 'sad' (red on), 'neutral' (amber on).
export default function MascoLight({ mood = 'neutral', size = 80 }) {
  const W = 70, H = 150;
  const h = Math.round((size / W) * H);

  const redOn = mood === 'sad';
  const amberOn = mood === 'neutral';
  const greenOn = mood === 'happy';

  const redFill = redOn ? '#FF3A3A' : '#2D0000';
  const amberFill = amberOn ? '#FFD60A' : '#2D1E00';
  const greenFill = greenOn ? '#44E200' : '#002B00';

  const CY_RED = 35, CY_AMB = 72, CY_GRN = 109;
  const faceY = redOn ? CY_RED : greenOn ? CY_GRN : CY_AMB;
  const eyeY = faceY - 6;
  const mouthY = faceY + 5;
  const ex1 = 28, ex2 = 42;

  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      {/* Housing */}
      <Rect x={8} y={4} width={54} height={126} rx={12} fill="#1B1F27" />
      <Rect x={11} y={7} width={48} height={120} rx={9} fill="#252A35" />

      {/* Lights */}
      <Circle cx={35} cy={CY_RED} r={17} fill={redFill} />
      <Circle cx={35} cy={CY_AMB} r={17} fill={amberFill} />
      <Circle cx={35} cy={CY_GRN} r={17} fill={greenFill} />

      {/* Glow on the active light */}
      {redOn && <Circle cx={35} cy={CY_RED} r={21} fill="rgba(255,80,80,0.2)" />}
      {amberOn && <Circle cx={35} cy={CY_AMB} r={21} fill="rgba(255,214,10,0.2)" />}
      {greenOn && <Circle cx={35} cy={CY_GRN} r={21} fill="rgba(68,226,0,0.2)" />}

      {/* Eyes */}
      <Circle cx={ex1} cy={eyeY} r={2.8} fill="white" />
      <Circle cx={ex2} cy={eyeY} r={2.8} fill="white" />

      {/* Mouth */}
      {mood === 'happy' && (
        <Path
          d={`M${ex1 - 1},${mouthY} Q35,${mouthY + 10} ${ex2 + 1},${mouthY}`}
          stroke="white" strokeWidth={2.2} fill="none" strokeLinecap="round"
        />
      )}
      {mood === 'sad' && (
        <Path
          d={`M${ex1 - 1},${mouthY + 9} Q35,${mouthY} ${ex2 + 1},${mouthY + 9}`}
          stroke="white" strokeWidth={2.2} fill="none" strokeLinecap="round"
        />
      )}
      {mood === 'neutral' && (
        <Path
          d={`M${ex1 - 1},${mouthY + 4} L${ex2 + 1},${mouthY + 4}`}
          stroke="white" strokeWidth={2.2} fill="none" strokeLinecap="round"
        />
      )}

      {/* Pole */}
      <Rect x={30} y={130} width={10} height={12} rx={3} fill="#1B1F27" />
      <Rect x={19} y={139} width={32} height={7} rx={3} fill="#1B1F27" />
    </Svg>
  );
}
