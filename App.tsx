import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ButtonAniol from "./components/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [text, setText] = useState<string>("Hello World");

  const onPress = () => {
    console.log("Hello");
    setText("Hello Aniol");
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("useEffect");
      setText("useEffect");
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <View className="flex-1 items-center justify-center">
        <ButtonAniol
          title="Click para cambiar el texto"
          onPress={onPress}
        />
        <Text>{text}</Text>
        <StatusBar />
      </View>
    </NavigationContainer>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
}); */
