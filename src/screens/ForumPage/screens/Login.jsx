import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../styles";
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { handleLogin } from "../api";

export default function Login() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const clearKey = async () => {
  //     await AsyncStorage.setItem("TOKEN", "");
  //   };
  //   clearKey();
  // }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation, isFocused]);

  async function handleLoginClick() {
    if (username != "" && password != "") {
      const res = await handleLogin(username, password);
      console.log(res);
      if (res == true) {
        navigation.navigate("Post");
      } else if (res === "Request timed out") {
        BackHandler.removeEventListener("hardwareBackPress", false);
        navigation.navigate("Error");
      }
    } else {
      alert("Can't Leave Blank");
    }
  }

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <View style={style1.con1}>
          <Text style={[style1.heading, { marginTop: 50 }]}>Login</Text>
          <View style={style1.con11}>
            <TextInput
              style={style1.textinput}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            ></TextInput>
            <TextInput
              style={style1.textinput}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                handleLoginClick();
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100,
              }}
            >
              <View style={style1.btnview}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 15,
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style1 = StyleSheet.create({
  con1: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  heading: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
  },
  textinput: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 18,
    height: 40,
    width: 300,
  },
  btnview: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
    width: 150,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  con11: {
    marginTop: 200,
    flex: 1,
    rowGap: 30,
  },
});
