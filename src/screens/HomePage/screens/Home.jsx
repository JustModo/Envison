import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Image, StatusBar } from "react-native";
import { style } from "../styles";
import UserCard from "../../../components/UserCard";
import { useTabBar } from "../../../navigation/TabBarContext";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home() {
  const { updateTabBarStyle } = useTabBar();
  useFocusEffect(
    React.useCallback(() => {
      updateTabBarStyle({ display: "flex" });
      getName()
    }, [])
  );
  async function getName() {
    const text = await AsyncStorage.getItem("USERNAME");
    setName(text)
  }
  const [name, setName] = useState();

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={style.container}>
        <UserCard name={name} />
        <View style={style.notifcontainer}></View>
      </SafeAreaView>
    </>
  );
}

export default Home;
