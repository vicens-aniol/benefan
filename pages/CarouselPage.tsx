import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import BlobBackground from '../components/BlobBackground';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for the celebrity and screen state
type Celebrity = {
  id: string;
  image: ImageSourcePropType;
  name: string;
  description: string;
};

type RootStackParamList = {
  Carousel: undefined;
  Search: undefined;
  CelebrityInfo: undefined
};

type Screen = 'Carrousel1' | 'Carrousel2' | 'Carrousel3' | 'Search' | 'CelebrityInfo';

// Sample data for the celebrities
type CarrouselNavigationProp = StackNavigationProp<RootStackParamList, 'Carousel'>;
const celebData: Celebrity[] = [
  { id: '1', image: require('../assets/IMG/Celebrities/TaylorSwift.png'), name: 'Taylor Swift', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.' },
  { id: '2', image: require('../assets/IMG/Celebrities/LionelMessi.png'), name: 'Lionel Messi', description: 'Lorem Ipsum is not just random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
  { id: '3', image: require('../assets/IMG/Celebrities/Eminem.png'), name: 'Eminem', description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.' }
];

const CarouselPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Carrousel1');
  const navigation = useNavigation<CarrouselNavigationProp>();

  const navigate = () => {
    if (currentScreen === 'Carrousel3') {
      navigation.navigate('Search');
    } else {
      const nextIndex = parseInt(currentScreen.slice(-1), 10) + 1;
      setCurrentScreen(`Carrousel${nextIndex}` as Screen);
    }
  };

  // Determine the index from the currentScreen for less redundancy
  const index = parseInt(currentScreen.slice(-1), 10) - 1;
  const celeb = celebData[index];

  return (
    <BlobBackground>
      <View style={styles.container}>
        <Image source={celeb.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.header}>{celeb.name}</Text>
        <Text style={styles.description}>{celeb.description}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={navigate}>
          <Text style={{ color: '#F5F5F5' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </BlobBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent'
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#4D8D93',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CarouselPage;
