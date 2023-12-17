import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./styles";
import { useEffect, useRef, useState } from "react";
import { useTabBar } from "../../../navigation/TabBarContext";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ColorPalette from "../components/ColorPalette";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PickerScreenChoice({ route }) {
  const navigation = useNavigation();
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const [dispCol, setDispCol] = useState();

  const { passcolor } = route.params;

  useEffect(() => {
    setDispCol(route.params.passcolor);
  }, [passcolor]);

  const updateParentState = (newValue) => {
    setDispCol(newValue);
    console.log("Parent", newValue);
  };

  return (
    <SafeAreaView style={style.screen}>
      <View style={styles2.container}>
        <Pressable
          style={styles2.div}
          onPress={() => navigation.navigate("Picker")}
        >
          <View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Camera
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={styles2.div}
          onPress={() => navigation.navigate("PickerWheel")}
        >
          <View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Color Wheel
            </Text>
          </View>
        </Pressable>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: dispCol,
            position: "absolute",
            top: 30,
            right: 30,
          }}
        />
      </View>
      <View style={{ alignSelf: "flex-end", marginBottom: 70, margin: 20 }}>
        <ColorPalette
          initialBoxesPerRow={15}
          updateParentState={updateParentState}
        />
      </View>
    </SafeAreaView>
  );
}

const styles2 = StyleSheet.create({
  div: {
    width: "95%",
    backgroundColor: "#181818",
    flexDirection: "column",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignSelf: "center",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
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
    gap: 100,
    justifyContent: "center",
  },
});
