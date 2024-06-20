import { CharacterJSON } from "./jsonCharacter";
import { loadAssets } from "Spine/loader";

const animationMap = {
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

export class Raptor extends CharacterJSON {
  constructor() {
    super({
      atlas: "raptorAtlas",
      skeleton: "raptorData",
      animationMap,
    });
  }

  static async init() {
    console.log("Raptor init");
    await loadAssets([
      { alias: "raptorAtlas", src: "./assets/raptor-pma.atlas" },
      { alias: "raptorData", src: "./assets/raptor-pro.json" },
    ]);

    return new Raptor();
  }
}
