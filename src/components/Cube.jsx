import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures.js";
import { useState } from "react";
import { useStore } from "../hooks/useStore.js";

export const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

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
        const clickedFace = Math.floor(e.faceIndex / 2); // la representacion de los cubos es de 2 caras por lado (2 triangulos que forman un cuadrado), por lo cual esto lo que hace es unificar esas dos caras por lado en un unico cuadrado. Ahora el index esta entre 0 y 5, en lugar de 0 y 11

        const [x, y, z] = ref.current.position; // Extrae [x, y, z] de la posicion actual de la caja a la que se apunta.

        if (e.altKey) {
          removeCube(x, y, z);
          return;
        }

        if (clickedFace === 0) {
          // Si se clickea en la cara 0
          addCube(x + 1, y, z); // Se agrega un cubo pegado a esa cara
          return;
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        map={activeTexture}
        color={isHovered ? "grey" : "white"}
        transparent={true}
        opacity={texture === "glass" ? 0.75 : 1}
      />
    </mesh>
  );
};

/*

useBox nos permite crear cajas

boxGeometry nos permite indicar que queremos una geometria de caja para nuestros objetos

*/
