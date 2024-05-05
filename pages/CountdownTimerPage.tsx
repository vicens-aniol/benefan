import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import commonStyles from '../styles/commonStyles';

// Define the types for navigation
type RootStackParamList = {
  CountdownTimer: undefined;
  NextScreen: undefined; // Replace with the actual screen name
};

type CountdownNavigationProp = StackNavigationProp<RootStackParamList, 'CountdownTimer'>;

const CountdownTimerPage: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(920); // Starting time in seconds (15m 20s)
  const [isActive, setIsActive] = useState<boolean>(true);
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<CountdownNavigationProp>();

  const resetTimer = () => {
    setTotalSeconds(3); // Reset to 1:10
    setIsActive(true);
    animatedOpacity.setValue(1);
    startAnimation();
  };

  //TODO: change to videocall lobbby!
  type RootStackParamList = {
    CountdownTimer: undefined;
    NextScreen: undefined; // Example screen
    Home: undefined; // Add this screen type definition
  };

  type CountdownNavigationProp = StackNavigationProp<RootStackParamList, 'CountdownTimer'>;

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
    <View style={styles.container}>
      <Text style={styles.header}>Get ready for a benefic meet-and-greet experience!</Text>
      <Animated.View style={{ opacity: animatedOpacity }}>
        <Text style={styles.timerText}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
      </Animated.View>
      <TouchableOpacity style={commonStyles.buttonContainer_rounded} onPress={resetTimer}>
        <Text style={commonStyles.boldlabelforbutton}>Reset Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF',
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
});

export default CountdownTimerPage;
