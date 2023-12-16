import React from "react";
import { View, SafeAreaView, Text, Image, StatusBar } from "react-native";
import { style } from "./styles";
import UserCard from "../../components/UserCard";

function HomePage(props) {
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={style.container}>
        <UserCard name="John" />
        <View style={style.notifcontainer}></View>
      </SafeAreaView>
    </>
  );
}
export default HomePage;
