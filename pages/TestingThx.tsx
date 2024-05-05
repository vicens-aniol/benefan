import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ThankYouScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/Group.png')} // Cambiar por la ruta correcta de la imagen del corazón
          style={styles.heartIcon}
        />
        <Text style={styles.header}>Thank You!</Text>
        <Text style={styles.message}>
          Thank you for your impactful support in the fight against cancer! Your dedication shines brightly, offering hope and comfort to those in need
        </Text>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000060', // Asumiendo que el fondo es gris claro
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:"90%",
    height:"70%"
  },
  heartIcon: {
    width: 120,
    height: 120,
    marginBottom: "15%",
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: "10%",
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: "5%",
  },
  doneButton: {
    backgroundColor: '#4D8D93',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: "20%"
  },
  doneButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight:"bold"

  }
});

export default ThankYouScreen;