import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Rect, Text } from 'react-native-svg';

const Plano = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const width = 300;
  const height = 300;
  const padding = 20;

  // Centro del recorrido (promedio)
  const sumX = data.reduce((acc, p) => acc + p.x, 0);
  const sumY = data.reduce((acc, p) => acc + p.y, 0);
  const centro = { x: sumX / data.length, y: sumY / data.length };

  // Distancia máxima en X e Y desde el centro
  const maxXDist = Math.max(...data.map(p => Math.abs(p.x - centro.x))) || 1;
  const maxYDist = Math.max(...data.map(p => Math.abs(p.y - centro.y))) || 1;

  // Escalas individuales por eje
  const availableX = (width / 2) - padding;
  const availableY = (height / 2) - padding;
  const scaleX = availableX / maxXDist;
  const scaleY = availableY / maxYDist;

  // Transformar coordenadas con escalado por eje
  const transformX = x => width / 2 + (x - centro.x) * scaleX;
  const transformY = y => height / 2 - (y - centro.y) * scaleY;

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Fondo */}
        <Rect x="0" y="0" width={width} height={height} fill="#2e2e2e" />

        {/* Ejes */}
        <Line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#888" strokeWidth="1" />
        <Line x1={width / 2} y1="0" x2={width / 2} y2={height} stroke="#888" strokeWidth="1" />

        {/* Líneas del recorrido */}
        {data.map((point, index) => {
          if (index === 0) return null;
          const prev = data[index - 1];

          return (
            <Line
              key={`line-${index}`}
              x1={transformX(prev.x)}
              y1={transformY(prev.y)}
              x2={transformX(point.x)}
              y2={transformY(point.y)}
              stroke="red"
              strokeWidth="2"
            />
          );
        })}

        {/* Puntos y etiquetas */}
        {data.map((point, index) => {
          const cx = transformX(point.x);
          const cy = transformY(point.y);

          const fillColor =
            index === 0 ? 'green' :
            index === data.length - 1 ? 'blue' :
            'white';

          return (
            <React.Fragment key={`point-${index}`}>
              <Circle cx={cx} cy={cy} r="4" fill={fillColor} />
              <Text
                x={cx + 5}
                y={cy - 5}
                fill="white"
                fontSize="10"
              >
                {index}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default Plano;
