import { grassImg, dirtImg, logImg, glassImg, woodImg } from "./images";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

const groundTexture = new TextureLoader().load(grassImg);
const dirtTexture = new TextureLoader().load(dirtImg);
const logTexture = new TextureLoader().load(logImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);

groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;
[groundTexture, dirtTexture, logTexture, glassTexture, woodTexture].forEach((texture) => texture.magFilter = NearestFilter)


export { groundTexture, dirtTexture, logTexture, glassTexture, woodTexture };
/*

TextureLoader es un elemento del modulo básico de Three y nos permite cargar texturas, cosa que no podemos hacer con React por defecto. Se debe instanciar, ejecutandose seguido de un método .load que cargue la textura que necesitamos.

Los métodos .wrapS y .wrapT con la ejecución de RepeatWrapping permiten que la textura efectivamente se repita cuando se utiliza el repeat en su aplicación

El método magFilter nos permite modificar los filtros que vamos a aplicar a la imagen. Como Three intenta mejorar las imagenes de baja resolución, si no modificamos manualmente el filtro, las texturas de Minecraft se van a ver borrosas. Con el NearestFilter, lo que se hace es mantener la relacion de perspectiva de los pixeles mas cercanos, pero sin modificar su visibilidad.

*/
