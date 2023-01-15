import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures.js";
import { useState } from "react";
import { useStore } from "../hooks/useStore.js";

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [removeCube] = useStore((state) => [state.removeCube]);

  const activeTexture = textures[`${texture}Texture`];

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        if (e.altKey) { // si el usuario tiene presionada la tecla Alt
          removeCube(id);
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        transparent
        attach="material"
        map={activeTexture}
      />
    </mesh>
  );
};

/*

useBox nos permite crear cajas

boxGeometry nos permite indicar que queremos una geometria de caja para nuestros objetos

*/
