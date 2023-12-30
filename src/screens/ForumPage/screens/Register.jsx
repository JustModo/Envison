import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../styles";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { handleLogin, handleRegister } from "../api";

export default function Register() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  async function handleRegisterClick() {
    if (username != "" && password != "" && cpassword != "") {
      if (password === cpassword) {
        if (await handleRegister(username, password)) {
          if (await handleLogin(username, password)) {
            navigation.navigate("Post");
          }
        }
      } else {
        alert("Passwords Must Match!");
      }
    } else {
      alert("Can't Leave Blank");
    }
  }
  return (
    <SafeAreaView style={style.screen}>
      <View style={[style.container, { overflow: "hidden" }]}>
        <View style={style1.con1}>
          <View>
            <Text style={[style1.heading, { marginTop: 50, marginBottom: 10 }]}>
              Register
            </Text>
          </View>
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
            <TextInput
              style={style1.textinput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={cpassword}
              onChangeText={(text) => setCPassword(text)}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                handleRegisterClick();
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
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
                  Register
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
              onPress={() => navigation.navigate("Login")}
            >
              Login
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
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  heading: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 50,
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
    justifyContent: "space-between", // Align children with space in between
    rowGap: 20,
  },
});
