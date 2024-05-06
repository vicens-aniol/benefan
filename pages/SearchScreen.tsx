import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import BlobBackground from '../components/BlobBackground';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';

type RootStackParamList = {
    Carrousel: undefined; 
    Search: undefined;    
    CelebrityInfo: {      
      name: string;
      role: string;
      image: ImageSourcePropType;
      date: string;
      description: string;
    };
  };

type Celebrity = {
  id: string;
  name: string;
  role: string;
  image: ImageSourcePropType;
  date: string;
  description: string;
};

const celebrities = [
  {
    id: '1',
    name: 'Eminem',
    role: 'Rapper',
    image: require('../assets/IMG/Celebrities/Eminem.png'),
    date: '2024-02-27',
    description: 'Eminem, a pivotal figure in hip-hop, known for his sharp lyrics and dynamic rhythms, has influenced many with his distinctive style.'
  },
  {
    id: '2',
    name: 'Taylor Swift',
    role: 'Singer',
    image: require('../assets/IMG/Celebrities/TaylorSwift.png'),
    date: '2024-02-27',
    description: 'Taylor Swift has evolved from country sweetheart to a pop superstar, known for her narrative songwriting which often centers around her personal life.'
  },
  {
    id: '3',
    name: 'Messi',
    role: 'Football Player',
    image: require('../assets/IMG/Celebrities/LionelMessi.png'),
    date: '2024-02-27',
    description: 'Lionel Messi is celebrated as one of football’s all-time greats, with a record-breaking career at Barcelona and now showcasing his skills at PSG.'
  },
  {
    id: '4',
    name: 'Cristiano Ronaldo',
    role: 'Football Player',
    image: require('../assets/IMG/Celebrities/CristianoRonaldo.png'),
    date: '2024-02-27',
    description: 'Cristiano Ronaldo, famed for his powerful goal-scoring ability, has dominated football with his skill and dedication on the field.'
  },
  {
    id: '5',
    name: 'Beyoncé',
    role: 'Singer',
    image: require('../assets/IMG/Celebrities/Beyonce.jpeg'),
    date: '2024-02-27',
    description: 'Beyoncé, a global icon and music industry powerhouse, continues to captivate audiences with her powerful vocals and electrifying performances.'
  },
  {
    id: '6',
    name: 'Drake',
    role: 'Rapper',
    image: require('../assets/IMG/Celebrities/drake.jpg'),
    date: '2024-02-27',
    description: 'Drake is a prominent figure in modern music, shaping the sound of hip-hop and R&B with his innovative melodies and thoughtful lyrics.'
  },
  {
    id: '7',
    name: 'Shakira',
    role: 'Singer',
    image: require('../assets/IMG/Celebrities/shakira.jpg'),
    date: '2024-02-27',
    description: 'Shakira, known for her unique voice and belly dancing, combines Latin rhythms with pop to create catchy tunes that are loved worldwide.'
  },
  {
    id: '8',
    name: 'Jennifer Lopez',
    role: 'Singer',
    image: require('../assets/IMG/Celebrities/jLo.jpeg'),
    date: '2024-02-27',
    description: 'Jennifer Lopez is not only a successful singer and actress but also a style icon, inspiring many with her diverse talents and entrepreneurial spirit.'
  },
  {
    id: '9',
    name: 'Carrero Blanco',
    role: 'Politician',
    image: require('../assets/IMG/Celebrities/CarreroBlanco.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'A prominent Spanish politician known for his career and dedication to the political landscape of Spain.'
  },
  {
    id: '10',
    name: 'Marc Mallol',
    role: 'Developer',
    image: require('../assets/IMG/Celebrities/CarreroBlanco.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'Software developer known for his innovative work and passion for technology.'
  },
  {
    id: '11',
    name: 'Aniol Vicens',
    role: 'Teacher',
    image: require('../assets/IMG/Celebrities/CarreroBlanco.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'Dedicated teacher known for his exceptional ability to inspire and educate students.'
  },
  {
    id: '12',
    name: 'Linda Ronstadt',
    role: 'Singer',
    image: require('../assets/IMG/Celebrities/LindaRonstadt.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'American singer known for her powerful voice and versatile music career spanning across various genres such as rock, country, and Latin.'
  },
  {
    id: '13',
    name: 'Michael J. Fox',
    role: 'Actor',
    image: require('../assets/IMG/Celebrities/MichaelJFox.jpeg'), // Imaginary path
    date: '2024-02-27',
    description: 'Renowned actor and advocate for Parkinson\'s disease research, celebrated for his roles in film and television.'
  },
  {
    id: '14',
    name: 'Oriol Pont',
    role: 'Engineer',
    image: require('../assets/IMG/Celebrities/CarreroBlanco.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'Engineer passionate about solving problems and creating efficient systems.'
  },
  {
    id: '15',
    name: 'Adam Sandler',
    role: 'Actor',
    image: require('../assets/IMG/Celebrities/AdamSandler.jpeg'), // Imaginary path
    date: '2024-02-27',
    description: 'Comedian and actor known for his roles in numerous comedic films that have entertained audiences worldwide.'
  },
  {
    id: '16',
    name: 'Josep Roura',
    role: 'Designer',
    image: require('../assets/IMG/Celebrities/CarreroBlanco.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'Creative designer recognized for his unique artistic style and impactful designs.'
  },
  {
    id: '17',
    name: 'Mike Wazowski',
    role: 'Comedian',
    image: require('../assets/IMG/Celebrities/MikeWazowski.jpeg'), // Imaginary path
    date: '2024-02-27',
    description: 'Comedian known for his unique blend of humor that leaves the audience in stitches.'
  },
  {
    id: '18',
    name: 'Buzz Lightyear',
    role: 'Astronaut',
    image: require('../assets/IMG/Celebrities/BuzzLightyear.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'A legendary astronaut known for his motto "To infinity and beyond!" and brave adventures.'
  },
  {
    id: '19',
    name: 'Billy Connolly',
    role: 'Comedian',
    image: require('../assets/IMG/Celebrities/BillyConnolly.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'Scottish comedian and actor known for his humorous performances and distinctive comedic style.'
  },
  {
    id: '20',
    name: 'Nicolas Tesla',
    role: 'Inventor',
    image: require('../assets/IMG/Celebrities/NicolasTesla.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'Innovative inventor whose groundbreaking work in electricity changed the world.'
  },
  {
    id: '21',
    name: 'Grace Murray',
    role: 'Computer Scientist',
    image: require('../assets/IMG/Celebrities/GraceMurray.jpg'), // Imaginary path
    date: '2024-02-27',
    description: 'A pioneer in computer science known for her contributions to programming languages and the development of computing.'
  },
  {
    id: '22',
    name: 'Bill Clinton',
    role: 'Former President',
    image: require('../assets/IMG/Celebrities/BillClinton.jpeg'), // Asegúrate de que la ruta y el nombre de archivo son correctos
    date: '2024-02-27',
    description: 'Bill Clinton, the 42nd president of the United States, served from 1993 to 2001. His presidency included a period of economic prosperity and the promotion of international trade agreements.'
  },
];



const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Search'>>();

  const filteredCelebrities = celebrities.filter(celebrity =>
    celebrity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCelebrityInfo = (celebrity: Celebrity) => {
    navigation.navigate('CelebrityInfo', {
      name: celebrity.name,
      role: celebrity.role,
      image: celebrity.image,
      date: celebrity.date,
      description: celebrity.description
    });
  };

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
            <TouchableOpacity style={styles.card} onPress={() => openCelebrityInfo(item)}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </TouchableOpacity>
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
    marginTop: 10,
    textAlign:"center"
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