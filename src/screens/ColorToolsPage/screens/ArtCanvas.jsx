import React, { useEffect } from "react";
import { style } from "../styles";
import { SafeAreaView, View } from "react-native";
import { useTabBar } from "../../../navigation/TabBarContext";

export default function ArtCanvas() {
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}></View>
    </SafeAreaView>
  );
}
