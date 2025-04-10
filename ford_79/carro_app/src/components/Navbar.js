import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/Styles";

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Obtener la ruta actual

  const icons = [
    { 
      default: require("../../assets/home.jpg"), 
      active: require("../../assets/home2.jpg"), 
      screen: "Home" 
    },
    { 
      default: require("../../assets/humedad.jpg"), 
      active: require("../../assets/humedad2.jpg"), 
      screen: "Humedad" 
    },
    { 
      default: require("../../assets/temperatura.jpg"), 
      active: require("../../assets/temperatura2.jpg"), 
      screen: "Temperatura" 
    },
    { 
      default: require("../../assets/presion.jpg"), 
      active: require("../../assets/presion2.jpg"), 
      screen: "Presion" 
    },
    { 
      default: require("../../assets/mapeo.jpg"), 
      active: require("../../assets/mapeo2.jpg"), 
      screen: "Mapeo" 
    },
    { 
      default: require("../../assets/tablero.jpg"), 
      active: require("../../assets/tablero2.jpg"), 
      screen: "Tablero" 
    },
  ];

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const half = Math.floor(icons.length / 2);

  return (
    <View style={styles.navbar}>
      {icons.slice(0, half).map((icon, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(icon.screen)}>
          <Image
            source={route.name === icon.screen ? icon.active : icon.default}
            style={[
              styles.icon,
              route.name === icon.screen && styles.activeIcon
            ]}
          />
        </TouchableOpacity>
      ))}

      <View style={styles.powerButton}>
        <FontAwesome5 name="power-off" size={30} color="red" />
      </View>

      {icons.slice(half).map((icon, index) => (
        <TouchableOpacity key={index + half} onPress={() => handlePress(icon.screen)}>
          <Image
            source={route.name === icon.screen ? icon.active : icon.default}
            style={[
              styles.icon,
              route.name === icon.screen && styles.activeIcon
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Navbar;