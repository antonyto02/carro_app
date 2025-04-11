import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Navbar from "../components/Navbar";

const listaComponentes = [
  {
    id: "1",
    nombre: "ESP32",
    imagen: require("../../assets/esp32.jpg"),
    descripcion:
      "Microcontrolador con WiFi y Bluetooth. Es el cerebro del sistema que gestiona sensores y conexión a la app.",
  },
  {
    id: "2",
    nombre: "Sensor DHT11",
    imagen: require("../../assets/dht11.png"),
    descripcion:
      "Sensor de temperatura y humedad, utilizado para monitorear el ambiente del carro.",
  },
  {
    id: "3",
    nombre: "Sensor BMP180",
    imagen: require("../../assets/bmp.jpg"),
    descripcion:
      "Sensor barométrico para presión y altitud. Permite registrar variaciones atmosféricas.",
  },
  {
    id: "4",
    nombre: "Sensor MPU6050 (Giroscopio)",
    imagen: require("../../assets/giroscopio.png"),
    descripcion:
      "Sensor que mide aceleración e inclinación. Ayuda a detectar movimiento y orientación del carro.",
  },
  {
    id: "5",
    nombre: "Sensor óptico",
    imagen: require("../../assets/optico.jpg"),
    descripcion:
      "Detecta líneas negras sobre fondo blanco para que el carro siga el camino.",
  },
  {
    id: "6",
    nombre: "Motor TT",
    imagen: require("../../assets/motor.jpg"),
    descripcion:
      "Motor de corriente directa para propulsar las ruedas del vehículo.",
  },
  {
    id: "7",
    nombre: "Puente H L298N",
    imagen: require("../../assets/puente_h.jpg"),
    descripcion:
      "Permite controlar el giro y dirección de los motores. Fundamental para maniobras del carro.",
  },
  {
    id: "8",
    nombre: "Módulo LM2698",
    imagen: require("../../assets/lm2698.png"),
    descripcion:
      "Convertidor de voltaje que regula la alimentación para proteger los componentes.",
  },
];

const Componentes = () => {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Componentes del Proyecto</Text>

        <FlatList
          data={listaComponentes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => setComponenteSeleccionado(item)}
            >
              <Image source={item.imagen} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={!!componenteSeleccionado}
          transparent
          animationType="fade"
          onRequestClose={() => setComponenteSeleccionado(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContenido}>
              <Image
                source={componenteSeleccionado?.imagen}
                style={styles.modalImagen}
              />
              <Text style={styles.modalNombre}>
                {componenteSeleccionado?.nombre}
              </Text>
              <Text style={styles.modalDescripcion}>
                {componenteSeleccionado?.descripcion}
              </Text>
              <TouchableOpacity
                onPress={() => setComponenteSeleccionado(null)}
                style={styles.botonCerrar}
              >
                <Text style={styles.textoCerrar}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <Navbar />
    </View>
  );
};

export default Componentes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  lista: {
    paddingBottom: 30,
  },
  item: {
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "#fff", // Fondo blanco visible
    padding: 10, // Espacio interior
    borderRadius: 16, // Bordes redondeados igual que la imagen
    shadowColor: "#000", // Sombra opcional
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Sombra para Android
  },

  imagen: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 8,
    resizeMode: "cover",
    overflow: "hidden",
  },

  nombre: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContenido: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.8,
  },
  modalImagen: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
  },
  modalNombre: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescripcion: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  botonCerrar: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textoCerrar: {
    color: "#fff",
    fontWeight: "bold",
  },
});
