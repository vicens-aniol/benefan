import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import BlobBackground from '../components/BlobBackground'; 
import { TouchableOpacity } from 'react-native';

// Definición de tipo para los componentes de pantalla
type Screen = 'Carrousel' | 'Carrousel2' | 'Carrousel3' | 'navigateToSearch';


// Componente HomeScreen
const HomeScreen: React.FC<{ navigateToCarrousel3: () => void }> = ({ navigateToCarrousel3 }) => (
  <BlobBackground>
  <View style={styles.container}>
    <Image
      source={require('../assets/IMG/Celebrities/TaylorSwift.png')}
      style={styles.image}
      resizeMode="cover"
    />
    <Text style={styles.header}>Taylor Swift</Text>
    <Text style={styles.description}>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.
    </Text>
    <View>
    <TouchableOpacity style={styles.buttonContainer} onPress={navigateToCarrousel3}><Text style={{color: '#F5F5F5'}}>Next</Text></TouchableOpacity>
    </View>
  </View>
  </BlobBackground>
);

// Componente Home2Screen
const Home2Screen: React.FC<{ navigateToCarrousel1: () => void }> = ({ navigateToCarrousel1 }) => (
  <BlobBackground>
  <View style={styles.container}>
    <Image
      source={require('../assets/IMG/Celebrities/LionelMessi.png')}
      style={styles.image}
      resizeMode="cover"
    />
    <Text style={styles.header}>Lionel Messi</Text>
    <Text style={styles.description}>
      Lorem Ipsum is not just random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
    </Text>
    <View>
    <TouchableOpacity style={styles.buttonContainer} onPress={navigateToCarrousel1}><Text style={{color: '#F5F5F5'}}>Next</Text></TouchableOpacity>
    </View>
  </View>
  </BlobBackground>
);

// Componente Home3Screen
const Home3Screen: React.FC<{ navigateToCarrousel2: () => void }> = ({ navigateToCarrousel2 }) => (
  <BlobBackground>
  <View style={styles.container}>
    <Image
      source={require('../assets/IMG/Celebrities/TaylorSwift.png')}
      style={styles.image}
      resizeMode="cover"
    />
    <Text style={styles.header}>Eminem</Text>
    <Text style={styles.description}>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
    </Text>
    <View style={styles.buttonContainer}>
      <Button title="Ir a otra pantalla" onPress={navigateToCarrousel2} color="#4D8D93" />
    </View>
  </View>
  </BlobBackground>
);

// Componente SearchCelebrity
const SearchCelebrity: React.FC<{ navigateToSearch: () => void }> = ({ navigateToSearch }) => (
  <View style={styles.container}>
    <Image
      source={require('../assets/IMG/Celebrities/Eminem.png')}
      style={styles.image}
      resizeMode="cover"
    />
    <Text style={styles.header}>Eminem</Text>
    <Text style={styles.description}>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
    </Text>
    <View >
      <TouchableOpacity style={styles.buttonContainer} onPress={navigateToSearch}><Text style={{color: '#F5F5F5'}}>Next</Text></TouchableOpacity>
    </View>
  </View>
  </BlobBackground>
);

// Componente App que maneja la navegación
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Carrousel');

  const navigateToCarrousel2 = () => setCurrentScreen('Carrousel2');
  const navigateToCarrousel3 = () => setCurrentScreen('Carrousel3');
  const navigateToCarrousel1 = () => setCurrentScreen('Carrousel');
  const navigateToSearch = () => setCurrentScreen('navigateToSearch');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Carrousel':
        return <HomeScreen navigateToCarrousel3={navigateToCarrousel3} />;
      case 'Carrousel2':
        return <Home2Screen navigateToCarrousel1={navigateToCarrousel1} />;
      case 'Carrousel3':
        return <Home3Screen navigateToCarrousel2={navigateToCarrousel2} />;      
      case 'navigateToSearch':
        return <SearchCelebrity navigateToSearch={navigateToSearch} />;

    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

// Estilos para la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent', // Transparent so the blobs can be seen
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
    maxHeight: 30, // Máxima altura del encabezado
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#4D8D93', // Color de fondo del botón
    borderRadius: 25,          // Bordes redondeados
    paddingVertical: 10,       // Padding vertical
    paddingHorizontal: 100,     // Padding horizontal
    alignItems: 'center',      // Centra el texto horizontalmente
    justifyContent: 'center',  // Centra el texto verticalmente
  }
});

export default App;
