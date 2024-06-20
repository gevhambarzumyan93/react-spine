import { Spine } from "@pixi/spine-pixi";
import { Container } from "pixi.js";

// Class for handling the character Spine and its animations.
export class SpineTest {
  constructor() {
    // Create the main view.
    this.view = new Container();

    // Create the Spine instance using the preloaded Spine asset aliases.
    this.spine = Spine.from({
      skeleton: "testSkeleton",
      atlas: "testAtlas",
    });

    // Add the spine to the main view.
    this.view.addChild(this.spine);
  }
}
