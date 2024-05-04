import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, ImageSourcePropType } from 'react-native';
import BlobBackground from '../components/BlobBackground';

// Import images statically
const eminemImage = require('../assets/IMG/Celebrities/Eminem.png');
const taylorSwiftImage = require('../assets/IMG/Celebrities/TaylorSwift.png');
const messiImage = require('../assets/IMG/Celebrities/LionelMessi.png');
const ronaldoImage = require('../assets/IMG/Celebrities/CristianoRonaldo.png');
const beyonceImage = require('../assets/IMG/Celebrities/Beyonce.jpeg');
const drakeImage = require('../assets/IMG/Celebrities/drake.jpg');
const shakiraImage = require('../assets/IMG/Celebrities/shakira.jpg');
const jLoImage = require('../assets/IMG/Celebrities/jLo.jpeg');

// Define the type for a celebrity
type Celebrity = {
  id: string;
  name: string;
  role: string;
  image: ImageSourcePropType; // Now using NodeRequire for image
};

// Sample data for celebrities
const celebrities: Celebrity[] = [
  { id: '1', name: 'Eminem', role: 'Rapper', image: eminemImage },
  { id: '2', name: 'Taylor Swift', role: 'Singer', image: taylorSwiftImage },
  { id: '3', name: 'Messi', role: 'Football Player', image: messiImage },
  { id: '4', name: 'Cristiano Ronaldo', role: 'Football Player', image: ronaldoImage },
  { id: '5', name: 'Beyoncé', role: 'Singer', image: beyonceImage },
  { id: '6', name: 'Drake', role: 'Rapper', image: drakeImage },
  { id: '7', name: 'Shakira', role: 'Singer', image: shakiraImage },
  { id: '8', name: 'Jennifer Lopez', role: 'Singer', image: jLoImage }
];

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCelebrities = celebrities.filter(celebrity =>
    celebrity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BlobBackground>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Celebrities</Text>  
            <TextInput
                style={styles.searchInput}
                placeholder="Search Celebrities"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredCelebrities}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                </View>
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        </SafeAreaView>
    </BlobBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchInput: {
    height: 50,
    fontSize: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  role: {
    fontSize: 16,
    color: '#4D8D93'
  },
  columnWrapper: {
    justifyContent: 'space-between'
  }
});

export default SearchScreen;
