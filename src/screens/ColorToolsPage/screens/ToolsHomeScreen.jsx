import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, View, ScrollView, Text } from "react-native";
import { style } from "../styles";
import Card from "../components/Card";
import ColorPalette from "../components/ColorPalette";
import { useNavigation } from "@react-navigation/native";
import { useTabBar } from "../../../navigation/TabBarContext";
import { useFocusEffect } from '@react-navigation/native';

export default function ToolsHomeScreen(props) {
  const navigation = useNavigation();
  const { updateTabBarStyle } = useTabBar();

  useFocusEffect(
    React.useCallback(() => {
      updateTabBarStyle({ display: 'flex' });
    }, [])
  );

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={style.screen}>
        <ScrollView
          style={style.container}
          contentContainerStyle={{
            alignItems: "center",
            rowGap: 10,
            paddingBottom: 50,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 40,
              marginBottom: 30,
            }}
          >
            Tools
          </Text>
          <Card
            icon={"palette"}
            name={"Palette"}
            onPress={() => navigation.navigate("Palette")}
          />
          <Card
            icon={"search"}
            name={"Picker"}
            onPress={() => navigation.navigate("PickChoice")}
          />
          <Card
            icon={"brush"}
            name={"Editor"}
            onPress={() => navigation.navigate("ToolsHome")}
          />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 40,
              marginBottom: 30,
              marginTop: 30,
            }}
          >
            References
          </Text>
          <Card icon={"lightbulb"} name={"Light"} />
          <Card icon={"format-paint"} name={"Color"} />
        </ScrollView>
        <View style={{ alignSelf: "flex-end", marginBottom: 70, margin: 20 }}>
          <ColorPalette initialBoxesPerRow={15}  />
        </View>
      </SafeAreaView>
    </>
  );
}
