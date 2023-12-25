import React from "react";
import { View, StyleSheet } from "react-native";

export default function PostTile(props) {
  return <View style={style.container}></View>;
}

const style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#ffffff",
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    height: 300,
  },
});
