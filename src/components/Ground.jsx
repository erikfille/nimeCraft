import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // x, y, z // Math.PI/2 hace que la camara pase de ser de 180° a ser de 90°, permitiendo que el usuario pueda ver hacia arriba y hacia abajo, teniendo como limite el eje propio
    position: [0, -0.5, 0], // x, y, z // el eje y se pone ligeramente por debajo para poder agregar los cubos "apoyados" en el piso, ya que de otra manera nos muestra los cubos flotando.
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  groundTexture.repeat.set(1000, 1000); // Nos aseguramos de que la textura del piso se repita para ocupar cada cuadro del canva con una imagen de textura, en lugar de ocupar el 100% del canva con una única imagen de textura. // podemos modificar esto para que la textura sea mucho mas amplia (habria que modificar tambien los args de planeBufferGeometry)

  const handleClickGround = (e) => {
    e.stopPropagation(); // frena la propagacion del evento donde hay cosas ya creadas (ej: el suelo u otra caja)
    const [x, y, z] = Object.values(e.point).map((n) => Math.ceil(n)); // toma la informacion de donde se esta apuntando en el momento del evento y redondea los valores

    addCube(x, y, z);
  };

  return (
    <mesh onClick={handleClickGround} ref={ref}>
      <planeGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
}

/*

usePlane es un hook que nos permite crear un plano. Es necesario pasarle un objeto que conste de la rotacion y la posicion del plano

mesh es un elemento que genera una malla que mezcla tanto geometria como textura y permite crear un objeto visual. Necesita que se le pase la geometría y el material.

planeGeometry genera una geometria plana, a la cual le indicamos con "attach" que se adjunte a la geometría y con "args" le pasamos los argumentos (en este caso, el tamaño).

meshStandardMaterial indica el materíal a utilizar en nuestra malla. Con "attach" le indicamos que se vincule al material y con "color", le pasamos el color que queremos para nuestro elemento. Si utilizamos una textura, le pasamos "map", que nos permite mapear la textura.

*/
