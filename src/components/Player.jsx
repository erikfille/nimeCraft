import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";

const CHARACTER_SPEED = 2;
const CHARACTER_RUN_SPEED = 5;
const CHARACTER_JUMP_FORCE = 4;

export const Player = () => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump, run } =
    useKeyboard();

  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1.5, 0],
  }));

  // subscripcion a la posicion del personaje
  const pos = useRef([0, 0, 0]);

  useEffect(() => { // hace que pos siga a la posición de la esfera (es decir, la camara del personaje)
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
    camera.position.copy(       // La camara sigue a la referencia de posicion (pos)
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    );

    // Vector que indica la direccion hacia la que estamos apuntando
    const direction = new Vector3();

    // Vector que indica el movimiento hacia adelante
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    ); // Si nos movemos hacia atras, el eje z es 1; en caso contrario, no se mueve, y si se mueve hacia adelante, el eje z es -1; en caso contrario, es 0. Si ambos botones estan pulsados, se cancelan (1 - 1)

    // Vector que indica los movimientos hacia los lados
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    if(run) {
        direction
        .subVectors(frontVector, sideVector) // subVectors hace calculos con los vectores para indicar la direccion del movimiento en relacion a las techas oprimidas.
        .normalize()
        .multiplyScalar(CHARACTER_RUN_SPEED) // indica la velocidad del movimiento // Ej: walk = 2 / run =5
        .applyEuler(camera.rotation); // permite que el personaje se mueva en la direccion que indica la camara, respecto a su rotación.
    } else {
        direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(CHARACTER_SPEED)
        .applyEuler(camera.rotation);
    }

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1] < 0.0000001)) {// el personaje no puede saltar cuando tiene una velocidad en el eje y (evita el salto infinito) // Si el personaje salta, se le aplica un movimiento hacia arriba
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

Creamos una nueva esfera (useSphere) con las propiedades de masa, tipo (dinamico) y posicion inicial. Esto es para que el personaje tenga masa y ocupe un espacio en nuestro mesh del ground, y pueda colisionar con objetos y atenerse a la gravedad. La api nos permite suscribirnos a los cambios de la esfera, permitiendonos seguir la posicion del personaje.

useFrame, es un hook que se ejecutará cada vez que haya un frame. Hay que instanciar un Vector3 de Three, con las coordenadas para que la posicion de la camara este actualizada

Con el useEffect nos suscribimos a la api de useSphere para que nos indique los cambios en el elemento. Para la posicion utilizamos un useRef y no un useState, ya que no queremos que el componente se re-renderice cada vez que hay un cambio.

El useRef nos permite crear una variable que mantiene su valor aunque el componente se renderice.


1. Tenemos una esfera (camara de personaje)
2. La esfera se conecta a una posicion que sigue sus movimientos (const pos = useRef([0, 0, 0]))
3. La camara sigue a la posicion de la esfera (con el useFrame())
4. Nos subscribimos a la api que registra los cambios en la posicion de la esfera a traves de la constante pos

5. Se repite lo anterior, pero con la velocidad:
  a. La esfera se conecta a una constante que sigue ssu velocidad (  const vel = useRef([0, 0, 0]))
  b. Nos subscribimos a la api que registra los cambios en la posicion de la esfera a traves de la constante vel

*/
