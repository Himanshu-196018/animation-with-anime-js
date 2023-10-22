import anime from "animejs/lib/anime.es.js";
import { useRef, useEffect } from "react";
import Box from "./Box";
import Matrix from "./Matrix";
import Button from "./Button";
import ObjectDisplay from "./ObjectDisplay";

const App = () => {
  const animation = useRef(null);
  const tlc = useRef(null);
  let battery = {
    charged: "0%",
    cycles: 120,
  };

  useEffect(() => {
    animation.current = anime.timeline();

    // adding animations
    // targetting specific class
    anime({
      targets: `.wrap .box-1`,
      translateX: 250,
      loop: true,
    });

    // targetting specific node
    anime({
      targets: document.querySelectorAll(".box-2"),
      translateX: 270,
      loop: true,
    });

    // targetting JS object
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
    });

    // changing css properties
    anime({
      targets: ".box-3",
      translateX: 240,
      loop: true,
      backgroundColor: "#fff",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
    });

    // changing css transform properties
    anime({
      targets: ".box-4",
      translateX: 250,
      loop: true,
      scale: 2,
      rotate: "1turn",
    });

    // changing svg attributes
    anime({
      targets: "#svg-1 polygon",
      points: "64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96",
      baseFrequency: 0,
      scale: 1,
      direction: "alternate",
      loop: true,
      easing: "easeInOutExpo",
    });

    // specific property parameters
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
    });

    // funtion based parameters
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
    });

    // function based values
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
    });

    // property keyframes
    anime({
      targets: ".box-8",
      translateX: [
        { value: 250, duration: 1000, delay: 500 },
        { value: 0, duration: 1000, delay: 500 },
      ],
      translateY: [
        { value: -40, duration: 500 },
        { value: 40, duration: 500, delay: 1000 },
        { value: 0, duration: 500, delay: 1000 },
      ],
      scaleX: [
        { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
        { value: 1, duration: 900 },
        { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
        { value: 1, duration: 900 },
      ],
      scaleY: [
        { value: [1.75, 1], duration: 500 },
        { value: 2, duration: 50, delay: 1000, easing: "easeOutExpo" },
        { value: 1, duration: 450 },
        { value: 1.75, duration: 50, delay: 1000, easing: "easeOutExpo" },
        { value: 1, duration: 450 },
      ],
      easing: "easeOutElastic(1, 0.8)",
      loop: true,
    });

    // Staggering animations
    // staggering basics
    anime({
      targets: ".box-9",
      translateX: 270,
      delay: anime.stagger(100),
      direction: "alternate",
      loop: true,
    });
    // range value
    anime({
      targets: ".box-10",
      translateX: 270,
      rotate: anime.stagger([-360, 360]),
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });
    // grid stagger
    anime({
      targets: ".box-11",
      scale: [
        { value: 0.1, easeing: "easeOutSine", duration: 500 },
        { value: 1, easeing: "easeInOutQuad", duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
      loop: true,
    });
    // grid axis
    anime({
      targets: ".box-12",
      translateX: anime.stagger(10, {
        grid: [14, 5],
        from: "center",
        axis: "x",
      }),
      translateY: anime.stagger(10, {
        grid: [14, 5],
        from: "center",
        axis: "y",
      }),
      rotateZ: anime.stagger([0, 90], {
        grid: [14, 5],
        from: "center",
        axis: "x",
      }),
      delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
      direction: "alternate",
      loop: true,
    });

    // TimeLine
    // timeline basic
    let tl = anime.timeline({
      targets: ".box-13",
      easing: "easeOutExpo",
      delay: function (el, i) {
        return i * 200;
      },
      duration: 500,
      direction: "alternate",
      loop: true,
    });
    // children
    tl.add({
      translateX: 250,
      easing: "spring",
    })
      .add({
        opacity: 0.5,
        scale: 2,
      })
      .add({
        targets: ".triangle.box-13",
        rotate: 180,
      })
      .add({
        translateX: 0,
        scale: 1,
      });

    // TimeLine Controls
    let controlsEl = document.querySelector(".input");
    tlc.current = anime.timeline({
      direction: "alternate",
      loop: true,
      duration: 500,
      easing: "easeInOutSine",
      update: function (anim) {
        controlsEl.value = tlc.current.progress;
      },
    });
    tlc.current
      .add({
        targets: ".box-14.multi-box",
        translateX: 270,
      })
      .add(
        {
          targets: ".box-14.circle",
          translateX: 270,
        },
        "-= 100"
      )
      .add(
        {
          targets: ".box-14.triangle",
          translateX: 270,
        },
        "-=100"
      );
    controlsEl.addEventListener("input", function () {
      tlc.current.seek(tlc.current.duration * (controlsEl.value / 100));
    });
    const path = anime.path(".box-15-svg path");
    anime({
      targets: ".box-15",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      easing: "linear",
      duration: 2000,
      loop: true,
    });
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
      <div className="wrap">
        <Box cs={"circle box-8 bg-bright-green"} />
      </div>
      <div className="wrap">
        <Box cs={"small-box box-9 bg-green-an"} />
        <Box cs={"small-box box-9 bg-green-an"} />
        <Box cs={"small-box box-9 bg-green-an"} />
        <Box cs={"small-box box-9 bg-green-an"} />
        <Box cs={"small-box box-9 bg-green-an"} />
        <Box cs={"small-box box-9 bg-green-an"} />
      </div>
      <div className="wrap">
        <Box cs={"small-box box-10 bg-green-an"} />
        <Box cs={"small-box box-10 bg-green-an"} />
        <Box cs={"small-box box-10 bg-green-an"} />
        <Box cs={"small-box box-10 bg-green-an"} />
        <Box cs={"small-box box-10 bg-green-an"} />
        <Box cs={"small-box box-10 bg-green-an"} />
      </div>
      <div className="wrap matrix">
        <Matrix cs={"small-box box-11 bg-green-an"} />
      </div>
      <div className="wrap matrix">
        <Matrix cs={"small-box box-12 bg-green-an"} />
      </div>
      <div className="wrap">
        <Box cs={"multi-box box-13 bg-greenish-blue"} />
        <Box cs={"circle box-13 bg-greenish-blue"} />
        <Box cs={"triangle box-13 clr-greenish-blue"} />
      </div>
      <div className="wrap">
        <Box cs={"multi-box box-14 bg-sky-blue"} />
        <Box cs={"circle box-14 bg-sky-blue"} />
        <Box cs={"triangle box-14 clr-sky-blue"} />
        <div className="controls">
          <Button
            cs="btn clr-sky-blue"
            text="play"
            handleControl={() => tlc.current.play}
          />
          <Button
            cs="btn clr-sky-blue"
            text="pause"
            handleControl={() => tlc.current.pause}
          />
          <Button
            cs="btn clr-sky-blue"
            text="restart"
            handleControl={() => tlc.current.restart}
          />
          <input
            className="input clr-sky-blue"
            type="range"
            min={0}
            max={100}
          />
        </div>
      </div>
      <div className="wrap clr-violet wrap-box-15">
        <Box cs={"small-box bg-violet box-15"} />
        <svg
          className="box-15-svg"
          width="256"
          height="112"
          viewBox="0 0 256 112"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M8,56 C8,33.90861 25.90861,16 48,16 C70.09139,16 88,33.90861 88,56 C88,78.09139 105.90861,92 128,92 C150.09139,92 160,72 160,56 C160,40 148,24 128,24 C108,24 96,40 96,56 C96,72 105.90861,92 128,92 C154,93 168,78 168,56 C168,33.90861 185.90861,16 208,16 C230.09139,16 248,33.90861 248,56 C248,78.09139 230.09139,96 208,96 L48,96 C25.90861,96 8,78.09139 8,56 Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default App;
