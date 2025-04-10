import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

const TituloMapeo = () => {
  return (
    <Svg height="80" width="300">
      <Defs>
        <LinearGradient id="gradiente79" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
          <Stop offset="100%" stopColor="#ffff00" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <SvgText
        fill="url(#gradiente79)"
        fontSize="48"
        fontWeight="bold"
        x="50%"
        y="60"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        Mapeo
      </SvgText>
    </Svg>
  );
};

export default TituloMapeo;