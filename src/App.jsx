import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./components/Ground";
import { FirstPointOfView } from "./components/FirstPointOfView";
import { Player } from "./components/Player";
import { Cubes } from "./components/Cubes";
import { TextureSelector } from "./components/TextureSelector";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FirstPointOfView />
        <Physics>
          <Cubes />
          <Player />
          <Ground />
        </Physics>
      </Canvas>
      <div className="pointer">+</div>
      <TextureSelector />
    </>
  );
}

export default App;

/*
Canva es el componente base de la app, es decir, aquel sobre el que se va a renderizar nuestro juego

Sky es el componente que nos permite tener un cielo en nuestra app. Podemos pasarle props como sunPosition para modificar la posicion del sol, entre otras opciones.

Physics nos va a permitir utilizar fisicas dentro de nuestro Canva. Dentro de este componente iran todos los elementos visuales que requieran físicas.

ambientLight es un elemento (no componente) que funciona dentro del componente Canva (al igual que mesh, por ejemplo). Se escriben con camelCase y no es necesario importarlos.

*/
