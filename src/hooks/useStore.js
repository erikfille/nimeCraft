import { nanoid } from "nanoid";
import { create } from "zustand";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key)); // parsea a JSON lo que tenemos en el localStorage
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value)); // setea el localStorage con una key y un valor parseado a JSON

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [], // setea nuestro mundo creado (con cubos) o inicia uno nuevo (sin cubos)
  addCube: (x, y, z) => {
    set((prevState) => ({
      cubes: [
        ...prevState.cubes,
        {
          key: nanoid(),
          texture: prevState.texture,
          pos: [x, y, z],
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prevState) => ({
      cubes: prevState.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return x !== X || y !== Y || z !== Z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({ texture }));
  },
  saveWorld: () => {
    set((prevState) => {
      setLocalStorage("cubes", prevState.cubes);
      return prevState;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
    set((prevState) => {
      setLocalStorage("cubes", prevState.cubes);
      return prevState;
    });
  },
}));
