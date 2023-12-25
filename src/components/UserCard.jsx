import { StyleSheet, View, Text, Image } from "react-native";
// const logo = require('../../assets/placeholder.jpg')

export default function UserCard({ name, font }) {
  function genRN() {
    const randomNumber = Math.floor(Math.random() * 7) + 1;
    return `PROFILE${randomNumber}`;
  }

  const logo = genRN();

  const imageMap = {
    PROFILE1: require("../../assets/pfp/PROFILE1.png"),
    PROFILE2: require("../../assets/pfp/PROFILE2.png"),
    PROFILE3: require("../../assets/pfp/PROFILE3.png"),
    PROFILE4: require("../../assets/pfp/PROFILE4.png"),
    PROFILE5: require("../../assets/pfp/PROFILE5.png"),
    PROFILE6: require("../../assets/pfp/PROFILE6.png"),
    PROFILE7: require("../../assets/pfp/PROFILE7.png"),
  };

  return (
    <View style={style.container}>
      <Image source={imageMap[logo]} style={style.image}></Image>
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <Text style={[style.text, { fontSize: 25 }]}>{name}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "transparent",
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  text: {
    color: "#ffffff",
    paddingStart: 30,
    fontWeight: "bold",
  },
});
