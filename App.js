import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { TabBarProvider } from "./src/navigation/TabBarContext";
import IntroScreen from "./src/screens/HomePage/screens/IntroScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {


  return (
    <NavigationContainer>
      <TabBarProvider>
        <AppNavigator />
      </TabBarProvider>
    </NavigationContainer>
  );
}
