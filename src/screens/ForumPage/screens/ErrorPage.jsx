import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../styles";
import { pingServer } from "../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function ErrorPage() {
  const navigation = useNavigation();

  const [dispText, setDispText] = useState("Establishing Connection!");
  useEffect(() => {
    const res = pingServer()
      .then((successMessage) => {
        setDispText("Connected");
        navigation.navigate("Login");
      })
      .catch((error) => {
        setDispText("Server is Offline :/");
        // console.error(error.message);
      });
  }, []);

  return (
    <SafeAreaView style={style.screen}>
      <View
        style={[
          style.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {dispText}
        </Text>
      </View>
    </SafeAreaView>
  );
}
