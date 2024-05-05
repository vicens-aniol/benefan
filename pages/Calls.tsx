import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { CallScreen } from "./CallScreen";
import { HomeScreen } from "./HomeScreen";

import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function Calls(roomCallId: string) {
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
  const user: User = {
    id: userId,
    name: session?.user?.email,
  };

  const client = new StreamVideoClient({ apiKey, user, token });

  const [activeScreen, setActiveScreen] = useState("home");
  const goToCallScreen = () => setActiveScreen("call-screen");
  const goToHomeScreen = () => setActiveScreen("home");

  // Function to fetch room calls and update the queueInfo state
  async function getRoomCalls() {
    // Fetch the initial room call data with queue and free columns
    const { data: roomCalls, error } = await supabase
      .from("room_video_calls")
      .select("call_id, queue, free") // Include `call_id` explicitly
      .eq("call_id", roomCallId); // Filter by the specific roomCallId

    if (error) {
      console.error("Error fetching room calls:", error.message);
      return;
    }

    if (roomCalls && roomCalls.length > 0) {
      const firstCall = roomCalls[0] as RoomVideoCall; // Cast to RoomVideoCall

      // Set the full structure, including the call_id field
      setQueueInfo({
        call_id: firstCall.call_id, // Ensure `call_id` is included
        queue: firstCall.queue,
        free: firstCall.free,
      });
    } else {
      console.warn("No matching room calls found.");
      setQueueInfo({
        call_id: roomCallId, // Provide the original roomCallId in case no calls are found
        queue: [],
        free: false,
      });
    }
  }
  // Define the structure of a Room Video Call record
  interface RoomVideoCall {
    call_id: string;
    queue: any[]; // Replace `any[]` with a more specific type if available
    free: boolean;
  }

  // Initialize the state with a defined structure
  const [queueInfo, setQueueInfo] = useState<RoomVideoCall>({
    call_id: "",
    queue: [],
    free: false,
  });

  // Adjust the real-time data fetching and subscription
  useEffect(() => {
    // Function to fetch the initial room calls
    async function getInitialRoomCalls() {
      const { data, error } = await supabase
        .from("room_video_calls")
        .select("call_id, queue, free")
        .eq("call_id", roomCallId);

      if (error) {
        console.error("Error fetching room calls:", error.message);
        return;
      }

      if (data && data.length > 0) {
        const firstCall = data[0] as RoomVideoCall; // Type assertion
        setQueueInfo({
          call_id: firstCall.call_id,
          queue: firstCall.queue,
          free: firstCall.free,
        });
      } else {
        console.warn("No matching room calls found.");
        setQueueInfo({ call_id: roomCallId, queue: [], free: false });
      }
    }

    // Fetch initial data on mount
    getInitialRoomCalls();

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`room_video_calls:${roomCallId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_video_calls",
          filter: `call_id=eq.${roomCallId}`,
        },
        (payload) => {
          // Type assertion to our RoomVideoCall interface
          const updatedCall = payload.new as RoomVideoCall | null;

          console.log("Change recieved");

          if (updatedCall) {
            setQueueInfo({
              call_id: updatedCall.call_id,
              queue: updatedCall.queue,
              free: updatedCall.free,
            });
          }
        }
      )
      .subscribe();

    // Clean up the subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCallId]);

  const [canEnterCall, setCanEnterCall] = useState<boolean>(false);
  const [inTheQueue, setInTheQueue] = useState<boolean>(false);

  useEffect(() => {
    setCanEnterCall(
      queueInfo.queue &&
        queueInfo.queue[0] === session?.user?.email &&
        queueInfo.free
    );

    setInTheQueue(
      queueInfo.queue && queueInfo.queue.includes(session?.user?.email)
    );

    console.log(queueInfo.queue);
    console.log(canEnterCall);
    console.log(session?.user);
  }, [queueInfo]);

  return (
    <StreamVideo client={client}>
      <SafeAreaView style={styles.container}>
        {activeScreen === "call-screen" ? (
          <CallScreen
            goToHomeScreen={goToHomeScreen}
            callId={roomCallId}
            queue={queueInfo.queue}
            session={session}
          />
        ) : (
          <HomeScreen
            goToCallScreen={goToCallScreen}
            canEnterCall={canEnterCall}
            queueInfo={queueInfo}
            inTheQueue={inTheQueue}
          />
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
