import React  from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CarrouselScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Carrousel'>;

type Props = {
  navigation: CarrouselScreenNavigationProp;
};

const Carrousel = React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/IMG/Celebrities/TaylorSwift.png')}  // Replace with the actual path to your image
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.header}>Find Trusted Doctors</Text>
      <Text style={styles.description}>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of it
        over 2000 years old.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={() => navigation.navigate('Next button pressed')}  // Replace with actual function
          //jump to next carrousel
          color="#4D8D93"
        />

      </View>
      <View style={styles.buttonContainerSkip}>
        <Button
            title="Skip"
            onPress={() => console.log('Skip button pressed')}  // Replace with actual function
            color="#0C191D"
            />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '4D8D93',
  },
  buttonContainerSkip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
  
});

export default App;
