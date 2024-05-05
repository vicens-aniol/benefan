import React from 'react';
import { Modal, SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Define the props type for the ThankYouScreen component
interface ThankYouScreenProps {
  isVisible: boolean;
  onClose: () => void; // onClose is a function that doesn't return anything
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/HeartIcon.png')} // Ensure the path to your heart icon is correct
              style={styles.heartIcon}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={styles.header}>Thank You!</Text>
            <Text style={styles.message}>
              Thank you for your impactful support in the fight against cancer! Your dedication shines brightly, offering hope and comfort to those in need.
            </Text>
            <TouchableOpacity style={styles.doneButton} onPress={onClose}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.36)', // Dark overlay background
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    height: '70%'
  },
  iconContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heartIcon: {
    width: 140,
    height: 140,
  },
  textContent: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#4D8D93',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '80%',
  },
  doneButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ThankYouScreen;