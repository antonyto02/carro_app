import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import HomeStyles from "../styles/HomeStyles";
import Navbar from "../components/Navbar";

const equipo = [
  {
    id: "1",
    nombre: "Juan Antonio Delgado Rodriguez",
    rol: "Desarrollador back-end",
    imagen: require("../../assets/antonio.jpg"),
    descripcion: "Encargado de la lógica del sistema y conexión con sensores.",
  },
  {
    id: "2",
    nombre: "Idaly Guadalupe Garcia Flores",
    rol: "Diseñadora",
    imagen: require("../../assets/idaly.jpg"),
    descripcion: "Diseño de la camioneta y pantallas de la app.",
  },
  {
    id: "3",
    nombre: "José Antonio Rodriguez Rivera",
    rol: "Desarrollador Front-end",
    imagen: require("../../assets/jose.jpg"),
    descripcion:
      "Encargado de la programacion de las pantallas y detalles del carro.",
  },
];

const Home = () => {
  const [integranteSeleccionado, setIntegranteSeleccionado] = useState(null);
  const [showSecret, setShowSecret] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={HomeStyles.container}>
        <Image
          source={require("../../assets/logo79.png")}
          style={HomeStyles.logo}
          resizeMode="contain"
        />

        <Text style={HomeStyles.title}>¡Bienvenido a F-Liner 79!</Text>
        <Text style={HomeStyles.description}>
          Este proyecto es un carro seguidor de línea con sensores integrados y
          mapeo en tiempo real, mostrado todos los datos aqui en la aplicacion.
        </Text>

        <Text style={HomeStyles.subtitle}>Equipo de trabajo:</Text>

        <FlatList
          data={equipo}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={HomeStyles.avatarContainer}
              onPress={() => setIntegranteSeleccionado(item)}
            >
              <Image source={item.imagen} style={HomeStyles.avatar} />
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={!!integranteSeleccionado}
          transparent
          animationType="fade"
          onRequestClose={() => setIntegranteSeleccionado(null)}
        >
          <View style={HomeStyles.modalOverlay}>
            <View style={HomeStyles.modalContent}>
              <Image
                source={integranteSeleccionado?.imagen}
                style={HomeStyles.modalImage}
              />
              <Text style={HomeStyles.modalName}>
                {integranteSeleccionado?.nombre}
              </Text>
              <Text style={HomeStyles.modalRole}>
                {integranteSeleccionado?.rol}
              </Text>
              <Text style={HomeStyles.modalDescription}>
                {integranteSeleccionado?.descripcion}
              </Text>
              <TouchableOpacity
                style={HomeStyles.closeButton}
                onPress={() => setIntegranteSeleccionado(null)}
              >
                <Text style={HomeStyles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
              {integranteSeleccionado?.nombre ===
                "Idaly Guadalupe Garcia Flores" && (
                <>
                  <TouchableOpacity
                    style={[
                      HomeStyles.closeButton,
                      { backgroundColor: "#6a1b9a", marginTop: 10 },
                    ]}
                    onPress={() => setShowSecret(!showSecret)}
                  >
                    <Text style={HomeStyles.closeButtonText}>Secret</Text>
                  </TouchableOpacity>

                  {showSecret && (
                    <View style={{ marginTop: 20, alignItems: "center" }}>
                      {/* Mensaje secreto */}
                      <Text
                        style={[
                          HomeStyles.modalDescription,
                          { marginTop: 10, fontStyle: "italic" },
                        ]}
                      >
                        "Esta wey nomas duerme y traga y le vuelve a dar sueño"
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <Navbar />
    </View>
  );
};

export default Home;
