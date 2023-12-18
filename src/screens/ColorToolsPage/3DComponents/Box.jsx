import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber/native";

function Box(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (props.autoRotate && meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={(mesh) => {
        props.cubeRef.current = mesh; 
        meshRef.current = mesh;
      }}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color={hovered ? "hotpink" :  props.color || "orange"}
        roughness={0.7}
        metalness={0.5}
      />
    </mesh>
  );
}

export default Box;
