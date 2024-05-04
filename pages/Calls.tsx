import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
  CallContent,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { CallScreen } from "./CallScreen";
import { HomeScreen } from "./HomeScreen";

import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const apiKey = "jhetkeefqndt";
  const userId = "general-id";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2VuZXJhbC1pZCJ9.nSLP_-4l_F23cMazgldjZLT1OFIHpbzDL806U8wRYIE";
  const callId = "benefan_room_1";
  const user: User = {
    id: userId,
    name: session?.user?.email,
  };

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("default", callId);

  const [activeScreen, setActiveScreen] = useState("home");
  const goToCallScreen = () => setActiveScreen("call-screen");
  const goToHomeScreen = () => setActiveScreen("home");

  return (
    <StreamVideo client={client}>
      <SafeAreaView style={styles.container}>
        {activeScreen === "call-screen" ? (
          <CallScreen
            goToHomeScreen={goToHomeScreen}
            callId={callId}
          />
        ) : (
          <HomeScreen goToCallScreen={goToCallScreen} />
        )}
      </SafeAreaView>
    </StreamVideo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});
