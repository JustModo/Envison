import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import SquareButton from "../ForumPage/components/SquareButton";

function DiscoverPage(props) {
  const nav = useNavigation();

  const artChallengeNames = [
    "Doodle your favorite animal using only simple shapes.",
    "Create a self-portrait using only primary colors.",
    "Draw a landscape with a rainbow using just five different colors.",
    "Sketch a cup of coffee or tea on your desk.",
    "Illustrate your favorite book cover in a single image.",
    "Design a simple logo for your imaginary company.",
    "Draw a smiling sun and fluffy clouds in a blue sky.",
    "Create a pattern using only circles and squares.",
    "Sketch your dream vacation destination.",
    "Draw a funny monster with as many eyes as you can imagine.",
    "Illustrate your favorite season with symbols.",
    "Doodle a magical potion and label its ingredients.",
    "Design a cute alien character from another planet.",
    "Draw a tree with unique leaves and branches.",
    "Illustrate a tasty ice cream cone with your favorite flavors.",
    "Sketch a simple house with a friendly door and windows.",
    "Create a minimalist drawing of a bicycle.",
    "Illustrate a superhero version of yourself.",
    "Draw a smiling flower with colorful petals.",
    "Doodle your favorite snack or treat.",
  ];

  const formatTime = (time) => {
    const minutes = Math.floor(time / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    return { hours, minutes: minutes % 60 };
  };

  const [currentChallenge, setcurrentChallenge] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const permisionFunction = async () => {
    const imagePermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (imagePermission.status !== "granted") {
      alert("Permission for media access needed.");
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64String = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const uri = `data:image/${result.type};base64,${base64String}`;
      const formData = new FormData();
      formData.append("image", {
        uri: result.uri,
        type: `image/${result.type}`,
        name: "image.jpg",
      });
      setImageUri(uri);
      await AsyncStorage.setItem("PICTURE", uri);
    }
  };

  const getRandomChallenge = () => {
    const randomIndex = Math.floor(Math.random() * artChallengeNames.length);
    return artChallengeNames[randomIndex];
  };

  const updateAtMidnight = async () => {
    console.log("Component updated at midnight!");
    const data = getRandomChallenge();
    await AsyncStorage.setItem("CHALLENGE", data);
    await AsyncStorage.removeItem("PICTURE");
    setImageUri(null);
    setcurrentChallenge(data);
    scheduleNextUpdate();
  };

  const scheduleNextUpdate = async () => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // Next day
      0,
      0,
      0,
      0
    );

    await AsyncStorage.setItem(
      "nextUpdateTimestamp",
      midnight.getTime().toString()
    );
    updateRemainingTime();
  };

  const updateRemainingTime = async () => {
    const nextUpdateTimestamp = await AsyncStorage.getItem(
      "nextUpdateTimestamp"
    );
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0
    );
    const nextMidnightTimestamp = midnight.getTime();
    const currentTimestamp = now.getTime();
    const timeDifference = nextMidnightTimestamp - currentTimestamp;

    if (timeDifference > 24 * 60 * 60 * 1000) {
      const currentMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );
      await AsyncStorage.setItem(
        "nextUpdateTimestamp",
        currentMidnight.getTime().toString()
      );
      setTimeRemaining(currentMidnight.getTime().toString());
    }

    if (nextUpdateTimestamp) {
      const remainingTime =
        parseInt(nextUpdateTimestamp, 10) - new Date().getTime();
      setTimeRemaining(remainingTime);
      if (remainingTime <= 0) {
        await updateAtMidnight();
      }
    }
  };

  const startTimer = async () => {
    await scheduleNextUpdate();
    const timerId = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timerId);
  };

  useEffect(() => {
    const setItem = async () => {
      const item = await AsyncStorage.getItem("CHALLENGE");
      const pic = await AsyncStorage.getItem("PICTURE");
      setcurrentChallenge(item);
      setImageUri(pic);
    };
    setItem();
  }, []);

  const startup = async () => {
    const item = await AsyncStorage.getItem("CHALLENGE");
    if (!item) {
      const ran = getRandomChallenge();
      setcurrentChallenge(ran);
      await AsyncStorage.setItem("CHALLENGE", ran);
    }
  };

  useEffect(() => {
    permisionFunction();
    startup();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      startTimer();
    }, [])
  );

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <Text style={[style1.text, { fontSize: 40, alignSelf: "center" }]}>
          Discover
        </Text>
        <ScrollView
          contentContainerStyle={{ flexDirection: "column", gap: 10 }}
        >
          <View
            style={{
              minHeight: 130,
              borderWidth: 2,
              borderColor: "#ffffff",
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              marginTop: 40,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <View style={{ position: "absolute", bottom: 15, right: 15 }}>
              {timeRemaining !== null ? (
                <Text style={[style1.text, { fontSize: 15 }]}>
                  {formatTime(timeRemaining).hours} h{" "}
                  {formatTime(timeRemaining).minutes} m
                </Text>
              ) : (
                <Text>Loading...</Text>
              )}
            </View>
            <Text style={[style1.text, { fontSize: 18 }]}>
              {currentChallenge}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 300,
              borderWidth: 2,
              borderColor: "#ffffff",
              marginTop: 10,
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={{ flex: 1 }}
                resizeMode="contain"
              />
            )}
            {!imageUri && (
              <View style={{ alignSelf: "center" }}>
                <SquareButton
                  icon={"camera"}
                  width={50}
                  height={50}
                  onPress={handleImagePicker}
                  size={25}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[style1.touchOp, { alignSelf: "center" }]}
            onPress={() => {
              nav.navigate("Social");
            }}
          >
            <MaterialIcons name={"post"} color={"white"} size={35} />
            <Text style={[style1.heading]}>You Can Share your Post!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style1 = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  touchOp: {
    minHeight: 70,
    width: "100%",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#ffffff",
    padding: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default DiscoverPage;
