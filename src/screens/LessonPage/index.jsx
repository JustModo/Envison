import React from "react";
import { Pressable, SafeAreaView, StatusBar, View } from "react-native";
import { style } from "./styles";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import MainLesson from "./screens/MainLesson";
import Chapters from "./screens/Chapters";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LessonDisplay from "./screens/LessonDisplay";

const Stack = createStackNavigator();

function LessonPage(props) {
  return (
    <Stack.Navigator initialRouteName={"MainLesson"}>
      <Stack.Screen
        name="MainLesson"
        component={MainLesson}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          headerShown: true,
          gestureEnabled: false,
          ...TransitionPresets.FadeFromBottomAndroid,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
          headerLeft: (props) => (
            <Pressable {...props}>
              <MaterialIcons
                name="arrow-back"
                size={40}
                color={"white"}
                style={{ marginTop: 20, marginLeft: 30 }}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="LessonDisplay"
        component={LessonDisplay}
        options={{
          headerShown: true,
          gestureEnabled: false,
          ...TransitionPresets.FadeFromBottomAndroid,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
          headerLeft: (props) => (
            <Pressable {...props}>
              <MaterialIcons
                name="arrow-back"
                size={40}
                color={"white"}
                style={{ marginTop: 20, marginLeft: 30 }}
              />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default LessonPage;
