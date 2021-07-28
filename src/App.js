import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./App.css";

const App = () => {
  const { editor, onReady } = useFabricJSEditor();
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const onAddCircle = () => {
    editor.addCircle();
  };

  const onAddRectangle = () => {
    editor.addRectangle();
  };

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 500,
      width: 500,
      backgroundColor: "pink",
    });

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "yellow",
      width: 100,
      height: 100,
      angle: 45,
      transparentCorners: false,
      cornerColor: "blue",
      cornerStrokeColor: "red",
      borderColor: "red",
      cornerSize: 12,
      padding: 10,
      cornerStyle: "circle",
      borderDashArray: [3, 3],
      //lockMovementX : true,
      //lockMovementY : true,
      //lockRotation: true
    });
    canvi.add(rect);
    canvi.renderAll();
  };

  const addCircle = (canvi) => {
    const circle = new fabric.Circle({
      height: 200,
      width: 200,
      left: 100,
      top: 100,
      radius: 50,
      fill: "green",
    });
    canvi.add(circle);
  };

  const addTriangle = (canvi) => {
    const triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      left: 200,
      top: 150,
      angle: 0,
      fill: "violet",
      selectable: true,
      stroke: "black",
      strokeWidth: 5,
    });
    canvi.add(triangle);
  };

  const heart = (canvi) => {
    const heart = new fabric.Path(
      "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
    );

    heart.set({
      originX: "center",
      originY: "center",
      selectable: true,
      evented: true,
      left: 125,
      top: 100,
      scaleX: 0.3,
      scaleY: 0.3,
      angle: 225,
      stroke: "red",
      strokeWidth: 10,
      fill: "red",
    });
    canvi.add(heart);
  };

  const text = (canvi) => {
    const text = new fabric.Text("Honey,\nI'm here", {
      fontSize: 150,
      left: 0,
      top: 0,
      lineHeight: 1,
      originX: "left",
      fontFamily: "Helvetica",
      fontWeight: "bold",
      statefullCache: true,
      scaleX: 0.4,
      scaleY: 0.4,
    });
    canvi.add(text);
  };

  return (
    <div className="App">
      <h1>Fabric.js Example</h1>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <button onClick={() => addCircle(canvas)}>Circle</button>
      <button onClick={() => addTriangle(canvas)}>Triangle</button>
      <button onClick={() => heart(canvas)}>Heart</button>
      <button onClick={() => text(canvas)}>Text</button>
      <div className="canvas title">
        <canvas id="canvas" />
      </div>
      <h1 className="title">Fabric.js - React Example</h1>
      <button onClick={onAddCircle}>Circle</button>
      <button onClick={onAddRectangle}>Rectangle</button>
      <div className="canvas">
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </div>
  );
};

export default App;
