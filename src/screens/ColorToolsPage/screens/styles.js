import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    rowGap: 10,
  },
  container: {
    width: "90%",
    flex: 1,
    backgroundColor: "#181818",
    flexDirection: "column",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    paddingTop: 60,
  },

  tab: {
    display: "block",
    backgroundColor: "#10161c",
    borderRadius: 10,
    borderWidth: 0,
    borderTopWidth: 0,
    borderColor: "#4C5866",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    padding: 10,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  canvas: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#10161c",
  },
});
