import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import "./App.css";

const App = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 550,
      width: 400,
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

  const textBoxSample = (canvas) => {
    var textBoxSample = new fabric.Textbox("Write text here 😀", {
      width: 300,
      height: 150,
      fontSize: "35",
    });
    canvas.add(textBoxSample);
  };

  function Arial() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      fontFamily: "Arial, sans-serif",
    });
    canvas.add(selection);
  }

  function Helvetica() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      fontFamily: "Helvetica, sans-serif",
    });
    canvas.add(selection);
  }

  function Monospace() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      fontFamily: "Andale Mono, monospace",
    });
    canvas.add(selection);
  }

  function Courier() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      fontFamily: "Courier, monospace",
    });
    canvas.add(selection);
  }

  function Cursive() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      fontFamily: "Comic Sans MS, Comic Sans, cursive",
    });
    canvas.add(selection);
  }

  function bold() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      fontWeight: "bold",
    });
    canvas.add(selection);
  }

  function underline() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      underline: "true",
    });
    canvas.add(selection);
  }

  function italic() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      fontWeight: "italic",
    });
    canvas.add(selection);
  }

  function center() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      textAlign: "center",
    });
    canvas.add(selection);
  }

  function right() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      textAlign: "right",
    });
    canvas.add(selection);
  }

  function left() {
    var selection = canvas.getActiveObject(textBoxSample);
    selection.set({
      textAlign: "left",
    });
    canvas.add(selection);
  }

  var circle = new fabric.Circle({
    radius: 100,
    fill: "#eef",
    scaleY: 0.5,
    originX: "center",
    originY: "center",
  });

  var textTitle = new fabric.Textbox("hello world", {
    fontSize: 30,
    originX: "center",
    originY: "center",
  });

  const group = (canvi) => {
    var group = new fabric.Group([circle, textTitle], {
      left: 150,
      top: 100,
      angle: -10,
    });

    canvi.add(group);
  };

  var image = "./tortoise-on-white-background.jpg";

  const setImage = (canvi) => {
    fabric.Image.fromURL(image, function (img) {
      // img.filters.push(
      //   new fabric.Image.filters.RemoveColor({ threshold: 0.1 })
      // );
      // img.applyFilters();
      img.set({
        scaleX: 0.1,
        scaleY: 0.1,
        originX: 'center',
        originY: 'center',
        left: 100,
        top: 100,
        perPixelTargetFind: true,
      })
      canvi.add(img)
    });
  };

  function flipX() {
    var selection = canvas.getActiveObject(setImage);
    selection.set({
      flipX: true,
    });
    canvas.add(selection);
  }

  function flipY() {
    var selection = canvas.getActiveObject(setImage);
    selection.set({
      flipY: true,
    });
    canvas.add(selection);
  }

  function Sepia() {
    var filter = new fabric.Image.filters.Sepia();
    canvas.getActiveObject().filters.push(filter);
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }

  function removeBackground() {
    var filter = new fabric.Image.filters.RemoveColor({
      threshold: 3,
    });
    canvas.getActiveObject().filters.push(filter);
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }

  function Sepia() {
    var filter = new fabric.Image.filters.Sepia();
    canvas.getActiveObject().filters.push(filter);
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }

  function Grayscale() {
    var filter = new fabric.Image.filters.Grayscale();
    canvas.getActiveObject().filters.push(filter);
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }

  function Brownie() {
    var filter = new fabric.Image.filters.Brownie();
    canvas.getActiveObject().filters.push(filter);
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }

  function BlackWhite() {
    var filter = new fabric.Image.filters.BlackWhite();
    canvas.getActiveObject().filters.push(filter);
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }

  const arrow = (canvi) => {
    const arrow = new fabric.Path(
      "M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
    c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
    0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
    c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
    -2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
    12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
    -20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z"
    );
    arrow.set({
      left: 100,
      top: 200,
    });
    canvi.add(arrow);
  };

  function yellow() {
    var selection = canvas.getActiveObject(arrow);
    selection.set({
      fill: "yellow",
    });
    canvas.add(selection);
  }

  function red() {
    var selection = canvas.getActiveObject(arrow);
    selection.set({
      fill: "red",
    });
    canvas.add(selection);
  }

  function green() {
    var selection = canvas.getActiveObject(arrow);
    selection.set({
      fill: "green",
    });
    canvas.add(selection);
  }

  function gray() {
    var selection = canvas.getActiveObject(arrow);
    selection.set({
      fill: "gray",
    });
    canvas.add(selection);
  }

  const clipPath = (canvas) => {
    var clipPath = new fabric.Circle({
      radius: 100,
      top: 10,
      left: 10,
      originX: "center",
      originY: "center",
    });
    fabric.Image.fromURL("./ICON-01-01.svg", function (oImg) {
      oImg.clipPath = clipPath;
      canvas.add(oImg);
      oImg.scaleToHeight(500);
      oImg.scaleToWidth(500);
    });
    canvas.renderAll();
  };

  const clear = () => {
    canvas.clear();
  };

  return (
    <div className="App">
      <h1 className="my-4">Fabric.js Example</h1>
      <div className="d-flex justify-content-center align-items-center">
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
        >
          <option selected>Select Shapes</option>
          <option onClick={() => addRect(canvas)}>Rectangle</option>
          <option onClick={() => addCircle(canvas)}>Circle</option>
          <option onClick={() => addTriangle(canvas)}>Triangle</option>
          <option onClick={() => heart(canvas)}>Heart</option>
          <option onClick={() => group(canvas)}>Group Shape</option>
        </select>
        &nbsp;
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
        >
          <option selected>Select Images</option>
          <option onClick={() => setImage(canvas)}>Image</option>
          <option onClick={() => arrow(canvas)}>Add SVG</option>
          <option onClick={() => clipPath(canvas)}>ClipPath Image</option>
        </select>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => textBoxSample(canvas)}
        >
          Text
        </button>
        &nbsp;
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
        >
          <option selected>Select Font-weight</option>
          <option onClick={() => bold(canvas)}>Bold</option>
          <option onClick={() => underline(canvas)}>Underline</option>
          <option onClick={() => italic(canvas)}>Italic</option>
        </select>
        &nbsp;
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
        >
          <option selected>Select Text-Align</option>
          <option onClick={() => center(canvas)}>Center</option>
          <option onClick={() => left(canvas)}>Left</option>
          <option onClick={() => right(canvas)}>Right</option>
        </select>
        &nbsp;
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
        >
          <option selected>Select Font-Family</option>
          <option onClick={() => Arial(canvas)}>Arial</option>
          <option onClick={() => Monospace(canvas)}>Monospace</option>
          <option onClick={() => Courier(canvas)}>Courier</option>
          <option onClick={() => Cursive(canvas)}>Cursive</option>
          <option onClick={() => Helvetica(canvas)}>Helvetica</option>
        </select>
      </div>

      <div className="d-flex justify-content-center align-items-center my-3">
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option selected>Select Color for SVG</option>
          <option onClick={() => yellow(canvas)}>Yellow</option>
          <option onClick={() => red(canvas)}>Red</option>
          <option onClick={() => green(canvas)}>Green</option>
          <option onClick={() => gray(canvas)}>Gray</option>
        </select>
        &nbsp;
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option selected>Select Filters for Image</option>
          <option onClick={() => removeBackground(canvas)}>
            Remove Background
          </option>
          <option onClick={() => Sepia(canvas)}>Sepia</option>
          <option onClick={() => Grayscale(canvas)}>Grayscale</option>
          <option onClick={() => Brownie(canvas)}>Brownie</option>
          <option onClick={() => BlackWhite(canvas)}>BlackWhite</option>
          <option onClick={() => flipX(canvas)}>flipX</option>
          <option onClick={() => flipY(canvas)}>flipY</option>
        </select>
        &nbsp;
        <button
          className="btn btn-info btn-sm text-white"
          onClick={() => clear(canvas)}
        >
          clear
        </button>
      </div>

      <div id="tshirt-div">
        <img
          src="https://media.istockphoto.com/photos/men-cut-white-tshirt-isolated-on-white-background-picture-id1142213046?k=6&m=1142213046&s=612x612&w=0&h=h4C2cEfyYROEOK92ZqooAMFKt6FHIKKsdVC3d8_ED3s="
          alt="image"
          className="image"
        />
        <div className="drawing-area">
          <div className="canvas canvas-container">
            <canvas id="canvas" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
