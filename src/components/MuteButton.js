import React from 'react';
import { Pressable, Text } from 'react-native';
import { useColors } from '../lib/theme';

export default function MuteButton({ muted, onToggle, size = 18, style }) {
  const C = useColors();
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      style={[
        {
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: C.surface2,
          borderWidth: 1,
          borderColor: C.border,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: size }}>{muted ? '🔇' : '🔊'}</Text>
    </Pressable>
  );
}
