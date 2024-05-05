import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";

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
  const BackButtonPress = () => {
    // TODO when merge with Josep
    Alert.alert("Back button pressed!");
  }
  const ConfigCeleb = () => {
    // TODO No se que s'ha de fer 
    Alert.alert("Back button pressed!");
  }
  return (
    <View>
        <View  style={styles.Headline}>
            <View style={[styles.Group311,styles.rectangleContainer]}>
                <TouchableOpacity onPress={BackButtonPress}>
                    <View style={styles.square}>
                        <Text style={styles.arrow}>◀</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.YourCelebrities}>Your Celebrities</Text>
            </View>
        </View>
        <View style={[styles.dateContainer,styles.mt20]}>
            <Text style={styles.dateText}>May 4, 2024</Text>
        </View>
        <View style={[styles.AllRecords,styles.mt20,]}>
        <View style={[styles.Group457,styles.centering]}>
            <View style={[styles.Records2,styles.mt20,]}>
                <Image
                    style={styles.MaskGroup1}
                    source={require("../assets/image 2TaylorSwift.png")     }
                />
                <View style={styles.Group7401}>
                <Text style={styles.Messi}>Taylor Swift</Text>
                <Text style={[styles.Football,styles.mt10]}>Singer</Text>
                <Text style={[styles._1833h,styles.mt10]}>13:33h</Text>
            </View>
            <View style = {[,styles.AllignRight]}>
                <TouchableOpacity onPress={ConfigCeleb}>
                    <View style = {[,styles.AllignRight]}>
                    <Image
                     
                    source={require("../assets/buttonCall.png")     }
                    />
                    </View>
                </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.Records2,styles.mt20,]}>
            <Image
              style={styles.MaskGroup1}
              source={require("../assets/image 3Messi.png")     }
            />
            <View style={styles.Group7401}>
              <Text style={styles.Messi}>Messi</Text>
              <Text style={[styles.Football,styles.mt10]}>Football</Text>
              <Text style={[styles._1833h,styles.mt10]}>18:33h</Text>
            </View>
            <View style = {[,styles.AllignRight]}>
                <TouchableOpacity onPress={ConfigCeleb}>
                    <View style = {[,styles.AllignRight]}>
                    <Image
                     
                    source={require("../assets/buttonCall.png")     }
                    />
                    </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the image horizontally
    alignItems: 'center', // Center the image vertically
    paddingTop: 20, // Separate from the top
    paddingBottom: 20, // Separate from the bottom
    paddingHorizontal:50,
  },
  rectangleContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  textContainer: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    lineHeight: 54,
  },
  group442: {
    alignItems: "center",
  },
  welcomeBack: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  mb20: {
    marginBottom: 20,
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
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(12, 25, 29, 0.16)",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,1)",
  },
  EmailInput: {
    flex: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    paddingVertical: 0,
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
    width: 295,
    height: 54,
    borderRadius: 12,
    backgroundColor: "rgba(77,141,147,1)",
  },
  rectangleButton: {
    width: "100%",
    height: "100%",
  },
  square: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginRight:30,
  },
  arrow: {
    fontSize: 12,
    color: "rgba(77,141,147,1)",
  },
  YourCelebrities: {
    color: "rgba(12,25,29,1)",
    fontWeight: "500",
    fontSize: 20,
    
  },  
  Headline: {
    width: 182,
    height: 30,
    
  },
  Group311: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",

  },
  Group: {
    width: 30,
    height: "100%",
  },
  dateContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 8,
    paddingLeft: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
    AllRecords: {
    position: "relative",
    height: 193,
  },
  MaskGroup: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 55,
    height: 60,
  },
  Group457: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  Group740: {
    display: "flex",
    flexDirection: "column",
    height: "100%",

  },
  TaylorSwift: {
    color: "rgba(0,0,0,1)",
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  Singer: {
    color: "rgba(12,25,29,1)",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Rubik, sans-serif",
    fontWeight: "300",
    letterSpacing: -0.3,
  },
  _1353h: {
    color: "rgba(77,141,147,1)",
    fontSize: 12,
    lineHeight: 12,
    fontFamily: "Rubik, sans-serif",
    fontWeight: "300",
  },
  Group741: {
    width: 4,
    height: 20,
  },
  Records2: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 9,
    paddingBottom: 14,
    borderRadius: 8,
    
    backgroundColor: "rgba(255,255,255,1)",
  },
  MaskGroup1: {
    width: 55,
    height: 60,
    borderRadius:10,

  },
  Group7401: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingRight: 31,

  },
  Messi: {
    color: "rgba(0,0,0,1)",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Rubik, sans-serif",
    fontWeight: "500",
    paddingLeft: 10,
  },
  Football: {
    color: "rgba(12,25,29,1)",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Rubik, sans-serif",
    paddingLeft: 10,
    letterSpacing: -0.3,
  },
  _1833h: {
    color: "rgba(77,141,147,1)",
    fontSize: 12,
    lineHeight: 12,
    fontFamily: "Rubik, sans-serif",
    fontWeight: "300",
    paddingLeft: 10,
  },
  Group7411: {
    width: 4,
    height: 20,
  },
  AllignRight: {
    position: 'absolute', // Position the container absolutely within its parent
    top: 0, // Align the container to the top edge
    right: 0, // Align the container to the right edge
    padding: 5
  },
  centering: {
    flex: 1, // Take up all available space
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    padding: 20, // Add a separation of 10 units on each side
  },
})
