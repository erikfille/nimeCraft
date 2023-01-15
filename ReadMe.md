# NimeCraft

## _A Minecraft Clone_

### _Based on FreeCodeCamp course_

---

## **Dependencias**

> Aplicación levantada con Vite

`npm create vite@latest`

> Instalación manual de módulos

- **Standard**
  Standard es un linter para JS

https://www.npmjs.com/package/standard?activeTab=readme

`npm install standard -D`

```json
  "eslintConfig" : {
    "extends": ["./node_modules/standard/eslintrc.json"]
  }
```

- **Three.Js**
  Tree.js es una biblioteca que permite construir cosas en 2D y 3D, utilizando la API de webGL.

webGL es una API a bajo nivel que permite acceder a la GPU para hacer dibujos

https://www.npmjs.com/package/three

Doc: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

`npm install three @react-three/fiber @react-three/drei @react-three/cannon -E`

cannon permite que nuestra app tenga físicas

- **Zustand**
  Es una libreria que nos permite utilizar estados globales, al estilo de Redux

https://docs.pmnd.rs/zustand/getting-started/introduction

`npm install zustand -E`

- **Nano ID**
  Permite crear un id único para los elementos

https://www.npmjs.com/package/nanoid?activeTab=readme

`npm install nanoid -E`


## **Recursos**
Repo de texturas de Minecraft:

https://minecraft.fandom.com/wiki/List_of_block_textures#Current_textures