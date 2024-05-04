import { Button, StyleSheet, Text, View } from "react-native";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
  CallContent,
} from "@stream-io/video-react-native-sdk";

import React from "react";

type Props = { goToHomeScreen: () => void; callId: string };

export const CallScreen = ({ goToHomeScreen, callId }: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const [timer, setTimer] = React.useState(30);

  const client = useStreamVideoClient();

  React.useEffect(() => {
    const call = client?.call("default", callId);
    call?.join({ create: false }).then(() => setCall(call || null));
  }, [client]);

  // Countdown of 30 seconds and leave call
  const id = React.useRef<number | null>(null);
  const clear = () => {
    if (id.current !== null) {
      window.clearInterval(id.current);
    }
  };
  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      call?.leave();
      goToHomeScreen();
    }
  }, [timer]);

  // parse time seconds into format MM:SS
  const parseTimefromSecToMin = (timer: number) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!call) {
    return <Text style={styles.text}>Joining call...</Text>;
  }
  return (
    <StreamCall call={call}>
      <View style={styles.container}>
        <Text style={styles.text}>Timer: {parseTimefromSecToMin(timer)}</Text>
        <CallContent onHangupCallHandler={goToHomeScreen} />
      </View>
    </StreamCall>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
