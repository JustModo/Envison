import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./styles";
import { useEffect, useRef, useState } from "react";
import { useTabBar } from "../../../navigation/TabBarContext";
import React from "react";
import ColorPalette from "../components/ColorPalette";

export default function PaletteScreen() {
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <ColorPalette initialBoxesPerRow={10}/>
      </View>
    </SafeAreaView>
  );
}

