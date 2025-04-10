import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Navbar from "../components/Navbar";

const Temperatura = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [average, setAverage] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [perMinuteAverages, setPerMinuteAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.8.2:8000/api/readings/");
      const json = await response.json();

      const temps = json.map(item => item.temperature);
      const timestamps = json.map(item =>
        new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );

      setValues(temps);
      setLabels(timestamps);

      const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
      setAverage(avg.toFixed(1));
      setCurrentTemp(temps[temps.length - 1].toFixed(1));

      // Agrupar por minuto y calcular promedios
      const grouped = {};
      json.forEach(item => {
        const time = new Date(item.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        if (!grouped[time]) grouped[time] = [];
        grouped[time].push(item.temperature);
      });

      const groupedAverages = Object.entries(grouped)
        .map(([time, values]) => ({
          time,
          avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
        }))
        .slice(-5);

      setPerMinuteAverages(groupedAverages);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex:1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Temperatura</Text>

        {average !== null && (
          <Text style={styles.infoText}>Promedio: {average}°C</Text>
        )}

        {currentTemp !== null && (
          <Text style={styles.infoText}>Actual: {currentTemp}°C</Text>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#D3D3D3" />
        ) : (
          <>
            <LineChart
              data={{
                labels: labels.map((l, i) => (i % 3 === 0 ? l : "")),
                datasets: [{ data: values }],
              }}
              width={Dimensions.get("window").width - 40}
              height={240}
              yAxisSuffix="°C"
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 109, 0, ${opacity})`, // 🔶 línea naranja retro
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#FF3D00", // 🔶 borde de puntos
                },
                propsForLabels: {
                  fontSize: 6,
                },
              }}
              bezier
              style={styles.chart}
            />

            <View style={styles.listContainer}>
              <Text style={styles.subTitle}>Promedio por minuto:</Text>
              {perMinuteAverages.map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  {item.time} → {item.avg}°C
                </Text>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "#aaa",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  chart: {
    borderRadius: 16,
    marginTop: 10,
  },
  listContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#444",
  },
  listItem: {
    fontSize: 14,
    color: "#333",
  },
});

export default Temperatura;