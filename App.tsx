import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Details from './pages/Details';
import CarouselPage from './pages/CarouselPage';
import SearchScreen from './pages/SearchScreen';
import CelebrityInfo from './pages/CelebrityInfo';
import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Carousel: undefined;
  Search: undefined;
  CelebrityInfo: {
    name: string;
    role: string;
    image: any; // This should be ImageSourcePropType if you are using TypeScript
    date: string;
    description: string;
  };
};

const CarouselStack = createStackNavigator<RootStackParamList>();

function CarouselStackScreen() {
  return (
    <CarouselStack.Navigator>
      <CarouselStack.Screen name="Carousel" component={CarouselPage} options={{ headerShown: false, gestureEnabled:false}} />
      <CarouselStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false, gestureEnabled:false }} />
      <CarouselStack.Screen name="CelebrityInfo" component={CelebrityInfo} options={{ headerShown: false }} />
    </CarouselStack.Navigator>
  );
}

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Details" component={Details} />
        <Tab.Screen name="CarouselStack" component={CarouselStackScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
