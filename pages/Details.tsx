import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ButtonAniol from "../components/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Details() {
  const [text, setText] = useState<string>("Hello Details");

  const onPress = () => {
    console.log("Hello");
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("Details");
      setText("Details");
    }, 5000);
  }, []);

  return (
    <View>
      <ButtonAniol
        title="Details tab button"
        onPress={onPress}
      />
      <Text>{text}</Text>
      <StatusBar />
    </View>
  );
}
