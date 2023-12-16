import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PaletteScreen from "./screens/PaletteScreen";
import PickerScreen from "./screens/PickerScreenCamera";
import ToolsHomeScreen from "./screens/ToolsHomeScreen";
import { Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import PickerScreenChoice from "./screens/PickerScreenChoice";
import PickerScreenWheel from "./screens/PickerScreenWheel"

const Stack = createStackNavigator();

function ColorToolsPage({ route }) {
  return (
    <Stack.Navigator
      initialRouteName="ToolsHome"   
      screenOptions={{
        ...MyTransition,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTransparent: {},
        headerLeft: (props) => (
          <Pressable {...props}>
            <MaterialIcons
              name="arrow-back"
              size={40}
              color={"white"}
              style={{ margin: 10, marginLeft:30 }}
            />
          </Pressable>
        ),
      }}
      
    >
      <Stack.Screen
        name="Palette"
        component={PaletteScreen}
        options={{ headerShown: true }}
        screenOptions={{}}
      />
      <Stack.Screen
        name="Picker"
        component={PickerScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ToolsHome"
        component={ToolsHomeScreen}
        initialParams={{ navigationFromTab: true }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PickChoice"
        component={PickerScreenChoice}
        initialParams={{ navigationFromTab: true }}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="PickerWheel"
        component={PickerScreenWheel}
        initialParams={{ navigationFromTab: true }}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    };
  },
}



export default ColorToolsPage;
