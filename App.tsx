import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import Details from "./pages/Details";

import ScheduleScreen from "./pages/ScheduleScreen";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import { Session } from "@supabase/supabase-js";
import { View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import CarrouselPage from "./pages/CarrouselPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
        <Tab.Screen
          name="Home"
          component={Home}
          />
        <Tab.Screen
          name="Details"
          component={ScheduleScreen}
          options={{
            headerShown: false, // Disable the header for this tab
          }}
          />
        <Tab.Screen
          name="Carrousel"
          component={CarrouselPage}
          options={{
            headerShown: false, // Disable the header for this tab
          }}
          />
      </Tab.Navigator>

    </NavigationContainer>
  ) : (
    <Auth />
  );
};

export default App;
