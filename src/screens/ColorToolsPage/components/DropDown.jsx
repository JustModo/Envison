import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const MyDropdown = ({updateParent}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  useEffect(() => {
    updateParent(selectedValue)
  }, [selectedValue])
  

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        borderColor: "white",
        borderWidth: 2,
        padding: 30,
        borderRadius: 10,
        marginTop: 35,
      }}
    >
      <Text style={{ color: "white", fontSize: 20, fontWeight:'bold' }}>Select a Shape:</Text>
      <Picker
        selectedValue={selectedValue}
        style={{
          height: 10,
          width: 150,
          backgroundColor: "black",
          color:'white',
        }}
        onValueChange={handleValueChange}
      >
        <Picker.Item label="Cube" value="cube" />
        <Picker.Item label="Sphere" value="sphere" />
        <Picker.Item label="Cone" value="cone" />
      </Picker>
    </View>
  );
};

export default MyDropdown;
