import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { style } from "./styles";
import Login from "./screens/Login";
import ForumScreen from "./screens/ForumPage";
import PostScreen from "./screens/PostPage";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/Register";
import ErrorPage from "./screens/ErrorPage";
const Stack = createStackNavigator();

function ForumPage(props) {
  return (
    <Stack.Navigator initialRouteName={"Error"}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, gestureEnabled:false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false, gestureEnabled:false }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false, gestureEnabled:false }}
      />
      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={{ headerShown: false, gestureEnabled:false }}
      />
      <Stack.Screen
        name="Error"
        component={ErrorPage}
        options={{ headerShown: false, gestureEnabled:false }}
      />
    </Stack.Navigator>
  );
}

export default ForumPage;
