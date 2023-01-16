import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import { dirtImg, grassImg, glassImg, woodImg, logImg } from "../images/images";

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);

  const [activeTexture, setTexture] = useStore((state) => [
    // Traemos la textura del store
    state.texture,
    state.setTexture,
  ]);

  const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
  };

  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const options = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };

    const selectedTexture = Object.entries(options).find(
      ([texture, isEnabled]) => isEnabled
    ); // busca en el objeto options cual de las texturas esta activa (seteada a true)

    if (selectedTexture) {
      // Si existe una textura seleccionada (con value true)
      setTexture(selectedTexture[0]); // setea la textura con esa textura.
    }
  }, [setTexture, dirt, grass, glass, log, wood]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    setVisible(true);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className={`texture-selector`}>
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              className={`${k === activeTexture ? "active" : ""}`}
              key={k}
              src={src}
              alt={k}
            />
          );
        })}
      </div>
    )
  );
};
