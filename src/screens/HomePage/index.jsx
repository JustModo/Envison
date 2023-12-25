import React, { useEffect, useState } from "react";
import IntroScreen from "./screens/IntroScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();

function HomePage(props) {
  const [showIntro, setShowIntro] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    async function checkIntroStatus() {
      // await AsyncStorage.setItem("hasShownIntro", "false");

      const hasShownIntro = await AsyncStorage.getItem("hasShownIntro");
      if (hasShownIntro === null) {
        await AsyncStorage.setItem("hasShownIntro", "false");
      }

      const updatedHasShownIntro = await AsyncStorage.getItem("hasShownIntro");

      if (updatedHasShownIntro === "false") {
        setShowIntro(false);
        console.log("Intro has not been shown.");
        navigation.navigate("Intro");
      } else if (updatedHasShownIntro === "true") {
        setShowIntro(true);
        console.log("Intro has been shown.");
      }
    }

    checkIntroStatus();
  }, []);

  return (
    <Stack.Navigator initialRouteName={"Home1"}>
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home1"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default HomePage;
