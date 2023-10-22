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

    // SVG animations
    // Motion Path
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

    // Morphing
    anime({
      targets: ".box-16.polymorph",
      points: [
        {
          value: [
            "70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369",
            "70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369",
          ],
        },
        {
          value:
            "70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369",
        },
        {
          value:
            "70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369",
        },
        {
          value:
            "70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369",
        },
      ],
      easing: "easeOutQuad",
      duration: 2000,
      loop: true,
    });

    // line drawing
    anime({
      targets: "#svg-2 .lines path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1500,
      delay: function (el, i) {
        return i * 250;
      },
      direction: "alternate",
      loop: true,
    });

    // easing: step
    anime({
      targets: ".box-17",
      translateX: 280,
      loop: true,
      easing: "steps(5)",
      direction: "alternate",
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
      <div className="wrap">
        <Box cs={"box box-17 bg-blue"} />
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
      <div className="wrap clr-violet">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <g fill="none" fillRule="evenodd">
            <g fill="currentColor" fillOpacity=".15" transform="translate(0 6)">
              <polygon points="70 0 136.574 48.369 111.145 126.631 28.855 126.631 3.426 48.369"></polygon>
              <polygon points="70 18 119.455 53.931 100.565 112.069 39.435 112.069 20.545 53.931"></polygon>
              <polygon points="70 34.86 101.727 57.911 89.609 95.209 50.391 95.209 38.273 57.911"></polygon>
              <polygon points="70 50.898 84.864 61.697 79.186 79.171 60.814 79.171 55.136 61.697"></polygon>
            </g>
            <polygon
              className="box-16 polymorph"
              strokeWidth="1"
              stroke="currentColor"
              points="70 36.46349066694431 125.99458610115313 58.10291078782831 95.99050311101855 111.21041389884687 42.54600622203713 113.33912759622041 16.644853737668207 58.14581535361948 "
            ></polygon>
          </g>
        </svg>
      </div>
      <div className="wrap clr-violet">
        <svg id="svg-2" viewBox="0 0 280 100">
          <g
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeWidth="1"
            className="lines"
          >
            <path
              className="el"
              d="M58 80V50.12C57.7 41.6 51.14 35 43 35a15 15 0 0 0 0 30h7.5v15H43a30 30 0 1 1 0-60c16.42 0 29.5 13.23 30 29.89V80H58z"
              strokeDasharray="316.85528564453125"
            ></path>
            <path
              className="el"
              d="M73 80V20H58v60h15z"
              strokeDasharray="150"
            ></path>
            <path
              className="el"
              d="M58 80V49.77C58.5 33.23 71.58 20 88 20a30 30 0 0 1 30 30v30h-15V50a15 15 0 0 0-15-15c-8.14 0-14.7 6.6-15 15.12V80H58zm75 0V20h-15v60h15z"
              strokeDasharray="441.1739501953125"
            ></path>
            <path
              className="el"
              d="M118 80V49.77C118.5 33.23 131.58 20 148 20a30 30 0 0 1 30 30v30h-15V50a15 15 0 0 0-15-15c-8.14 0-14.7 6.6-15 15.12V80h-15zm-7.5-60a7.5 7.5 0 1 1-7.48 8v-1c.25-3.9 3.5-7 7.48-7z"
              strokeDasharray="338.3053894042969"
            ></path>
            <path
              className="el"
              d="M133 65a15 15 0 0 1-15-15v-7.5h-15V50a30 30 0 0 0 30 30V65zm30 15V49.77C163.5 33.23 176.58 20 193 20a30 30 0 0 1 30 30v30h-15V50a15 15 0 0 0-15-15c-8.14 0-14.7 6.6-15 15.12V80h-15z"
              strokeDasharray="406.8699035644531"
            ></path>
            <path
              className="el"
              d="M238 65a15 15 0 0 1 0-30c8.1 0 14.63 6.53 15 15h-15v15h30V49.89C267.5 33.23 254.42 20 238 20a30 30 0 0 0 0 60V65z"
              strokeDasharray="301.8561706542969"
            ></path>
            <path
              className="el"
              d="M260.48 65a7.5 7.5 0 1 1-7.48 8v-1c.26-3.9 3.5-7 7.48-7z"
              strokeDasharray="47.128875732421875"
            ></path>
          </g>
        </svg>
      </div>
    </>
  );
};

export default App;
