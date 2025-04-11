import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Navbar from "../components/Navbar";

const Humedad = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [average, setAverage] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [perMinuteAverages, setPerMinuteAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.8.2:8000/api/readings/");
      const json = await response.json();

      const humidities = json.map(item => item.humidity);
      const timestamps = json.map(item =>
        new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );

      setValues(humidities);
      setLabels(timestamps);

      const avg = humidities.reduce((a, b) => a + b, 0) / humidities.length;
      setAverage(avg.toFixed(1));
      setCurrentHumidity(humidities[humidities.length - 1].toFixed(1));

      // Agrupar por minuto y calcular promedios
      const grouped = {};
      json.forEach(item => {
        const time = new Date(item.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        if (!grouped[time]) grouped[time] = [];
        grouped[time].push(item.humidity);
      });

      const groupedAverages = Object.entries(grouped)
        .map(([time, values]) => ({
          time,
          avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
        }))
        .slice(-5); // Últimos 5 minutos

      setPerMinuteAverages(groupedAverages);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error de conexión con el backend:\n" + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex:1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Humedad</Text>

        {average !== null && (
          <Text style={styles.infoText}>Promedio: {average}%</Text>
        )}

        {currentHumidity !== null && (
          <Text style={styles.infoText}>Actual: {currentHumidity}%</Text>
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
              yAxisSuffix="%"
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#FF4500",
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
                  {item.time} → {item.avg}%
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

export default Humedad;