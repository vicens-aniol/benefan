import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import BlobBackground from '../components/BlobBackground';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import commonStyles from '../styles/commonStyles';
import { Alert } from 'react-native'; // Make sure to import Alert
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import from vector icons
import { supabase } from "../lib/supabase";


// Function to display a confirmation dialog before logging out
const confirmSignOut = () => {
  Alert.alert(
    'Logout Confirmation',
    'Are you sure you want to log out?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          console.log("Signing out");
          await supabase.auth.signOut(); // Replace with your logout logic
        },
      },
    ],
    { cancelable: false }
  );
};

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
type CarouselNavigationProp = StackNavigationProp<RootStackParamList, 'Carousel'>;
const celebData: Celebrity[] = [
  { id: '1', image: require('../assets/meetgreat.png'), name: 'Benefan', description: "Introducing 'Benefan,' the app revolutionizing fan-celebrity interactions. Through exclusive meet-and-greets via video calls, fans connect with stars while supporting charity" },
  { id: '2', image: require('../assets/elephantgood2.png'), name: 'Benefan', description: 'Each month, themed events align with causes, amplifying donations impact' },
  { id: '3', image: require('../assets/elephantgood3.png'), name: 'Benefan', description:"This month, 'Benefan' focuses on Parkinson's, raising funds and awareness." }
];

const CarouselPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Carrousel1');
  const navigation = useNavigation<CarouselNavigationProp>();

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
      <TouchableOpacity style={styles.logoutIcon} onPress={confirmSignOut}>
          <FontAwesome name="power-off" size={27} color="#666" />
        </TouchableOpacity>
        <Image source={celeb.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.header}>{celeb.name}</Text>
        <Text style={styles.description}>{celeb.description}</Text>
        <TouchableOpacity style={commonStyles.buttonContainer_rounded} onPress={navigate}>
          <Text style={commonStyles.boldlabelforbutton}>Next</Text>
        </TouchableOpacity>
      </View>
    </BlobBackground>
  );
}

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
  },
  logoutIcon: {
    position: 'absolute',
    top: 60, // Adjust to fit your layout
    left: 20, // Adjust to fit your layout
    color: '#fff',
  },
});

export default CarouselPage;
