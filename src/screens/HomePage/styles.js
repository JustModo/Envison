import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    rowGap: 10,
    paddingTop: 10,
  },
  image: {
    position: "absolute",
    display: "flex",
    width: 320,
    height: 100,
    resizeMode: "cover",
    top: 10,
    borderRadius: 30,
  },
  notifcontainer: {
    width: "90%",
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    marginBottom: 70,
  },
});
