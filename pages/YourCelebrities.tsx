import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import BlobBackground from '../components/BlobBackground';
import { StackNavigationProp } from '@react-navigation/stack';

// Definición de los tipos para la navegación si estás utilizando react-navigation
type RootStackParamList = {
  YourCelebrities: undefined;
  Calls: { roomCallId: string };
};


type YourCelebritiesProps = {
  navigation: StackNavigationProp<RootStackParamList, 'YourCelebrities'>;
};

// Adaptando el tipo Celebrity para que coincida con CelebrityInfo
type Celebrity = {
  id: string;
  name: string;
  role: string;
  date: string;
  description: string;
  image: ImageSourcePropType; // Usando ImageSourcePropType para la imagen
};

const YourCelebrities = ({ navigation }: YourCelebritiesProps) => {
  const celebrities: Celebrity[] = [
    {
      id: '1',
      name: 'Taylor Swift',
      role: 'Singer',
      date: '27 February',
      description: 'American singer-songwriter.',
      image: require('../assets/IMG/Celebrities/TaylorSwift.png'),
    },
    {
      id: '2',
      name: 'Messi',
      role: 'Football',
      date: '27 February',
      description: 'Famous football player.',
      image: require('../assets/IMG/Celebrities/LionelMessi.png'),
    },
  ];

const handleCallPress = (celebrity: Celebrity) => {
  navigation.navigate('Calls', { roomCallId: "benefan_room_1" });
};


  return (
    <BlobBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Your Celebrities</Text>
        <Text style={styles.description_centered}>27 February</Text>

        {celebrities.map((celeb) => (
          <View key={celeb.id} style={styles.celebrityCard}>
            <Image source={celeb.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{celeb.name}</Text>
              <Text style={styles.role}>{celeb.role}</Text>
              <Text style={styles.time}>{celeb.date}</Text>
            </View>
            <TouchableOpacity onPress={() => handleCallPress(celeb)} style={styles.callButton}>
              <Text style={styles.callText}>CALL</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </BlobBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  description_centered: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: '5%',
    marginBottom: '4%',
  },
  backButton: {
    backgroundColor: '#fff',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  arrow: {
    fontSize: 14,
    color: '#4D8D93',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  celebrityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 12,
    color: '#4D8D93',
  },
  callButton: {
    backgroundColor: '#4D8D93',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  callText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default YourCelebrities;