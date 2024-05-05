import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BlobBackground from '../components/BlobBackground';
import { StackNavigationProp } from '@react-navigation/stack';
import commonStyles from '../styles/commonStyles';

// Define the types for navigation
type RootStackParamList = {
  CountdownTimer: undefined;
  NextScreen: undefined;
  Home: undefined;
};

type CountdownNavigationProp = StackNavigationProp<RootStackParamList, 'CountdownTimer'>;

const CountdownTimerPage: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(920); // Starting time in seconds (15m 20s)
  const [isActive, setIsActive] = useState<boolean>(true);
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<CountdownNavigationProp>();

  const resetTimer = () => {
    setTotalSeconds(70); // Reset time to 1m 10s
    setIsActive(true);
    animatedOpacity.setValue(1);
    startAnimation();
  };

  const navigateToNextScreen = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((total) => total - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      setIsActive(false);
      navigateToNextScreen();
    }

    return () => clearInterval(interval);
  }, [isActive, totalSeconds]);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 0.5,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <BlobBackground>
      <View style={styles.container}>
        <Image source={require('../assets/LogoText.png')} style={styles.logo} />
        <Text style={styles.header}>Get ready for a benefic meet-and-greet experience!</Text>
        <Animated.View style={{ opacity: animatedOpacity }}>
          <Text style={styles.timerText}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
        </Animated.View>
        <TouchableOpacity style={commonStyles.buttonContainer_rounded} onPress={resetTimer}>
          <Text style={commonStyles.boldlabelforbutton}>Reset Timer</Text>
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
    padding: 30,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#4D8D93',
    paddingBottom: 20,
  },
  logo: {
    width: 150, 
    height: 150,
    marginBottom: 60, 
    resizeMode: 'contain',
  },
});

export default CountdownTimerPage;
