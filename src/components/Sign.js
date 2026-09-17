import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// The prototype's signs/scenes are SVG strings. react-native-svg renders them
// natively with SvgXml — no change to the artwork needed.
export default function Sign({ xml, size = 44, style }) {
  if (!xml) return null;
  return (
    <View style={[{ width: size, height: size }, style]}>
      <SvgXml xml={xml} width="100%" height="100%" />
    </View>
  );
}
