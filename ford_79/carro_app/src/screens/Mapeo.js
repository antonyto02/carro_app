import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Button, Text } from 'react-native';
import Plano from '../components/Plano';
import TituloMapeo from '../components/TituloMapeo';
import Navbar from "../components/Navbar";

const Mapeo = () => {
  const [data, setData] = useState([]);
  const [mostrarToast, setMostrarToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://192.168.8.2:8000/api/posiciones/list/');
        const nuevosPuntos = await res.json();
  
        if (Array.isArray(nuevosPuntos) && nuevosPuntos.length > 0) {
          setData(prev => {
            const nuevos = nuevosPuntos.filter(
              p => !prev.some(existing => existing.x === p.x && existing.y === p.y)
            );
            return [...prev, ...nuevos];
          });
        }
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const reiniciarDatos = async () => {
    try {
      const res = await fetch('http://192.168.8.2:8000/api/posiciones/reiniciar/', {
        method: 'DELETE',
      });
  
      if (res.ok) {
        setData([]);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
      } else {
        console.error('Error al reiniciar los datos');
      }
    } catch (error) {
      console.error("Error al reiniciar datos:", error);
    }
  };

  return (
    <View style={{ flex:1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TituloMapeo />
        {data.length === 0 ? (
          <Text style={{ marginTop: 20 }}>Cargando recorrido...</Text>
        ) : (
          <Plano data={data} />
        )}
        <View style={styles.botonContainer}>
          <Button title="Reiniciar Datos" onPress={reiniciarDatos} color="#d9534f" />
        </View>
        {mostrarToast && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>Datos reiniciados</Text>
          </View>
        )}
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Dimensions.get('window').height,
    padding: 20,
    backgroundColor: '#eee',
  },
  botonContainer: {
    marginTop: 20,
    width: '100%',
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

export default Mapeo;