import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function FirstPersonView() {
  const { camera, gl } = useThree();

  return <PointerLockControls args={[camera, gl.domElement]} />;
}

/*

Aqui creamos nuestro elemento de camara para que el usuario tenga control sobre el punto de vista.

Hay que traer el componente PointerLockControls para darle al usuario la capacidad de controlar los elementos que se le pasan como args, en este caso, la camara y el elemento del dom que va a controlar.

*/
