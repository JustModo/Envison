import ColorToolsPage from "../screens/ColorToolsPage";
import HomePage from "../screens/HomePage";
import LessonPage from "../screens/LessonPage";
import ForumPage from "../screens/ForumPage";
import DiscoverPage from "../screens/DiscoverPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTabBar } from "./TabBarContext";
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { tabBarStyle } = useTabBar();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarActiveTintColor: "#22c6dc",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarStyle: {
          backgroundColor: "#10161c",
          borderRadius: 10,
          borderWidth: 0,
          borderTopWidth: 0,
          borderColor: "#4C5866",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          padding: 10,
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
          ...tabBarStyle
        },
      })}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverPage}
        initialParams={{ navigationFromTab: true }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bolt" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Tools"
        component={ColorToolsPage}
        initialParams={{ navigationFromTab: true }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="brush" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomePage}
        initialParams={{ navigationFromTab: true }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Lesson"
        component={LessonPage}
        initialParams={{ navigationFromTab: true }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="book" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Social"
        component={ForumPage}
        initialParams={{ navigationFromTab: true }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="forum" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
