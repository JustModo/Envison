import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTabBar } from "../../../navigation/TabBarContext";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import SquareButton from "../components/SquareButton";
import { uploadImage } from "../api";
import { useNavigation } from "@react-navigation/native";

export default function AddPostPage() {
  const navigation = useNavigation();

  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const [title, setTitle] = useState("");

  const handleTextChange = (newText) => {
    setTitle(newText);
  };

  const [content, setContent] = useState("");

  const handleContentChange = (newText) => {
    setContent(newText);
  };

  const [imageUri, setImageUri] = useState(null);
  const [imageData, setImageData] = useState(null);

  const permisionFunction = async () => {
    const imagePermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (imagePermission.status !== "granted") {
      alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

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
      setImageData(formData);
      //   console.log(formData);
    }
  };

  async function handlePostClick() {
    if (!title || !content || !imageData) {
      alert("Can't Leave Fields Blank!");
      return;
    }
    const res = await uploadImage(imageData, { title, content });
    if (res) {
      alert(res);
      navigation.navigate("Post");
    }
  }

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <View
          style={{
            flex: 1,
            maxHeight: 300,
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderColor: "#ffffff",
            marginTop: 60,
            justifyContent: "center",
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
        <View
          style={{ flex: 1, flexDirection: "column", gap: 15, paddingTop: 10 }}
        >
          <TextInput
            style={[
              style.textinput,
              { fontSize: 20, padding: 5, marginLeft: 10, marginRight: 10 },
            ]}
            placeholder="Title"
            placeholderTextColor={"rgb(177, 186, 196)"}
            value={content}
            onChangeText={handleContentChange}
          />
          <TextInput
            style={[
              style.textinput,
              {
                fontSize: 20,
                padding: 20,
                marginLeft: 10,
                marginRight: 10,
                flex: 1,
                maxHeight: 300,
              },
            ]}
            multiline
            textAlignVertical="top"
            value={title}
            onChangeText={handleTextChange}
            placeholder="Description"
            placeholderTextColor={"rgb(177, 186, 196)"}
          />
        </View>
        <View
          style={{
            height: 50,
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => handlePostClick()}>
            <View style={style.btnview}>
              <MaterialIcons name={"send"} size={30} color={"white"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    rowGap: 10,
  },
  container: {
    width: "90%",
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    paddingBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    // marginBottom: 70,
  },
  textinput: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#ffffff",
    color: "white",
    fontWeight: "bold",
  },
  btnview: {
    padding: 5,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
    marginTop: 5,
  },
});
