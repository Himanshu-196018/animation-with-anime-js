import anime from "animejs/lib/anime.es.js";
import { useRef, useEffect } from "react";
import Box from "./Box";
import ObjectDisplay from "./ObjectDisplay";

const App = () => {
  const animation = useRef(null);
  let battery = {
    charged: "0%",
    cycles: 120,
  };

  useEffect(() => {
    animation.current = anime.timeline({
      loop: true,
      duration: "1000ms",
    });

    // adding animations
    // targetting specific class
    animation.current.add({
      targets: `.wrap .box-1`,
      translateX: 250,
    });
    // targetting specific node
    animation.current.add({
      targets: document.querySelectorAll(".box-2"),
      translateX: 270,
    });
    // targetting JS object
    animation.current.add({
      targets: battery,
      charged: "100%",
      cycles: 130,
      round: 1,
      update: function () {
        document.querySelector(".battery-log").innerHTML =
          JSON.stringify(battery);
      },
    });
    // changing css properties
    animation.current.add({
      targets: ".box-3",
      translateX: 240,
      backgroundColor: "#fff",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
    });
    // changing css transform properties
    animation.current.add({
      targets: ".box-4",
      translateX: 250,
      scale: 2,
      rotate: "1turn",
    });
  }, []);

  return (
    <>
      <div className="wrap">
        <Box cs={"box box-1 bg-red"} />
      </div>
      <div className="wrap">
        <Box cs={"multi-box box-2 bg-red"} />
        <Box cs={"multi-box box-2 bg-red"} />
        <Box cs={"multi-box box-2 bg-red"} />
      </div>
      <div className="wrap">
        <ObjectDisplay cs={"battery-log clr-red"} />
      </div>
      <div className="wrap">
        <Box cs={"box box-3 bg-skin"} />
      </div>
      <div className="wrap">
        <Box cs={"multi-box box-4 bg-skin"} />
      </div>
    </>
  );
};

export default App;
