import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState} from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTabBar } from "../../../navigation/TabBarContext";
import { useNavigation } from "@react-navigation/native";

const IntroScreen = () => {
  const navigation = useNavigation();
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const [selectedValue, setSelectedValue] = useState("");

  function handleClick() {
    if (name.trim() === "") {
      alert("Cannot Leave Blank!");
    } else {
      AsyncStorage.setItem("hasShownIntro", "true");
      AsyncStorage.setItem("USERNAME", name);
      navigation.navigate("Home1");
    }
  }

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  const [name, setName] = useState("");

  const handleNameChange = (text) => {
    setName(text);
  };

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={{
            width: "90%",
            height: 90,
            marginTop: 30,
            borderRadius: 20,
          }}
        />
        <View
          style={{
            width: "90%",
            height: "100%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 100,
              marginBottom: 10,
            }}
          >
            Enter Your Name:
          </Text>
          <TextInput
            style={{
              color: "black",
              backgroundColor: "white",
              borderRadius: 10,
              paddingLeft: 10,
              fontSize: 18,
              height: 40,
            }}
            placeholder="Name"
            value={name}
            onChangeText={handleNameChange}
          ></TextInput>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 50,
              marginBottom: 10,
            }}
          >
            Select:
          </Text>
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 10,
              width: "100%",
              backgroundColor: "white",
              color: "black",
              alignSelf: "center",
            }}
            onValueChange={() => handleValueChange()}
          >
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Blur Vision" value="BlurVision" />
            <Picker.Item label="Cataract" value="Cataract" />
            <Picker.Item label="Colour Blindness" value="ColourBlindness" />
          </Picker>
          <TouchableOpacity
            title="Continue"
            onPress={() => {
              handleClick();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 200,
            }}
          >
            <View
              style={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 10,
                paddingLeft: 10,
                width: "80%",
                height: 45,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    rowGap: 10,
  },
  container: {
    width: "90%",
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    rowGap: 10,
  },
});

export default IntroScreen;
