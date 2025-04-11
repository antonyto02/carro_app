import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Humedad from "./src/screens/Humedad";
import Temperatura from "./src/screens/Temperatura";
import Presion from "./src/screens/Presion";
import Mapeo from "./src/screens/Mapeo";
import Tablero from "./src/screens/Tablero";
import Home from "./src/screens/Home";
import Componentes from "./src/screens/Componentes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Componentes" component={Componentes} />
        <Stack.Screen name="Humedad" component={Humedad} />
        <Stack.Screen name="Temperatura" component={Temperatura} />
        <Stack.Screen name="Presion" component={Presion} />
        <Stack.Screen name="Mapeo" component={Mapeo} />
        <Stack.Screen name="Tablero" component={Tablero} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
