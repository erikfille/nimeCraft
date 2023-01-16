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

## **Orden de creación del Proyecto**

1. Boilerplate
2. Sky
3. Textures & Images
4. Ground
5. Keyboard Inputs
6. Player
7. First Person View
8. Gravity
9. Movement
10. State Management
11. Cubes
12. Adding Cubes
13. Removing Cubes
14. Cube Type Selector
15. Save world in localstorage
16. Build a house