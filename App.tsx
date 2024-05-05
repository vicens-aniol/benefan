import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import Home from './pages/Home';
import Details from './pages/Details';
import YourCelebrities from "./pages/YourCelebrities";
import CarouselPage from './pages/CarrouselPage';
import SearchScreen from './pages/SearchScreen';
import ScheduleScreen from './pages/ScheduleScreen';
import CountdownTimerPage from './pages/CountdownTimerPage';


import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

// Get screen width for dynamic positioning
const screenWidth = Dimensions.get('window').width;

type RootStackParamList = {
  Carousel: undefined;
  Search: undefined;
};

const CarouselStack = createStackNavigator<RootStackParamList>();

function CarouselStackScreen() {
  return (
    <CarouselStack.Navigator>
      <CarouselStack.Screen name="Carousel" component={CarouselPage} options={{ headerShown: false }} />
      <CarouselStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </CarouselStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session && session.user ? (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Details') {
              iconName = 'list';
            } else if (route.name === 'Search') {
              iconName = 'search';
            }

            return (
              <View style={focused ? styles.selectedIcon : null}>
                <FontAwesome name={iconName} size={size} color={focused ? 'white' : color} />
              </View>
            );
          },
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false, // Hide labels under the icons
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={CarouselStackScreen} options={{ headerShown: false }}  />
        <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Details" component={CountdownTimerPage} options={{ headerShown: false }}  />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Auth />
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  selectedIcon: {
    backgroundColor: '#4D8D93', // Green color
    padding: 10,
    borderRadius: 30, // Ensures a perfect circle
  },
});

export default App;
