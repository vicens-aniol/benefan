import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

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
  return (
    <View>
      <Text style={styles.text}>Welcome to Video Calling</Text>
      {canEnterCall ? (
        <Button
          title="You are now ready to enter"
          onPress={goToCallScreen}
        />
      ) : inTheQueue ? (
        <View>
          <Text style={styles.textWaiting}>Waiting for a call</Text>
          <Text style={styles.textWaiting}>
            Expected time {queueInfo.queue.length * 30 - 30} seconds
          </Text>
        </View>
      ) : (
        <Text style={styles.textNoWaiting}>You are not in the queue</Text>
      )}
    </View>
  );
};

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
