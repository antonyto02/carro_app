import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import Velocimetro from '../components/Velocimetro';
import Navbar from "../components/Navbar";

const API_URL = 'http://192.168.8.2:8000/api/control-luces/';

const Tablero = () => {
  const [speed, setSpeed] = useState(0);
  const [luces, setLuces] = useState('apagado');
  const [mensaje, setMensaje] = useState(null);
  const lastTap = useRef(null);
  const [states, setStates] = useState({
    'intermitente_izquierda': false,
    'intermitente_derecha': false,
    'intermitentes': false,
  });

  const toggleState = (action) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms
  
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Doble tap → apagar
      lastTap.current = null;
      sendEstado(action, false);
    } else {
      // Primer tap → esperar por si hay doble
      lastTap.current = now;
      setTimeout(() => {
        if (lastTap.current) {
          sendEstado(action, true); // encender
          lastTap.current = null;
        }
      }, DOUBLE_TAP_DELAY);
    }
  };

  const toggleLuces = () => {
    let nextState;
    let jsonData;
  
    if (luces === 'apagado') {
      nextState = 'bajas_1';
      jsonData = { led: 'bajas', accion: 'on' };
    } else if (luces === 'bajas_1') {
      nextState = 'altas';
      jsonData = { led: 'altas', accion: 'on' };
    } else if (luces === 'altas') {
      nextState = 'bajas_2';
      jsonData = { led: 'bajas', accion: 'on' };
    } else if (luces === 'bajas_2') {
      nextState = 'apagado';
      jsonData = { led: 'altas', accion: 'off' };
    }
  
    setLuces(nextState);
  
    console.log('Enviando:', JSON.stringify(jsonData));
  
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        setMensaje(`✅ luces: ${nextState}`);
        setTimeout(() => setMensaje(null), 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMensaje('❌ error al cambiar luces');
        setTimeout(() => setMensaje(null), 2000);
      });
  };
  const sendEstado = (action, estado) => {
    const updatedStates = { ...states, [action]: estado };
    setStates(updatedStates);
  
    const jsonData = {
      led: action,
      accion: estado ? 'on' : 'off',
    };
  
    console.log('Enviando:', JSON.stringify(jsonData));
  
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        setMensaje(`✅ ${action} ${estado ? 'encendido' : 'apagado'}`);
        setTimeout(() => setMensaje(null), 2000);
      })
      .catch((error) => {
        console.error('Error al enviar los datos:', error);
        setMensaje('❌ Error al enviar');
        setTimeout(() => setMensaje(null), 2000);
      });
  };
  return (
    <View style={styles.container}>
      {/* Header con flechas e ícono */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => toggleState('intermitente_izquierda')}>
        <Image
          source={require('../../assets/izquierda.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleState('intermitentes')}>
        <Image
          source={require('../../assets/intermitente.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleState('intermitente_derecha')}>
        <Image
          source={require('../../assets/derecha.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      </View>
      {mensaje && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{mensaje}</Text>
        </View>
      )}
      {/* Velocímetro */}
      <View style={styles.speedometer}>
        <Velocimetro speed={speed} />
      </View>

      {/* Controles inferiores */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleLuces}>
          <Image
            source={
              luces === 'apagado'
                ? require('../../assets/luz_apag.png')
                : luces.startsWith('altas')
                ? require('../../assets/luz_baja.png')
                : require('../../assets/luz_alta.png')
            }
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <Icon name="horn" size={30} color="black" />
      </View>

      {/* Controles multimedia */}
      <View style={styles.media}>
        <Image
          source={require('../../assets/atras.png')}
          style={{ width: 40, height: 40 }}
        />
        <Image
          source={require('../../assets/pausa.png')}
          style={{ width: 40, height: 40 }}
        />
        <Image
          source={require('../../assets/play.png')}
          style={{ width: 40, height: 40 }}
        />
        <Image
          source={require('../../assets/adelante.png')}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  speedometer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  speedometerImage: {
    width: 250,
    height: 250,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  media: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  toast: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Tablero;