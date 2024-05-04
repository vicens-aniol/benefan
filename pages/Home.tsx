import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ButtonAniol from "../components/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("Hello Home");

  const onPress = () => {
    console.log("Hello Home");
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
        title="Home tab button"
        onPress={onPress}
      />
      <Text>{text}</Text>
      <StatusBar />
    </View>
  );
}
