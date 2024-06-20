import { Spine, AtlasAttachmentLoader, SkeletonJson } from "@pixi/spine-pixi";
import { Container, Assets } from "pixi.js";

// todo just for test reason
export class CharacterJSON {
  _animationMap = {};
  constructor({ skeleton = "", atlas = "", animationMap = {} }) {
    this.state = {
      walk: false,
      run: false,
      hover: false,
      jump: false,
    };

    this._animationMap = animationMap;

    this.view = new Container();
    this.directionalView = new Container();

    const attachmentLoader = new AtlasAttachmentLoader(Assets.get(atlas));
    const spineJsonParser = new SkeletonJson(attachmentLoader);

    const skeletonData = spineJsonParser.readSkeletonData(Assets.get(skeleton));

    this.spine = new Spine(skeletonData);
    this.spine.scale = 0.3;

    this.directionalView.addChild(this.spine);

    this.view.addChild(this.directionalView);

    this.spine.state.data.defaultMix = 0.2;
  }

  playAnimation({ name, loop = false, timeScale = 1 }) {
    if (this.currentAnimationName === name) return;

    const trackEntry = this.spine.state.setAnimation(0, name, loop);

    trackEntry.timeScale = timeScale;
  }

  update() {
    if (this.state.jump) this.playAnimation(this._animationMap.jump);

    if (this.isAnimationPlaying(this._animationMap.jump)) return;

    if (this.state.hover) this.playAnimation(this._animationMap.hover);
    else if (this.state.run) this.playAnimation(this._animationMap.run);
    else if (this.state.walk) this.playAnimation(this._animationMap.walk);
    // idle doesn't exist
    else this.playAnimation(this._animationMap.walk);
  }

  isAnimationPlaying({ name }) {
    return (
      this.currentAnimationName === name &&
      !this.spine.state.getCurrent(0).isComplete()
    );
  }

  get currentAnimationName() {
    return this.spine.state.getCurrent(0)?.animation.name;
  }

  get direction() {
    return this.directionalView.scale.x > 0 ? 1 : -1;
  }

  set direction(value) {
    this.directionalView.scale.x = value;
  }
}
