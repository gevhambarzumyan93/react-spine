import { useEffect } from "react";
import Summoner from "Summoner";
import "./App.css";
// import "./Spine";
import { init } from "Singleton";

(() => {
  window.onload = init("app");
})();

function App() {
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
