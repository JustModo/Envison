import React, { useEffect, useRef, useState } from "react";
import { style } from "../styles";
import { SafeAreaView, View, Picker, StyleSheet } from "react-native";
import { useTabBar } from "../../../navigation/TabBarContext";
import { Canvas, useFrame } from "@react-three/fiber/native";
import MyDropdown from "../components/DropDown";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Box from "../3DComponents/Box";
import Sphere from "../3DComponents/Sphere";
import Cone from "../3DComponents/Cone";
import ColorPalette from "../components/ColorPalette";

export default function ThreeDScreen(props) {
  const { updateTabBarStyle } = useTabBar();
  useEffect(() => {
    updateTabBarStyle({ display: "none" });
  }, []);

  const meshRef = useRef();
  const [autoRotate, setAutoRotate] = useState(false);

  const onGestureEvent = ({ nativeEvent }) => {
    if (meshRef.current && nativeEvent.state === State.ACTIVE) {
      setAutoRotate(false);
      const rotationFactor = 0.001;
      meshRef.current.rotation.x += nativeEvent.translationY * rotationFactor;
      meshRef.current.rotation.y += nativeEvent.translationX * rotationFactor;
    } else if (nativeEvent.state === State.END) {
      setAutoRotate(true);
    }
  };

  const [selectedValue, setSelectedValue] = useState("cube");

  const updateParent = (newValue) => {
    if (newValue == "") return;
    setSelectedValue(newValue);
  };

  const [objColor, setObjColor] = useState();

  const updateParentState = (newValue) => {
    if (newValue === null || newValue === "") return;
    setObjColor(newValue);
  };

  return (
    <SafeAreaView style={[style.screen]}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        minPointers={1}
        maxPointers={1}
      >
        <View style={[style.container]}>
          <MyDropdown updateParent={updateParent} />
          <Canvas>
            <ambientLight intensity={0.8} />
            <directionalLight
              castShadow
              position={[5, 10, 7]}
              shadow-mapSize={[1024, 1024]}
            >
              <orthographicCamera
                attach="shadow-camera"
                args={[-10, 10, 10, -10]}
              />
            </directionalLight>
            {(() => {
              switch (selectedValue) {
                case "cube":
                  return (
                    <Box
                      position={[0, 0, 0]}
                      cubeRef={meshRef}
                      autoRotate={autoRotate}
                      color={objColor}
                    />
                  );
                case "sphere":
                  return (
                    <Sphere
                      position={[0, 0, 0]}
                      sphereRef={meshRef}
                      autoRotate={autoRotate}
                      color={objColor}
                    />
                  );
                case "cone":
                  return (
                    <Cone
                      position={[0, 0, 0]}
                      coneRef={meshRef}
                      autoRotate={autoRotate}
                      color={objColor}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </Canvas>
        </View>
      </PanGestureHandler>
      <View style={{ alignSelf: "flex-end", margin: 20 }}>
        <ColorPalette
          initialBoxesPerRow={15}
          updateParentState={updateParentState}
        />
      </View>
    </SafeAreaView>
  );
}
