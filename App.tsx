import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';
import Home from './pages/Home';
import Details from './pages/Details';

import ScheduleScreen from "./pages/ScheduleScreen";

import CarouselPage from './pages/CarrouselPage';
import SearchScreen from './pages/SearchScreen';
import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Carousel: undefined;
  Search: undefined;
};

const CarouselStack = createStackNavigator<RootStackParamList>();
type CarouselNavigationProp = StackNavigationProp<RootStackParamList, 'Carousel'>;


// Stack Navigator specifically for Carousel to Search transition
function CarouselStackScreen() {
  return (
    <CarouselStack.Navigator >
      <CarouselStack.Screen name="Carousel" component={CarouselPage} options={{ headerShown: false }} />
      <CarouselStack.Screen name="Search" component={SearchScreen} options = {{ headerShown: false, gestureEnabled: false }}/>
    </CarouselStack.Navigator>
  );
}

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
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Details" component={Details} />
        <Tab.Screen name="CarouselStack" component={CarouselStackScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Auth />
  );
};

export default App;
