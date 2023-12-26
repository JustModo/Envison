import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../styles";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostTile from "../components/PostTile";
import { getPosts } from "../api";
import SquareButton from "../components/SquareButton";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTabBar } from "../../../navigation/TabBarContext";

export default function PostScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const { updateTabBarStyle } = useTabBar();
  useFocusEffect(
    React.useCallback(() => {
      updateTabBarStyle({ display: "flex" });
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const res = await getPosts();
      setPostData([]);
      setPostData(res.data || []);
      setIsEnd(false);

      console.log("Refreshed!");
    } catch (error) {
      console.error("Error refreshing data:", error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation, isFocused]);

  const [dispUsername, setDispUsername] = useState("");

  useEffect(() => {
    const fetchPostsReq = async () => {
      try {
        const res = await getPosts();
        setPostData(res.data || []);
        const name = await AsyncStorage.getItem("ONLINEUSERNAME");
        setDispUsername(name);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching username:", error.message);
      }
    };
    fetchPostsReq();
  }, []);

  async function handleOldPosts() {
    try {
      let index = postData[postData.length - 1];
      const res = await getPosts(index.PostID);
      // console.log(index.PostID);
      // console.log(res);
      if (res.data == "") {
        console.log("Blank");
        setIsEnd(true);
      } else {
        setPostData(res.data || []);
        // console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLogout() {
    BackHandler.removeEventListener("hardwareBackPress", false);
    await AsyncStorage.removeItem("ONLINEUSERNAME");
    await AsyncStorage.removeItem("TOKEN");
    navigation.navigate("Error");
  }
  async function handleAddPost() {
    BackHandler.removeEventListener("hardwareBackPress", false);
    navigation.navigate("AddPost");
  }

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
              gap: 10,
            }}
          >
            <View style={{ maxWidth: 80 }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={style1.c1ut}>
                {dispUsername}
              </Text>
            </View>
            <TouchableOpacity onPress={async () => handleLogout()}>
              <View style={style1.c1dp}>
                <MaterialIcons name={"logout"} size={25} color={"black"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={style1.con2}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#000000"]} // Customize the loading spinner color
            />
          }
        >
          {postData.map((post) => (
            <PostTile
              key={post.PostID}
              id={post.PostID}
              title={post.PostName}
              content={post.PostData}
              image={post.PostImage}
              user={post.UserName}
              comments={post.PostComments}
              likes={post.PostLikes}
            />
          ))}
          <View style={{ alignItems: "center" }}>
            {isEnd ? (
              <Text style={style1.c1ut}>All Posts Viewed</Text>
            ) : (
              <SquareButton
                width={100}
                icon={"arrow-down"}
                onPress={handleOldPosts}
              />
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={style1.logout}
          onPress={async () => handleAddPost()}
        >
          <View>
            <MaterialIcons name={"plus"} size={45} color={"black"} />
          </View>
        </TouchableOpacity>
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
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  con2: {
    flex: 1,
    flexDirection: "column",
  },
  logout: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
});
