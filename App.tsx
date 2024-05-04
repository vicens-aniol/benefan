import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Calls from "./pages/Calls";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import { Session } from "@supabase/supabase-js";
import { View, Text } from "react-native";

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
        screenOptions={{
          tabBarStyle: {
            height: 170, // Adjust the height to your preference
            paddingBottom: 60, // Adjust this to control the bottom padding
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Details"
          component={Details}
        />
        <Tab.Screen
          name="Calls"
          component={Calls}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Auth />
  );
};

export default App;
