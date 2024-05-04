import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";
import commonStyles from '../styles/commonStyles';
import BlobBackground from "./BlobBackground";


export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <BlobBackground>
    <View style={styles.container}>
      <Text />
      <View>
        <View style={styles.group442}>
          <Text style={commonStyles.header}>Welcome </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Image
        style={styles.Group11013}
        source={
          require( "../assets/Logo.png")
      }
    />
      </View>
      <View style={[styles.inputContainer, styles.verticallySpaced]}>
      <View
        style={styles.Email}>
        <Input
           leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            style={commonStyles.description_left}
            />
          </View>

        <View 
            style={[styles.Email,styles.mt10]}>
          <Input

            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
            style={commonStyles.description_left}
          />
        </View>   
        <View style={[styles.container,styles.mt20]}>
          <View style={[styles.rectangleContainer, styles.mt20]}>
            <TouchableOpacity style={[styles.rectangleButton]} onPress={() => signInWithEmail()}>
              <Text style={commonStyles.textContainer}>Sign In</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.rectangleContainer, styles.mt10]}>
          <TouchableOpacity style={[styles.rectangleButton]} onPress={() => signInWithEmail()}>
            <Text style={commonStyles.textContainer}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
    </BlobBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the image horizontally
    alignItems: 'center', // Center the image vertically
    paddingTop: 50, // Separate from the top
    paddingBottom: 50, // Separate from the bottom
    paddingHorizontal:50,
  },
  group442: {
    alignItems: "center",
  },
  youCanSearchCourseAp: {
    textAlign: "center",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  mb20:{
    marginBottom:20,
  },
  inputContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
    marginBottom: 20,
  },
  Tab: {
    width: 335,
    height: 126,
  },
  Group716: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  Email: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(12, 25, 29, 0.16)",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,1)",
  },
  EmailInput: {
    flex: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    paddingVertical: 0, // Override default padding
  },
  Vector: {
    width: 15,
    height: 11,
  },
  Password: {
    width: "100%",
    height: 54,
  },
  Group11013: {
    width: 232.48,
    height: 180,
  },
  Rectangle42: {
    width: 85,
    height: 54,
    borderRadius: 12,
    backgroundColor: "rgba(77,141,147,1)",
  },
  rectangleContainer: {
    width: 295,
    height: 54,
    borderRadius: 12,
    backgroundColor: 'rgba(77,141,147,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleButton: {
    width: '100%',
    height: '100%',
  },
});
