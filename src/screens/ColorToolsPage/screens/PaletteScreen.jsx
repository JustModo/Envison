import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./styles";
import { useEffect, useRef, useState } from "react";
import { useTabBar } from "../../../navigation/TabBarContext";
import React from "react";
import ColorPalette from "../components/ColorPalette";

export default function PaletteScreen() {
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const [dispCol, setDispCol] = useState("transparent");
  const [colors, setColors] = useState({});

  const updateParentState = (newValue) => {
    setDispCol(newValue);
  };

  useEffect(() => {
    setColors(hexToRgb(dispCol, rgbToPrimaryColors));
  }, [dispCol]);

  useEffect(() => {
    console.log(colors);
  }, [colors]);

  function hexToRgb(hex, callback) {
    if (!hex) return;
    hex = hex.replace("#", "");
    // console.log(hex);

    const bigint = parseInt(hex, 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return callback({ r, g, b });
  }

  function rgbToPrimaryColors(rgb) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const totalIntensity = r + g + b;
    console.log(totalIntensity);
    const redAmount = (r / totalIntensity) * 100;
    const blueAmount = (b / totalIntensity) * 100;
    const yellowAmount = ((r + g) / totalIntensity) * 100;

    return {
      redAmount,
      blueAmount,
      yellowAmount,
    };
  }

  // function hexToClosestColor(hexValue) {
  //   if (!hexValue) return;
  //   const closestColorKey = Object.keys(colorNames).reduce(
  //     (closest, current) => {
  //       const closestDiff = Math.abs(
  //         parseInt(hexValue.slice(1), 16) - parseInt(closest.slice(1), 16)
  //       );
  //       const currentDiff = Math.abs(
  //         parseInt(hexValue.slice(1), 16) - parseInt(current.slice(1), 16)
  //       );
  //       return currentDiff < closestDiff ? current : closest;
  //     }
  //   );

  //   return colorNames[closestColorKey];
  // }

  return (
    <SafeAreaView style={style.screen}>
      <View style={[style.container, { rowGap: 20 }]}>
        <View style={styles3.colordd}>
          <View style={[styles3.colorsqr, { backgroundColor: dispCol }]} />
          <Text style={styles3.colorddt}>
            {dispCol === "transparent" ? "Choose" : dispCol}
          </Text>
        </View>
        <ColorPalette
          initialBoxesPerRow={10}
          updateParentState={updateParentState}
        />
        <View style={styles3.instructdiv}>
          <Text style={[styles3.heading, { fontSize: 35, marginBottom: 10 }]}>
            Instructions
          </Text>
          <Text style={styles3.heading}>Step 1:</Text>
          <Text style={styles3.instructText}>
            eofneosignioewsaghpehagosrnogkhrehjgdokreopkge
          </Text>
          <Text style={styles3.heading}>Step 2:</Text>
          <Text style={styles3.instructText}>
            eofneosignioewsaghpehagosrnogkhrehjgdokreopkge
          </Text>
          <Text style={styles3.heading}>Step 3:</Text>
          <Text style={styles3.instructText}>
            eofneosignioewsaghpehagosrnogkhrehjgdokreopkge
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles3 = StyleSheet.create({
  instructdiv: {
    flex: 1,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 15,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  heading: {
    textAlign: "left",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  instructText: {
    textAlign: "left",
    color: "white",
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 10,
    fontWeight: "bold",
  },
  colordd: {
    flex: 0,
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  colorsqr: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  colorddt: {
    color: "white",
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "bold",
    top: -20,
  },
});
