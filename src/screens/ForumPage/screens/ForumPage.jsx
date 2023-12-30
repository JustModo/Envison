import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../styles";
import { useNavigation } from "@react-navigation/native";

export default function ForumScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <Text style={{ color: "white" }}>Forum</Text>
      </View>
    </SafeAreaView>
  );
}