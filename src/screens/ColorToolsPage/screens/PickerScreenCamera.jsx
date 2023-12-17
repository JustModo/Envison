import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { View, Text, StyleSheet, Button, Image, requireNativeComponent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./styles";
import { useTabBar } from "../../../navigation/TabBarContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImageManipulator from "expo-image-manipulator";
import { decode } from "base-64";


export default function PickerScreen() {
  const navigation = useNavigation();

  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const handlePress = (color) => {
    // console.log(color)
    // addColor(color);
    navigation.navigate("PickChoice");
  };

  const addColor = async (value) => {
    const arr = await AsyncStorage.getItem("SavedColor");
    const colorArray = JSON.parse(arr);
    let temp = colorArray.slice();
    temp.unshift(value);
    const maxLength = 18;
    if (temp.length > maxLength) {
      temp = temp.slice(0, maxLength);
    }
    while (temp.length < 18) {
      temp.push("transparent");
    }
    await AsyncStorage.setItem("SavedColor", JSON.stringify(temp));
    // console.log(`Saved ${temp} in Async`)
    navigation.navigate("PickChoice", { passcolor: value });
  };

  //-----------------------------------------------------------------------

  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  //---------------------------------------------------

  const cameraRef = useRef(null);

  const [imageURI, setImageURI] = useState(null);

  const takePicture = async () => {
    try {
      if (cameraRef) {
        const options = { quality: 0.1, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const manimg = await ImageManipulator.manipulateAsync(
          data.uri,
          [
            {
              crop: {
                originX: data.width / 2,
                originY: data.height / 2,
                width: 1,
                height: 1,
              },
            },
          ],
          { compress: 1, format: "jpeg", base64: true }
        );
        console.log(manimg.base64);
        console.log(manimg.uri);
        console.log(manimg.width, manimg.height);
        setImageURI(manimg.uri);
        const arr = base64ToUint8Array(manimg.base64);
        console.log(arr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function base64ToUint8Array(base64) {
    const binaryString = decode(base64);
    const uint8Array = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return uint8Array;
  }


  //---------------------------------------

  const [hexcolor, setHexcolor] = useState(null);

  function getRandomColor() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setHexcolor(randomColor);
  }

  //---------------------------------------

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <Camera ref={cameraRef} style={styles.camera} type={type} ratio={"1:1"}>
          <View style={styles.overlay}>
            <View style={styles.box} />
          </View>
        </Camera>
        <Button onPress={takePicture} title="Pick Color" />
        <Button onPress={() => handlePress(hexcolor)} width={50} title="Save" />
        <View
          style={{
            backgroundColor: hexcolor,
            height: 50,
            width: 50,
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 30,
          }}
        />
        {imageURI ? (
          <Image
            source={{ uri: imageURI }}
            style={{ width: 100, height: 100 }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  camera: {
    height: "50%",
    maxHeight: "70%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 20, // Adjust the width of the box as needed
    height: 20, // Adjust the height of the box as needed
    borderWidth: 2,
    borderColor: "white", // Adjust the border color as needed
    backgroundColor: "rgba(0,0,0,0.5)", // Adjust the background color and opacity as needed
    borderRadius: 100,
  },
});
