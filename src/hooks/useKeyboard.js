import { useEffect, useState, useCallback } from "react";

function actionByKey(key) {
  const keyActionMap = {
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
  return keyActionMap[key];
}

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
    wood: false,
    log: false,
  });

  const handleKeyDown = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prevState) => {
        return {
          ...prevState,
          [action]: true,
        };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prevState) => {
        return {
          ...prevState,
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown); // crea el evento para cada pulsacion de tecla
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyUp); // remueve el evento de pulsado de tecla
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};

/*

Creamos un hook personalizado para el movimiento con el teclado.

Se crea un estado con las acciones que se van a utilizar y se setean como false por defecto.

Con el useEffect se crea el evento de pulsado de teclas y luego se elimina una vez que se ejecuta.

*/
