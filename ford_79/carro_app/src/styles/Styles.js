import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 15,
  },
  powerButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  powerIcon: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },
  logo: {
    width: 200, // Ajusta el tamaño si es necesario
    height: 80,
    resizeMode: "contain",
    position: "absolute",
    top: 30, // Posiciona el logo en la parte superior
    alignSelf: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default styles;