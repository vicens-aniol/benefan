import { Button, StyleSheet, Text, View } from "react-native";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
  CallContent,
} from "@stream-io/video-react-native-sdk";

import React from "react";
import { supabase } from "../lib/supabase";

type Props = {
  goToHomeScreen: () => void;
  goToThankYouScreen:() => void;
  callId: string;
  queue: any;
  session: any;
};

export const CallScreen = ({
  goToHomeScreen,
  goToThankYouScreen,
  callId,
  queue,
  session,
}: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const [timer, setTimer] = React.useState(3);

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

  async function removeUserfromQueue() {
    function filterOutByEmail(queue: any[], email: string) {
      // Return a new array excluding elements matching the given email
      return queue.filter((item) => item !== email);
    }

    const updatedQueue = filterOutByEmail(queue, session?.user?.email);

    const { error } = await supabase
      .from("room_video_calls")
      .update({ queue: updatedQueue })
      .eq("call_id", callId);

    if (error) {
      console.error("Error updating queue:", error.message);
    } else {
      console.log("Queue updated successfully");
    }
  }

  React.useEffect(() => {
    if (timer === 0) {
      call?.leave();
      // Navigate to home screen, remove from the queue
      removeUserfromQueue();
      goToThankYouScreen();
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
        <Text style={styles.timerText}>
          {parseTimefromSecToMin(timer)}
        </Text>
        {/* <Text style={styles.text}>Room: {callId}</Text> */}
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

  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
});
