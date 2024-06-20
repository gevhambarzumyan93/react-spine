import { Character } from "Character";
import { loadAssets } from "Spine/loader";

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

export class SpineBoy extends Character {
  constructor() {
    super({ skeleton: "spineboyData", atlas: "spineboyAtlas", animationMap });
  }

  static async init() {
    console.log("SpineBoy init");
    await loadAssets([
      { alias: "spineboyData", src: "/assets/spineboy-pro.skel" },
      { alias: "spineboyAtlas", src: "/assets/spineboy-pma.atlas" },
    ]);

    return new SpineBoy();
  }
}
