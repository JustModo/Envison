import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StatusBar, View } from "react-native";
import { style } from "./styles";
import Login from "./screens/Login";
import ForumScreen from "./screens/ForumPage";
import PostScreen from "./screens/PostPage";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Register from "./screens/Register";
import ErrorPage from "./screens/ErrorPage";
import AddPostPage from "./screens/AddPostPage";

const Stack = createStackNavigator();
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function ForumPage(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Error"
        component={ErrorPage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.BottomSheetAndroid,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.BottomSheetAndroid,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostPage}
        options={{
          headerShown: true,
          gestureEnabled: false,
          ...TransitionPresets.FadeFromBottomAndroid,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerTitle: "Add Post",
          headerTintColor: "white",
          headerLeft: (props) => (
            <Pressable {...props}>
              <MaterialIcons
                name="arrow-back"
                size={40}
                color={"white"}
                style={{ margin: 10, marginLeft: 30 }}
              />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default ForumPage;
