import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SquareTab(props) {
  const nav = useNavigation();
  const [index, setIndex] = useState(props.index);
  const [isDisabled, setIsDisabled] = useState(true);
  function handleClick() {
    nav.navigate("LessonDisplay");
  }
  useEffect(() => {
    if (props.index === 1) {
      setIsDisabled(false);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        height: 65,
        width: 65,
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 20,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      disabled={isDisabled}
      onPress={handleClick}
    >
      {isDisabled == false ? (
        <Text style={[style1.text, { fontSize: 25 }]}>{index}</Text>
      ) : (
        <MaterialIcons name={"lock"} color={"white"} size={30} />
      )}
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
