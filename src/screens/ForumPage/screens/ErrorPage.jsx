import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../styles";
import { pingServer } from "../api";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/Fontisto";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ErrorPage() {
  const navigation = useNavigation();
  const [dispText, setDispText] = useState("Establishing Connection!");
  const [offline, setOffline] = useState(false);
  // const [IP, setIP] = useState("");
  // const [baseURL, setBaseURL] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      establishConnection();
    }, [])
  );

  function establishConnection() {
    setDispText("Establishing Connection!");
    setOffline(false);
    // let url = `http://${IP}:3000`;
    // setBaseURL(url);
    const res = pingServer()
      .then((successMessage) => {
        setDispText("Connected");
        navigation.navigate("Login");
      })
      .catch((error) => {
        setOffline(true);
        setDispText("Server is Offline :/");
        // alert(error);
      });
  }

  // useEffect(() => {
  //   setBaseURL(`${IP}`);
  // }, [IP]);

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
        {/* <Text
          style={{
            color: "white",
            fontSize: 25,
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {baseURL}
        </Text> */}
        {offline && (
          <>
            {/* <TextInput
              style={{
                width: 100,
                height: 30,
                backgroundColor: "white",
                marginTop: 10,
                paddingLeft: 10,
                position: "absolute",
                top: 10,
                left: 20,
              }}
              value={IP}
              onChangeText={(text) => {
                setIP(text);
              }}
            /> */}
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: "#ffffff",
                width: 50,
                height: 50,
                borderRadius: 50,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 3,
              }}
              onPress={() => establishConnection()}
            >
              <MaterialIcons name={"redo"} size={30} color={"white"} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
