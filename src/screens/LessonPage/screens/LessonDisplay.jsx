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
import { useTabBar } from "../../../navigation/TabBarContext";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function LessonDisplay() {
  const nav = useNavigation();

  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const steps = [
    {
      heading: "Introduction:",
      text: "Welcome to the world of sketching! Today, we'll embark on a journey to create a simple yet beautiful landscape through step-by-step instructions. Sketching is not only a wonderful form of artistic expression but also a relaxing and enjoyable activity.",
    },
    {
      heading: "Step 1: Gather Your Materials",
      text: "Ensure you have all the necessary materials at hand – sketchbook or paper, pencils, and erasers. If you want to add a splash of color, grab some colored pencils or markers.",
    },
    {
      heading: "Step 2: Setting the Scene - Horizon Line and Sky",
      text: "Start by drawing a horizontal line across your paper. This line represents the horizon. Above the line, sketch in a gentle curve to create the sky. Feel free to experiment with different sky effects like clouds or a setting sun.",
    },
    {
      heading: "Step 3: Groundwork - Creating the Ground and Foreground",
      text: "Below the horizon line, sketch a wavy or uneven line to represent the ground. This can be the basis for your landscape. Add a few simple shapes or lines in the foreground to create elements like rocks, flowers, or grass.",
    },
    {
      heading: "Step 4: Merging with Nature - Adding Trees and Mountains",
      text: "Extend your landscape by drawing simple, triangular shapes for mountains in the background. Use vertical lines or clusters of lines for trees. Experiment with varying sizes and shapes to create visual interest.",
    },
    {
      heading: "Step 5: Water Elements - Rivers or Lakes (Optional)",
      text: "If you'd like to include water in your landscape, draw gentle curves to represent rivers or lakes. Consider adding reflections of nearby elements in the water for a realistic touch.",
    },
    {
      heading: "Step 6: Detailing - Adding Texture and Depth",
      text: "Go back to each element of your landscape and add small details to create texture and depth. For example, add lines to represent the texture of tree bark, or dots to signify flowers in the foreground.",
    },
    {
      heading: "Step 7: Play with Shadows and Shading",
      text: "Use shading to add depth to your landscape. Identify a light source (imagine the sun) and shade one side of each element. This simple technique can make your landscape come alive.",
    },
    {
      heading: "Step 8: Optional - Adding Color",
      text: "If you have colored pencils or markers, you can now add color to your sketch. Experiment with different color combinations to enhance the vibrancy of your landscape.",
    },
  ];

  return (
    <SafeAreaView style={style.screen}>
      <View style={style1.container}>
        <Text
          style={[
            style1.heading,
            { fontSize: 40, marginTop: 10, alignSelf: "center" },
          ]}
        >
          Lesson 1
        </Text>
        <ScrollView
          contentContainerStyle={{
            marginTop: 20,
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 20,
            paddingBottom: 30,
          }}
        >
          {steps.map((step, index) => (
            <View key={index} style={style1.txtcon}>
              <Text style={[style1.heading, { marginBottom: 10 }]}>
                {step.heading}
              </Text>
              <Text style={style1.text}>{step.text}</Text>
              <View
                style={{
                  height: 40,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity>
                  <MaterialIcons name="image" size={30} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons
                    name="text-to-speech"
                    size={30}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={{
              height: 50,
              width: "100%",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#ffffff",
            }}
            onPress={() => nav.goBack()}
          >
            <MaterialIcons name="check" size={40} color={"white"} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style1 = StyleSheet.create({
  text: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "white",
    flexWrap: "wrap",
    textAlign: "justify",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  txtcon: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
  },
  container: {
    width: "90%",
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    marginTop: 10,
  },
});
