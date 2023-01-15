import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";

const CHARACTER_SPEED = 2;
const CHARACTER_RUN_SPEED = 5;
const CHARACTER_JUMP_FORCE = 3;

export const Player = () => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump, run } =
    useKeyboard();

  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  // subscripcion a la posicion del personaje
  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  // subscripcion a la velocidad del personaje
  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    );

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    ); // Si nos movemos hacia atras, el eje z es 1; en caso contrario, no se mueve, y si se mueve hacia adelante, el eje z es -1; en caso contrario, es 0. Si ambos botones estan pulsados, se cancelan (1 - 1)

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    if(run) {
        direction
        .subVectors(frontVector, sideVector) // subVectors hace calculos con los vectores para indicar la direccion del movimiento.
        .normalize()
        .multiplyScalar(CHARACTER_RUN_SPEED) // indica la velocidad del movimiento // Ej: walk = 2 / run =5
        .applyEuler(camera.rotation); // permite que el personaje se mueva en la direccion que indica la camara, respecto a su rotación.
    } else {
        direction
        .subVectors(frontVector, sideVector) // subVectors hace calculos con los vectores para indicar la direccion del movimiento.
        .normalize()
        .multiplyScalar(CHARACTER_SPEED) // indica la velocidad del movimiento // Ej: walk = 2 / run =5
        .applyEuler(camera.rotation); // permite que el personaje se mueva en la direccion que indica la camara, respecto a su rotación.
    }

   

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1] < 0.005)) {
      // el personaje no puede saltar cuando tiene una velocidad en el eje y (evita el salto infinito)
      // Si el personaje salta, se le aplica un movimiento hacia arriba
      api.velocity.set(
        vel.current[0], // mantiene la velocidad en el eje x
        CHARACTER_JUMP_FORCE, // aplica una velocidad en el eje y
        vel.current[2]
      ); // mantiene la velocidad en el eje z
    }
  });

  return <mesh ref={ref} />;
};

/*

Creamos una nueva camara para poder darle al usuario la capacidad de moverse por el plano.

Creamos una nueva esfera (useSphere) con las propiedades de masa, tipo (dinamico) y posicion inicial. La api nos permite suscribirnos a los cambios de la esfera, permitiendonos seguir la posicion del personaje.

Con useFrame, indicamos que cada vez que haya un frame, sea porque se esta pulsando una tecla. Hay que instanciar un Vector3 de Three, con las coordenadas para que la posicion de la camara este actualizada

Con el useEffect nos suscribimos a la api de useSphere para que nos indique los cambios en el elemento. Para la posicion utilizamos un useRef y no un useState, ya que no queremos que el componente se re-renderice cada vez que hay un cambio.

El useRef nos permite crear una variable que mantiene su valor aunque el componente se renderice.

*/
