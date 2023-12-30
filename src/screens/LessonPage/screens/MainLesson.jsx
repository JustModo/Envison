import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import VTab from "../components/VTab";
import { useTabBar } from "../../../navigation/TabBarContext";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MainLesson() {
  const data = [
    { name: "Sketching", icon: "book-lock-open-outline" },
    { name: "Lines and Shapes" },
    { name: "Shading Techniques" },
    { name: "Introduction to Colors" },
    { name: "Coloring Basics" },
    { name: "Simple Compositions" },
    { name: "Adding Depth with Shadows" },
    { name: "Basic Perspective" },
    { name: "Exploring Light and Dark" },
    { name: "Texture Techniques" },
    { name: "Color Theory Basics" },
    { name: "Understanding Color Harmony" },
    { name: "Mixing Primary Colors" },
    { name: "Creating Tints and Shades" },
    { name: "Color Gradients" },
    { name: "Coloring Realistic Objects" },
    { name: "Creating a Color Palette" },
    { name: "Color Contrast Techniques" },
    { name: "Advanced Composition" },
    { name: "Expressive Color Usage" },
    { name: "Color Symbolism in Art" },
    { name: "Mastering Color Relationships" },
    { name: "Advanced Color Mixing" },
    { name: "Color in Abstract Art" },
    { name: "Personal Style Development" },
  ];
  const { updateTabBarStyle } = useTabBar();

  useFocusEffect(
    React.useCallback(() => {
      updateTabBarStyle({ display: "flex" });
    }, [])
  );

  return (
    <SafeAreaView style={style.screen}>
      <View style={[style.container, { flexDirection: "column", gap: 10 }]}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Lessons
        </Text>
        <ScrollView
          contentContainerStyle={{ flexDirection: "column", gap: 10 }}
        >
          {data.map((item, index) => (
            <VTab key={index} name={item.name} index={index} icon={item.icon} />
          ))}
          <TouchableOpacity
            style={{
              height: 70,
              width: "100%",
              borderWidth: 3,
              borderColor: "#ffffff",
              borderRadius: 20,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={[style1.text, { fontSize: 25 }]}>Explore More!</Text>
            <MaterialIcons name={"store"} color={"white"} size={40} />
          </TouchableOpacity>
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
});
