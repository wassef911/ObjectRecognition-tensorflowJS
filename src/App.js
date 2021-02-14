import React from "react"
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

function App() {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const cocoSSD = async () => {
    const model = await cocossd.load();
    setInterval(() => {
      detect(model);
    }, 10);
  }
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState == 4
    ) {
      // get video props 
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // set viddeo width and height 
      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;
      // set canvas width and height 
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // draw mesh
      let obj = await net.detect(video);
      console.log(obj);
      const ctx = canvasRef.current.getContext("2d");

    }
  }
  React.useEffect(() => cocoSSD(), [])
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
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
