import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import SquareButton from "./SquareButton";
import { fetchImage, toggleLike } from "../api";

export default function PostTile(props) {
  const [authName, setAuthName] = useState(props.user);
  const [postName, setPostName] = useState(props.title);
  const [postContent, setPostContent] = useState(props.content);
  const [postComments, setPostComments] = useState(props.postComments);
  const [postID, setPostID] = useState(props.id);
  const [imagePath, setImagePath] = useState(props.image);
  const [noliked, setNoLiked] = useState(props.likes.Likes);
  const [liked, setLiked] = useState(props.likes.IsLiked);
  const [imageData, setImageData] = useState(null);

  const handleLike = async () => {
    if (liked == false) {
      setNoLiked(noliked + 1);
    } else {
      setNoLiked(noliked - 1);
    }
    setLiked(!liked);
    const res = await toggleLike(postID);
    console.log(res);
  };
  function handleComment() {
    console.log("Comment");
  }

  useEffect(() => {
    async function handleFetchImage() {
      setImageData(fetchImage(imagePath));
      // console.log(imageData);
    }
    handleFetchImage();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={[style.text, { fontSize: 24 }]}>{authName}</Text>
      </View>
      <View style={style.content}>
        <View style={style.image}>
          {imageData && (
            <Image
              style={{ flex: 1 }}
              source={{ uri: imageData }}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
      <View style={style.footer}>
        <Text style={[style.text, { fontSize: 20 }]}>{postName}</Text>
        <Text style={[style.text, { fontSize: 16, fontWeight: "normal" }]}>
          {postContent}
        </Text>
      </View>
      <View style={style.panel}>
        <View style={{ justifyContent: "center" }}>
          <SquareButton
            width={40}
            icon={"heart"}
            color={liked ? "red" : "white"}
            onPress={handleLike}
          />
          <Text
            style={[
              style.text,
              {
                fontSize: 15,
                position: "absolute",
                right: 50,
                alignSelf: "center",
                color: "white",
              },
            ]}
          >
            {noliked}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <SquareButton width={40} icon={"comment"} onPress={handleComment} />
        </View>
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
    minHeight: 400,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    borderBottomWidth: 2,
    borderColor: "#ffffff",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: "#ffffff",
    minHeight: 250,
  },
  footer: {
    flex: 1,
    margin: 10,
  },
  panel: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    // marginBottom: 10,
    // marginTop: 10,
    padding: 5,
    borderTopWidth: 2,
    borderColor: "#ffffff",
  },
});
