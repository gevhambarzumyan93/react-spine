export const initJSON = async ({ elem, assetsData = [] }) => {
  //   const appElement = document.getElementById("app");

  var app = new Application();
  await app.init({
    resizeTo: elem,
    backgroundColor: 0x2c3e50,
  });
  document.body.appendChild(app.canvas);

  // Pre-load the skeleton data and atlas. You can also load .json skeleton data.
  Assets.add({ alias: "spineboyData", src: "./assets/spineboy-pro.skel" });
  Assets.add({ alias: "spineboyAtlas", src: "./assets/spineboy-pma.atlas" });
  //
  Assets.add({ alias: "raptorAtlas", src: "./assets/raptor-pma.atlas" });
  Assets.add({ alias: "raptorData", src: "./assets/raptor-pro.json" });
  await Assets.load([
    "spineboyData",
    "spineboyAtlas",
    "raptorAtlas",
    "raptorData",
  ]);

  // Manually load the data and create a Spine display object from it using
  // the Spine core API. This will not use the interal cache like from(),
  // so you have to cache data yourself.
  // const atlas = Assets.get("spineboyAtlas");
  // const attachmentLoader = new AtlasAttachmentLoader(atlas);
  // const binaryLoader = new SkeletonBinary(attachmentLoader);
  // binaryLoader.scale = 0.5;
  // const skeletonData = binaryLoader.readSkeletonData(
  //   Assets.get("spineboyData")
  // );
  // const spineboy = new Spine(skeletonData);

  const attachmentLoader = new AtlasAttachmentLoader(Assets.get("raptorAtlas"));
  const spineJsonParser = new SkeletonJson(attachmentLoader);

  const raptorSkeletonData = spineJsonParser.readSkeletonData(
    Assets.get("raptorData")
  );

  const raptor = new Spine(raptorSkeletonData);
  raptor.scale = 0.3;

  const spineboy = Spine.from({
    skeleton: "spineboyData",
    atlas: "spineboyAtlas",
    scale: 0.3,
  });
  spineboy.state.data.defaultMix = 0.2;
  raptor.state.data.defaultMix = 0.2;

  // Center the spine object on screen.
  spineboy.x = window.innerWidth / 2;
  spineboy.y = window.innerHeight / 2 + spineboy.getBounds().height / 2;

  raptor.x = app.screen.width / 2;
  raptor.y = app.screen.height / 2 + 150;

  // Set animation "run" on track 0, looped.
  spineboy.state.setAnimation(0, "walk", true);
  raptor.state.setAnimation(0, "walk", true);

  // Add the display object to the stage.
  app.stage.addChild(raptor);
};
