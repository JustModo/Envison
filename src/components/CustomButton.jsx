import { View, Text, TouchableOpacity, Image } from "react-native";

export default function CustomButton({
  content,
  width,
  bgcolor,
  color,
  cusstyle,
}) {
  return (
    <View
      style={{
        backgroundColor: bgcolor ? bgcolor : "#3640d2",
        padding: 5,
        borderRadius: 10,
        width,
        cusstyle,
      }}
    >
      <TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: color ? color : "white",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {content}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
