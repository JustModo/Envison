import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostTile from "../components/PostTile";

export default function PostScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (!isFocused) {
        return;
      }
      e.preventDefault();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, isFocused]);

  const [dispUsername, setDispUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const name = await AsyncStorage.getItem("ONLINEUSERNAME");
        setDispUsername(name);
      } catch (error) {
        console.error("Error fetching username:", error.message);
      }
    };

    fetchUsername();
  }, []);

  return (
    <SafeAreaView style={style.screen}>
      <View style={[style.container, { paddingLeft: 0, paddingRight: 0 }]}>
        <View style={style1.con1}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            Posts
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
            }}
          >
            <View style={{ maxWidth: 80 }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={style1.c1ut}>
                {dispUsername}
              </Text>
            </View>
            <View style={style1.c1dp}></View>
          </View>
        </View>
        <ScrollView style={style1.con2}>
          <PostTile />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style1 = StyleSheet.create({
  con1: {
    flex: 1,
    maxHeight: 60,
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  c1ut: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  c1dp: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  con2: {
    flex: 1,
    backgroundColor: "pink",
  },
});
