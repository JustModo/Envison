import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { style } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import SquareTab from "../components/SquareTab";
import { useTabBar } from "../../../navigation/TabBarContext";

export default function Chapters() {
  const index = Array.from({ length: 40 }, (_, index) => index + 1);
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);
  
  return (
    <SafeAreaView style={style.screen}>
      <View style={[style1.container]}>
        <Text
          style={[
            style1.text,
            { fontSize: 40, marginTop: 10, alignSelf: "center" },
          ]}
        >
          Chapters
        </Text>
        <ScrollView
          contentContainerStyle={{
            marginTop: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-evenly",
            paddingBottom: 20,
          }}
        >
          {index.map((i) => (
            <SquareTab index={i} key={i} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style1 = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
    marginTop: 10,
  },
});
