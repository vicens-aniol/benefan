/* import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from './pages/Home';
import Details from './pages/Details';
import YourCelebrities from './pages/YourCelebrities';
import CarouselPage from './pages/CarouselPage';
import SearchScreen from './pages/SearchScreen';
import CelebrityInfo from './pages/CelebrityInfo';
import ScheduleScreen from './pages/ScheduleScreen';
import CountdownTimerPage from './pages/CountdownTimerPage';

import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

// Get screen width for dynamic positioning
const screenWidth = Dimensions.get('window').width;

// Define types for the stacks
type RootStackParamList = {
  Carousel: undefined;
  Search: undefined;
  CelebrityInfo: {
    name: string;
    role: string;
    image: any; // Adjust as needed for TypeScript
    date: string;
    description: string;
  };
};

// Create navigation stacks
const CarouselStack = createStackNavigator<RootStackParamList>();

function CarouselStackScreen() {
  return (
    <CarouselStack.Navigator>
      <CarouselStack.Screen name="Carousel" component={CarouselPage} options={{ headerShown: false }} />
      <CarouselStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <CarouselStack.Screen name="CelebrityInfo" component={CelebrityInfo} options={{ headerShown: false }} />
    </CarouselStack.Navigator>
  );
}

// Tab Navigation for Regular Users
const TabRegular = createBottomTabNavigator();
function RegularUserTabs() {
  return (
    <TabRegular.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Details') iconName = 'list';
          else if (route.name === 'Search') iconName = 'search';

          return (
            <View style={focused ? styles.selectedIcon : null}>
              <FontAwesome name={iconName} size={size} color={focused ? 'white' : color} />
            </View>
          );
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <TabRegular.Screen name="Home" component={CarouselStackScreen} options={{ headerShown: false }} />
      <TabRegular.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <TabRegular.Screen name="Details" component={CountdownTimerPage} options={{ headerShown: false }} />
    </TabRegular.Navigator>
  );
}

// Tab Navigation for Celebrity Users
const TabCelebrity = createBottomTabNavigator();
function CelebrityUserTabs() {
  return (
    <TabCelebrity.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'MySchedule') iconName = 'calendar';
          else if (route.name === 'Countdown') iconName = 'clock';

          return (
            <View style={focused ? styles.selectedIcon : null}>
              <FontAwesome name={iconName} size={size} color={focused ? 'white' : color} />
            </View>
          );
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <TabCelebrity.Screen name="Home" component={CarouselStackScreen} options={{ headerShown: false }} />
      <TabCelebrity.Screen name="MySchedule" component={ScheduleScreen} options={{ headerShown: false }} />
      <TabCelebrity.Screen name="Countdown" component={CountdownTimerPage} options={{ headerShown: false }} />
    </TabCelebrity.Navigator>
  );
}

// Main App Component
const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isCelebrity, setIsCelebrity] = useState(false);

  useEffect(() => {
    // Fetch the session data
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user) {
        // Check the user's role to determine navigation
        supabase
          .from('auth.users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setIsCelebrity(data.role === 'celebrity');
            }
          });
      }
    });

    // Listen to authentication state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && session.user) {
        supabase
          .from('auth.users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setIsCelebrity(data.role === 'celebrity');
            }
          });
      }
    });
  }, []);

  // Conditionally render the correct navigation based on the user's role
  return (
    session && session.user ? (
      <NavigationContainer>
        {isCelebrity ? <CelebrityUserTabs /> : <RegularUserTabs />}
      </NavigationContainer>
    ) : (
      <Auth />
    )
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  selectedIcon: {
    backgroundColor: '#4D8D93', // Green color
    padding: 10,
    borderRadius: 30,
  },
});

export default App;
 */