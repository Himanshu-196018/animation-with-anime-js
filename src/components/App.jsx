import anime from "animejs/lib/anime.es.js";
import { useRef, useEffect } from "react";
import Box from "./Box";
import MultiBox from "./MultiBox";

const App = () => {
  const animation = useRef(null);

  useEffect(() => {
    animation.current = anime.timeline({
      loop: true,
    });

    // adding animations
    animation.current.add({
      targets: `.wrap .box-1`,
      translateX: 250,
    });
  }, []);

  return (
    <>
      <Box cs={1} bg={"bg-red"} />
      <MultiBox cs={2} />
    </>
  );
};

export default App;
