import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import HomeStyles from "../styles/HomeStyles";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <View style={{ flex:1 }}>
      <View style={HomeStyles.container}>
        <Image
          source={require('../../assets/logo79.png')}
          style={HomeStyles.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={HomeStyles.title}>TEMPERATURA</Text>

        {/* Caja de datos */}
        <View style={HomeStyles.card}>
          <View style={HomeStyles.row}>
            <Text style={HomeStyles.temperature}>25° C</Text>
          </View>

          <Text style={HomeStyles.subtext}>Última lectura:</Text>

          <View style={HomeStyles.row}>
            <Text style={HomeStyles.time}>12:45 PM</Text>
          </View>
        </View>  
      </View>
      <Navbar />
    </View>  
  );
};

export default Home;