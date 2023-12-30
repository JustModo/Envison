import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function VTab(props) {
  const nav = useNavigation();
  const [icon, setIcon] = useState(props.icon);
  const [name, setName] = useState(props.name);
  const [index, setIndex] = useState(props.index);
  function handleClick() {
    nav.navigate("Chapters");
  }
  return (
    <TouchableOpacity
      style={{
        height: 70,
        width: "100%",
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 20,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      disabled={props.icon ? false : true}
      onPress={handleClick}
    >
      <View
        style={{
          height: 45,
          width: 45,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[style1.text, { fontSize: 25 }]}>{index + 1}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            style1.text,
            { marginLeft: 8, fontSize: 15, textAlign: "left" },
          ]}
        >
          {name}
        </Text>
      </View>
      <View style={{ marginRight: 5 }}>
        <MaterialIcons
          name={icon ? icon : "book-lock"}
          color={"white"}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
}

const style1 = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
