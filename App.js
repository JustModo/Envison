import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { TabBarProvider } from "./src/navigation/TabBarContext";

export default function App() {
  return (
    <NavigationContainer>
      <TabBarProvider>
        <AppNavigator />
      </TabBarProvider>
    </NavigationContainer>
  );
}
