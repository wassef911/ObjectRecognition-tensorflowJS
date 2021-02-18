import React from "react"
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./utilities"

function App() {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== undefined &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video props 
      const { video } = webcamRef.current;
      const { videoWidth, videoHeight } = video;
      // set canvas width and height 
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // draw mesh
      let obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  }
  React.useEffect(() => {
    cocossd.load().then((model) => {
      setInterval(() => {
        detect(model);
      }, 10);
    });

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h2>Object Recognition JS</h2>
        <Webcam
          className="border"
          ref={webcamRef}
          muted={true}
          style={{
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
