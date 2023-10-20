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
    animation.current = anime.timeline();

    // adding animations
    // targetting specific class
    animation.current.add(
      anime({
        targets: `.wrap .box-1`,
        translateX: 250,
        loop: true,
      })
    );

    // targetting specific node
    animation.current.add(
      anime({
        targets: document.querySelectorAll(".box-2"),
        translateX: 270,
        loop: true,
      })
    );

    // targetting JS object
    animation.current.add(
      anime({
        targets: battery,
        charged: "100%",
        cycles: 130,
        round: 1,
        loop: true,
        update: function () {
          document.querySelector(".battery-log").innerHTML =
            JSON.stringify(battery);
        },
      })
    );

    // changing css properties
    animation.current.add(
      anime({
        targets: ".box-3",
        translateX: 240,
        loop: true,
        backgroundColor: "#fff",
        borderRadius: ["0%", "50%"],
        easing: "easeInOutQuad",
      })
    );

    // changing css transform properties
    animation.current.add(
      anime({
        targets: ".box-4",
        translateX: 250,
        loop: true,
        scale: 2,
        rotate: "1turn",
      })
    );

    // changing svg attributes
    animation.current.add(
      anime({
        targets: "#svg-1 polygon",
        points: "64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96",
        baseFrequency: 0,
        scale: 1,
        direction: "alternate",
        loop: true,
        easing: "easeInOutExpo",
      })
    );

    // specific property parameters
    animation.current.add(
      anime({
        targets: ".box-5",
        translateX: {
          value: 250,
          duration: 800,
        },
        rotate: {
          value: 360,
          duration: 1800,
          easing: "easeInOutSine",
        },
        scale: {
          value: 2,
          duration: 1600,
          delay: 800,
          easing: "easeInOutQuart",
        },
        delay: 250, // all property except 'scale' inherit 250ms delay
        loop: true,
      })
    );

    // funtion based parameters
    animation.current.add(
      anime({
        targets: ".box-6",
        translateX: 270,
        direction: "alternate",
        loop: true,
        delay: function (el, i, l) {
          return i * 100;
        },
        endDelay: function (el, i, l) {
          return (l - i) * 100;
        },
      })
    );

    // function based values
    animation.current.add(
      anime({
        targets: ".box-7",
        translateX: function (el) {
          return el.getAttribute("data-x");
        },
        translateY: function (el, i) {
          return 100 + -90 * i;
        },
        scale: function (el, i, l) {
          return l - i + 0.25;
        },
        rotate: function () {
          return anime.random(-360, 360);
        },
        borderRadius: function () {
          return ["50%", anime.random(10, 35) + "%"];
        },
        duration: function () {
          return anime.random(1600, 2200);
        },
        delay: function () {
          return anime.random(0, 500);
        },
        direction: "alternate",
        loop: true,
      })
    );
  }, []);

  return (
    <>
      <div className="head">
        <h1>Animation In React With anime.js</h1>
      </div>
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
      <div className="wrap clr-skin">
        <svg id="svg-1">
          <polygon
            height={128}
            width={128}
            points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100"
            fill="currentColor"
          ></polygon>
        </svg>
      </div>
      <div className="wrap">
        <Box cs={"box box-5 bg-yellow"} />
      </div>
      <div className="wrap">
        <Box cs={"multi-box box-6 bg-yellow"} />
        <Box cs={"multi-box box-6 bg-yellow"} />
        <Box cs={"multi-box box-6 bg-yellow"} />
      </div>
      <div className="wrap">
        <Box cs={"circle box-7 bg-green"} x={"240"} />
        <Box cs={"circle box-7 bg-green"} x={"80"} />
        <Box cs={"circle box-7 bg-green"} x={"420"} />
      </div>
    </>
  );
};

export default App;
