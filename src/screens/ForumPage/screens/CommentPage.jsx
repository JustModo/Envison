import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTabBar } from "../../../navigation/TabBarContext";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { addComment, getComment } from "../api";
import CommentTile from "../components/CommentTile";
import { TextInput } from "react-native-gesture-handler";
import SquareButton from "../components/SquareButton";

export default function CommentPage() {
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
    return () => {
      setComments(null);
    };
  }, []);
  const route = useRoute();
  const { postID } = route.params || {};

  const [comments, setComments] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      handleComments();
    }, [])
  );

  async function handleComments() {
    const res = await getComment(postID);
    setComments(null);
    setComments(res);
  }

  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  function handleContentChange(text) {
    setContent(text);
  }

  async function handleCommentClick() {
    if (!isDisabled) {
      if (content == "") {
        alert("Can't be Blank!");
      } else {
        setIsDisabled(true);
        const res = await addComment(postID, content.trim());
        if (res) {
          setContent("");
          await handleComments();
          setIsDisabled(false);
        } else {
          setIsDisabled(false);
        }
      }
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await handleComments();
      console.log("Refreshed!");
    } catch (error) {
      console.error("Error refreshing data:", error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.container}>
        <ScrollView
          style={[style.con1]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#000000"]}
            />
          }
        >
          {comments &&
            comments
              .slice()
              .reverse()
              .map((data, index) => (
                <CommentTile
                  key={index}
                  username={data.username}
                  comment={data.comment}
                />
              ))}
        </ScrollView>
        <View
          style={{
            height: 70,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <TextInput
            style={[
              style.textinput,
              {
                fontSize: 15,
                padding: 20,
                flex: 1,
                maxHeight: 300,
                borderRadius: 10,
              },
            ]}
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={handleContentChange}
            placeholder="Description"
            placeholderTextColor={"rgb(177, 186, 196)"}
          />
          <SquareButton
            width={40}
            icon={isDisabled ? "clock" : "commenting"}
            color={isDisabled ? "grey" : "white"}
            height={40}
            onPress={handleCommentClick}
          />
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
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    gap: 20,
  },
  con1: {
    marginTop: 40,
    borderWidth: 2,
    borderColor: "#ffffff",
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    padding: 10,
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
});
