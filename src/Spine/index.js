import "@pixi/spine-pixi";
import { Character } from "Character/baseCharacter";
import { SpineBoy } from "Character/spineBoy";
import { CharacterJSON } from "Character/baseJsonCharacter";
import { Application, Assets } from "pixi.js";
import { loadAssets } from "./loader";

const animationMap = {
  idle: {
    name: "idle",
    loop: true,
  },
  walk: {
    name: "walk",
    loop: true,
  },
  run: {
    name: "run",
    loop: true,
  },
  jump: {
    name: "jump",
    timeScale: 1.5,
  },
  hover: {
    name: "hoverboard",
    loop: true,
  },
  spawn: {
    name: "portal",
  },
};

const initApp = async () => {
  const app = new Application();
  const appElement = document.getElementById("app");

  // Intialize the application.
  await app.init({
    background: "#1099bb",
    resizeTo: appElement, //window
  });

  // move this inside of character class
  await loadAssets([
    { alias: "spineboyData", src: "./assets/spineboy-pro.skel" },
    { alias: "spineboyAtlas", src: "./assets/spineboy-pma.atlas" },
    // raptor
    { alias: "raptorAtlas", src: "./assets/raptor-pma.atlas" },
    { alias: "raptorData", src: "./assets/raptor-pro.json" },
  ]);

  document.body.appendChild(app.canvas);

  const character = new Character({
    atlas: "spineboyAtlas",
    skeleton: "spineboyData",
    animationMap,
  });

  const raptor = new CharacterJSON({
    atlas: "raptorAtlas",
    skeleton: "raptorData",
    animationMap,
  });

  const spineboy = await SpineBoy.init();

  // console.log(spineboyClass, "< spineboyClass");

  // const spineboy = await spineboyClass.init();

  spineboy.view.x =
    app.screen.width / 2 - spineboy.view.getBounds().width / 2 - 50;
  spineboy.view.y = app.screen.height - 80;

  character.view.x =
    app.screen.width / 2 - character.view.getBounds().width / 2;
  character.view.y = app.screen.height - 80;

  raptor.view.x = app.screen.width / 2 + raptor.view.getBounds().width / 2;
  raptor.view.y = app.screen.height - 80;

  app.stage.addChild(character.view);
  app.stage.addChild(raptor.view);
  app.stage.addChild(spineboy.view);

  app.ticker.add(() => {
    character.direction = 1;
    raptor.direction = 1;
    spineboy.direction = 1;
    character.update();
    raptor.update();
    spineboy.update();
  });
};

(() => {
  window.onload = initApp;
})();
