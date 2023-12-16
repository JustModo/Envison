import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./styles";
import { useEffect, useRef, useState } from "react";
import { useTabBar } from "../../../navigation/TabBarContext";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TriangleColorPicker } from "react-native-color-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PickerScreenWheel() {
  const navigation = useNavigation();
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const handlePress = (color) => {
    // console.log(color);
    addColor(color)
  };

  const addColor = async (value) => {
    const arr = await AsyncStorage.getItem("SavedColor");
    const colorArray = JSON.parse(arr);
    let temp = colorArray.slice();
    temp.unshift(value);
    const maxLength = 18;
    if (temp.length > maxLength) {
      temp = temp.slice(0, maxLength);
    }
    while (temp.length < 18) {
      temp.push("transparent");
    }
    // console.log(`To be appended ${temp} from ${arr}`)
    await AsyncStorage.setItem("SavedColor", JSON.stringify(temp));
    // console.log(`Saved 1 ${temp} in Async`);
    navigation.navigate("PickChoice", { passcolor: value });
  };

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <TriangleColorPicker
          onColorSelected={(color) => {
            handlePress(color);
          }}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}
