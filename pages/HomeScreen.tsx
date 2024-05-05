import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CountdownTimerPage from "./CountdownTimerPage";

type Props = {
  goToCallScreen: () => void;
  canEnterCall: boolean;
  inTheQueue: boolean;
  queueInfo: any;
};

export const HomeScreen = ({
  goToCallScreen,
  canEnterCall,
  queueInfo,
  inTheQueue,
}: Props) => {

  useEffect(() => {
    canEnterCall && goToCallScreen();
  }, [canEnterCall])

  return (
       !canEnterCall && <CountdownTimerPage time={queueInfo.queue.length * 60 - 60}/>
  );
}



const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textWaiting: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "blue",
  },
  textNoWaiting: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "red",
  },
});
