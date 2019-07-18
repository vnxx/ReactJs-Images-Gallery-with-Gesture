import React from "react";
import ReactDOM from "react-dom";
import { useSpring, animated, config } from "react-spring";
import { useGesture } from "react-use-gesture";

import "./styles.css";
import { images } from "./images";
function App() {
  const [selected, setSelected] = React.useState(0);

  function pilih(index) {
    console.log(index);
    setSelected(index);
  }

  const [[x], setX] = React.useState([0, 0]);

  const bind = useGesture(({ delta: [xDelta], down }) => {
    if (down) {
      setX([xDelta, 0]);
    } else {
      if (xDelta > 100) {
        console.log("kanan");
        if (selected !== 0) {
          setSelected(selected - 1);
        }
      }
      if (xDelta < -100) {
        console.log("kiri");
        if (selected !== images.length - 1) {
          setSelected(selected + 1);
        }
      }
      setX([0, 0]);
    }
  });

  const anime = useSpring({
    left: -(selected * 300),
    position: "relative",
    display: "flex",
    transform: `translate3d(${x}px,0,0)`,
    from: {
      left: 0,
      transform: `translate3d(${x}px,0,0)`
      // transform: `translate3d(${x}px,${y}px,0)`
    },
    config: config.slow
  });

  return (
    <React.Fragment>
      <div className="App">
        <div className="gallery">
          <div className="warp">
            <animated.div {...bind()} style={anime}>
              {images.map((data, i) => (
                <img key={i} src={data.url} alt={data.name} />
              ))}
            </animated.div>
          </div>
          <div className="bullet">
            {images.map((data, i) => (
              <div
                onClick={() => pilih(i)}
                key={i}
                className={selected === i ? "bola-on" : "bola"}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
