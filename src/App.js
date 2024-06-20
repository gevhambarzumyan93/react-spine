import { useEffect } from "react";
import Summoner from "Summoner";
import "./App.css";
// WORKING METHOD 1
// import "./Spine";
import { init } from "SpineApp";

// WORKING METHOD 3
(() => {
  window.onload = init("app");
})();

function App() {
  // WORKING METHOD 2
  // useEffect(() => {
  //   const handleLoad = init("app");

  //   window.addEventListener("load", handleLoad);

  //   return () => {
  //     window.removeEventListener("load", handleLoad);
  //   };
  // }, []);

  return (
    <>
      <Summoner />
      <div id="app" className="App" />
    </>
  );
}

export default App;
