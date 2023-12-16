import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Dimensions, Button } from "react-native";

const ColorPalette = ({ initialBoxesPerRow}) => {
  const [colorArray, setcolorArray] = useState([]);
  const [boxesPerRow, setBoxesPerRow] = useState(initialBoxesPerRow);
  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 24;
  const boxWidth = (screenWidth - containerPadding) / boxesPerRow;

  const addColor = (value) => {
    let temp = colorArray.slice();
    temp.unshift(value);
    const maxLength = 18;
    if (temp.length > maxLength) {
      temp = temp.slice(0, maxLength);
    }
    while (temp.length < 18) {
      temp.push('transparent');
    }
    setcolorArray(temp);
    setSavedColor(temp);
  };

  const [savedColor, setSavedColor] = useState([]);

  const loadColor = async () => {
    try {
      const storedPreferences = await AsyncStorage.getItem("SavedColor");
      if (storedPreferences) {
        const parsedColors = JSON.parse(storedPreferences);
        setSavedColor(parsedColors);
        setcolorArray(parsedColors);
        // console.log(`Set color 1 to ${JSON.stringify(parsedColors)}`);
      }
    } catch (error) {
      console.error("Error loading colors:", error);
    }
  };

  // useEffect(() => {
  //   loadColor();
  // }, []); // Run once on mount

  useFocusEffect(
    React.useCallback(() => {
      loadColor();
      // console.log('loaded')
    }, [])
  );


  useEffect(() => {
    const savePreferences = async () => {
      try {
        await AsyncStorage.setItem("SavedColor", JSON.stringify(savedColor));
        // console.log(`Saved/Loaded Color ${JSON.stringify(savedColor)}`);
      } catch (error) {
        console.error("Error saving preferences:", error);
      }
    };

    savePreferences();
  }, [savedColor]);


  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("AsyncStorage cleared successfully.");
  //   } catch (error) {
  //     console.error("Error clearing AsyncStorage:", error);
  //   }
  // };

  // clearAsyncStorage()

  return (
    <View style={styles.containerm}>
      <View style={styles.container}>
        {colorArray.length > 0 &&
          colorArray.map((color, index) => (
            <View
              key={index}
              style={[
                styles.colorBox,
                { backgroundColor: color, width: boxWidth, height: boxWidth },
              ]}
            />
          ))}
      </View>
      {/* <Button title="Press" onPress={()=> addColor('#ffff00') }></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  colorBox: {
    width: 25,
    height: 25,
    margin: 5,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 0.5,
  },
  containerm: {
    flexDirection: "column",
    gap: 10,
  },
});

export default ColorPalette;
