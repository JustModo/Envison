import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CommentTile(props) {
  const [username, setUsername] = useState(props.username || "");
  const [comment, setComment] = useState(props.comment || "");
  return (
    <View style={style.container}>
      <View>
        <Text style={[style.text, { fontSize: 18 }]}>{username}</Text>
      </View>
      <View>
        <Text
          style={[
            style.text,
            { fontSize: 16, fontWeight: "normal", marginLeft: 5 },
          ]}
        >
          {comment}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#ffffff",
    width: "100%",
    minHeight: 70,
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 15,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
