import { Raptor } from "Character/raptor";
import { SpineBoy } from "Character/spineBoy";
import { useEffect, useState } from "react";
import SpineApp from "./SpineApp";

export default () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // console.log(app, "< app");
    // if (!app) return;
    // // const character = new Character({
    // //     atlas: "spineboyAtlas",
    // //     skeleton: "spineboyData",
    // //     animationMap,
    // // });
    // loadAssets([
    //   { alias: "spineboyData", src: "./assets/spineboy-pro.skel" },
    //   { alias: "spineboyAtlas", src: "./assets/spineboy-pma.atlas" },
    // ]);
  }, []);

  const handleClick = async () => {
    const app = SpineApp.getInstance(321);

    const spineboy =
      count % 2 === 0 ? await Raptor.init() : await SpineBoy.init();

    spineboy.view.x = count * 100;
    spineboy.view.y = 500;
    setCount(count + 1);
    app.stage.addChild(spineboy.view);

    app.ticker.add(() => {
      spineboy.direction = 1;
      spineboy.update();
    });
  };

  return <button onClick={handleClick}>Summon</button>;
};
