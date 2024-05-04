import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ButtonAniol from "../components/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [text, setText] = useState<string>("Hello Home");

  const signOut = async () => {
    console.log("Hello Home");
    await supabase.auth.signOut()
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("Home");
      setText("Home");
    }, 5000);
  }, []);

  return (
    <View>
      <ButtonAniol
        title="Logout"
        onPress={signOut}
      />
      <Text>{text}</Text>
      <StatusBar />
    </View>
  );
}
