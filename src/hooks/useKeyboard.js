import { useEffect, useState } from "react";

const ACTIONS_KEYBOARD_MAP = {
  KeyW: "moveForward",
  KeyS: "moveBackward",
  KeyA: "moveLeft",
  KeyD: "moveRight",
  Space: "jump",
  Digit1: "dirt",
  Digit2: "grass",
  Digit3: "glass",
  Digit4: "wood",
  Digit5: "log",
  ShiftLeft: "run",
  Shift: "run",
};

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    run: false,
    dirt: false,
    grass: false,
    glass: false,
    log: false,
    wood: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      // se declara la funcion para cuando el usuario presiona una tecla
      const { code } = event; // extrae el codigo de la tecla que dispara el evento
      // console.log(code)
      const action = ACTIONS_KEYBOARD_MAP[code]; // guarda la accion realizada por el usuario

      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: true,
        }));
      }
    };
    const handleKeyUp = (event) => {
      // se declara la funcion para cuando el usuario deja de presionar la tecla
      const { code } = event;
      const action = ACTIONS_KEYBOARD_MAP[code]; // guarda la accion realizada por el usuario

      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: false,
        }));
      }
    };
    document.addEventListener("keydown", handleKeyDown); // crea el evento para cada pulsacion de tecla
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyUp); // remueve el evento de pulsado de tecla
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return actions;
};

/*

Creamos un hook personalizado para el movimiento con el teclado.

Se crea un estado con las acciones que se van a utilizar y se setean como false por defecto.

Con el useEffect se crea el evento de pulsado de teclas y luego se elimina una vez que se ejecuta.

*/
