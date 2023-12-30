import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
} from "react-native";
import { style } from "../styles";
import UserCard from "../../../components/UserCard";
import { useTabBar } from "../../../navigation/TabBarContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Home() {
  const nav = useNavigation();

  const { updateTabBarStyle } = useTabBar();
  useFocusEffect(
    React.useCallback(() => {
      updateTabBarStyle({ display: "flex" });
      getName();
    }, [])
  );
  async function getName() {
    const text = await AsyncStorage.getItem("USERNAME");
    setName(text);
  }
  const [name, setName] = useState();

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={style.container}>
        <UserCard name={name} />
        <View style={style.notifcontainer}>
          <ScrollView
            contentContainerStyle={{ gap: 10, flexDirection: "column" }}
          >
            <Text
              style={[
                style1.heading,
                { fontSize: 30, textAlign: "center", marginTop: 10 },
              ]}
            >
              Welcome
            </Text>
            <TouchableOpacity style={style1.touchOp} disabled={true}>
              <MaterialIcons
                name={"account-settings"}
                color={"white"}
                size={40}
              />
              <View style={{ flex: 1 }}>
                <Text style={[style1.heading, { marginLeft: 10 }]}>
                  Welcome to Envision!
                </Text>
                <Text style={[style1.text, { marginLeft: 10 }]}>
                  Embark on a journey of boundless creativity with Envision,
                  your canvas for artistic expression. Happy Learning!
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={[
                style1.heading,
                { fontSize: 30, textAlign: "center", marginTop: 10 },
              ]}
            >
              Notifications
            </Text>
            <TouchableOpacity
              style={style1.touchOp}
              onPress={() => {
                nav.navigate("Discover");
              }}
            >
              <MaterialIcons name={"check"} color={"white"} size={40} />
              <Text style={[style1.heading, { marginLeft: 10 }]}>
                Do Your Daily Lesson!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style1.touchOp}
              onPress={() => {
                nav.navigate("Social");
              }}
            >
              <MaterialIcons name={"post"} color={"white"} size={40} />
              <Text style={[style1.heading, { marginLeft: 10 }]}>
                Check Out These Posts!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style1.touchOp}
              onPress={() => {
                nav.navigate("Tools");
              }}
            >
              <MaterialIcons name={"brush"} color={"white"} size={40} />
              <Text style={[style1.heading, { marginLeft: 10 }]}>
                Try out our 3D Tools!
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const style1 = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "white",
    flexWrap: "wrap",
    textAlign: "justify",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  touchOp: {
    minHeight: 70,
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
    padding: 10,
  },
});

export default Home;
