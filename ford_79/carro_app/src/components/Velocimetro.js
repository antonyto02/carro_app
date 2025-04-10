import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';

const posiciones = {
  '1': { x: 30, y: 40 },
  '2': { x: 80, y: 40 },
  '3': { x: 80, y: 170 },
  '4': { x: 130, y: 40 },
  '5': { x: 130, y: 170 },
  R: { x: 180, y: 40 },
  N: { x: 105, y: 100 },
};

const movimientos = {
  N: { arriba: '1', abajo: 'R' },
  '1': { arriba: '2', der: 'N'},
  '2': { abajo: '1', arriba: '3', der: 'N'},
  '3': { arriba: '4', abajo: '2', der: 'N'},
  '4': { abajo: '3', arriba: '5', der:'N'},
  '5': { abajo: '4', der: 'N'},
  R: { der: 'N' },
};

export default function PalancaBotones() {
  const [posicionActual, setPosicionActual] = useState('N');

  const mover = (direccion) => {
    const siguiente = movimientos[posicionActual]?.[direccion];
    if (siguiente) {
      setPosicionActual(siguiente);
    }
  };

  return (
    <View style={styles.container}>
      <Svg width="220" height="200">
        <Line x1="30" y1="40" x2="30" y2="170" stroke="black" strokeWidth="3" />
        <Line x1="80" y1="40" x2="80" y2="170" stroke="black" strokeWidth="3" />
        <Line x1="130" y1="40" x2="130" y2="170" stroke="black" strokeWidth="3" />
        <Line x1="180" y1="40" x2="180" y2="170" stroke="black" strokeWidth="3" />
        <Line x1="30" y1="100" x2="180" y2="100" stroke="black" strokeWidth="3" />

        {Object.entries(posiciones).map(([letra, pos]) =>
          letra !== 'N' ? (
            <SvgText
              key={letra}
              x={pos.x}
              y={pos.y - 10}
              fontSize="16"
              fill="black"
              textAnchor="middle"
            >
              {letra}
            </SvgText>
          ) : null
        )}

        <Circle
          cx={posiciones[posicionActual].x}
          cy={posiciones[posicionActual].y}
          r="10"
          fill="gray"
        />
      </Svg>

      <Text style={styles.texto}>Cambio actual: {posicionActual}</Text>

      <View style={styles.controles}>
        <TouchableOpacity onPress={() => mover('arriba')}><Text style={styles.btn}>🔼</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => mover('der')}><Text style={styles.btn}>▶️</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => mover('abajo')}><Text style={styles.btn}>🔽</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center'
  },
  texto: {
    fontSize: 18,
    marginVertical: 10,
  },
  controles: {
    alignItems: 'center',
    gap: 8,
  },
  btn: {
    fontSize: 30,
    margin: 8,
  },
});
