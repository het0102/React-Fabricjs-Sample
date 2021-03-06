import "./App.css";
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

function App() {
  const [canvas, setCanvas] = useState("");

  var image = "./tortoise-on-white-background.jpg";
  var image1 = "./2.jpg";
  var image2 = "./1.jpg";

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 500,
      width: 275,
    });

  const download = () => {
    var canvas = document.getElementById("canvas");
    image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    var link = document.createElement("a");
    link.download = "my-image.png";
    link.href = image;
    link.click();
  };

  const downloadJson = () => {
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);

    var file = new Blob([string], {
      type: "application/json",
    });

    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "image.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  function DownloadSvg() {
    var filedata = canvas.toSVG();
    var locfile = new Blob([filedata], { type: "image/svg+xml;charset=utf-8" });
    var locfilesrc = URL.createObjectURL(locfile);
    var link = document.createElement("a");
    link.download = "canvas.svg";
    link.href = locfilesrc;
    link.click();
    return link;
  }

  function loadFile() {
    document.querySelector(".adding").onchange = function handleImage(e) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
          var image = new fabric.Image(imgObj);
          image
            .set({
              left: 10,
              top: 10,
            })
            .scale(0.5);
          canvas.add(image);
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    };
  }

  const selectAllObjects = () => {
    const elem = document.querySelector(".SelectAllObjects");
    elem.addEventListener("click", () => {
      canvas.discardActiveObject();
      let selectedObjects = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
      });
      canvas.setActiveObject(selectedObjects);
      canvas.requestRenderAll();
    });
  };

  const discardAllObjects = () => {
    const elem = document.querySelector("#DiscardAllObjects");
    elem.addEventListener("click", function () {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    });
  };

  const selectAllCircles = () => {
    const elem = document.querySelector("#SelectAllCircleObjects");
    elem.addEventListener("click", function () {
      canvas.discardActiveObject();
      let selectedObjects = new fabric.ActiveSelection(
        canvas.getObjects().filter((obj) => obj.type === "circle"),
        {
          canvas: canvas,
        }
      );

      canvas.setActiveObject(selectedObjects);
      canvas.requestRenderAll();
    });
  };

  const groupAllSelect = () => {
    const elem = document.querySelector("#GroupSelectedObjects");
    elem.addEventListener("click", function () {
      if (!canvas.getActiveObject()) {
        return;
      }
      if (!canvas.getActiveObject().type === "activeSelection") {
        return;
      }
      canvas.getActiveObject().toGroup();
      canvas.requestRenderAll();
    });
  };

  const unGroupAllSelect = () => {
    const elem = document.querySelector("#UnGroupObjects");
    elem.addEventListener("click", function () {
      if (!canvas.getActiveObject()) {
        return;
      }
      if (!canvas.getActiveObject().type === "group") {
        return;
      }
      canvas.getActiveObject().toActiveSelection();
      canvas.requestRenderAll();
    });
  };

  const backGroundImage = () => {
    fabric.Image.fromURL(image1, function (img) {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        width: 275,
      });
    });
  };

  function redColor() {
    canvas.getActiveObject(canvas);
    canvas.setBackgroundColor("red", canvas.renderAll.bind(canvas));
  }

  function blueColor() {
    canvas.getActiveObject(canvas);
    canvas.setBackgroundColor("blue", canvas.renderAll.bind(canvas));
  }

  function blackColor() {
    canvas.getActiveObject(canvas);
    canvas.setBackgroundColor("black", canvas.renderAll.bind(canvas));
  }

  const overlayImage = () => {
    canvas.setOverlayImage(image1, canvas.renderAll.bind(canvas), {
      width: 275,
      opacity: 0.3,
    });
  };

  const overlayColor = () => {
    canvas.setOverlayColor("blue", canvas.renderAll.bind(canvas), {
      opacity: 0.5,
    });
  };

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
    var textBoxSample = new fabric.Textbox("Write text here ????", {
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

  // var circle = new fabric.Circle({
  //   radius: 100,
  //   fill: "#eef",
  //   scaleY: 0.5,
  //   originX: "center",
  //   originY: "center",
  // });

  // var textTitle = new fabric.Textbox("hello world", {
  //   fontSize: 30,
  //   originX: "center",
  //   originY: "center",
  // });

  // const group = (canvi) => {
  //   var group = new fabric.Group([circle, textTitle], {
  //     left: 150,
  //     top: 100,
  //     angle: -10,
  //   });

  //   canvi.add(group);
  // };

  const setImage = (canvi) => {
    fabric.Image.fromURL(image, function (img) {
      // img.filters.push(
      //   new fabric.Image.filters.RemoveColor({ threshold: 0.1 })
      // );
      // img.applyFilters();
      img.set({
        scaleX: 0.1,
        scaleY: 0.1,
        originX: "center",
        originY: "center",
        left: 100,
        top: 100,
        perPixelTargetFind: true,
      });
      canvi.add(img);
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

  function rectangle() {
    var rect1 = new fabric.Rect({
      left: 10,
      top: 10,
      fill: "red",
      lockMovementX: true,
      lockMovementY: true,
      width: 100,
      height: 100,
    });
    canvas.add(rect1);

    var rect2 = new fabric.Rect({
      left: 150,
      top: 10,
      fill: "green",
      lockMovementX: true,
      lockMovementY: true,
      width: 100,
      height: 100,
    });

    canvas.add(rect2);

    var rect3 = new fabric.Rect({
      left: 10,
      top: 150,
      fill: "blue",
      width: 100,
      height: 100,
    });

    canvas.add(rect3);

    var rect4 = new fabric.Rect({
      left: 150,
      top: 150,
      fill: "orange",
      width: 100,
      height: 100,
    });

    canvas.add(rect4);

    rect1.on("selected", function (event) {
      fabric.Image.fromURL(image1, (img1) => {
        img1.set({
          left: rect1.left,
          top: rect1.top,
          width: rect1.width,
          height: rect1.height,
        });
        canvas.add(img1);
      });
      canvas.requestRenderAll();
    });
    rect2.on("selected", function (event) {
      fabric.Image.fromURL(image1, (img2) => {
        img2.set({
          left: rect2.left,
          top: rect2.top,
          width: rect2.width,
          height: rect2.height,
        });
        canvas.add(img2);
      });
      canvas.requestRenderAll();
    });
    rect3.on("selected", function (event) {
      fabric.Image.fromURL(image2, (img2) => {
        img2.set({
          left: rect3.left,
          top: rect3.top,
          width: rect3.width,
          height: rect3.height,
        });
        canvas.add(img2);
      });
      canvas.requestRenderAll();
    });
    rect4.on("selected", function (event) {
      fabric.Image.fromURL(image2, (img2) => {
        img2.set({
          left: rect4.left,
          top: rect4.top,
          width: rect4.width,
          height: rect4.height,
        });
        canvas.add(img2);
      });
      canvas.requestRenderAll();
    });
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">Fabric.js Example</h1>

      <div className="row">
        <div className="col-md-6 d-grid align-items-center justify-content-center my-3">
          <select
            class="form-select form-select-sm mb-2"
            aria-label="Default select example"
          >
            <option selected>Select Shapes</option>
            <option onClick={() => addRect(canvas)}>Rectangle</option>
            <option onClick={() => addCircle(canvas)}>Circle</option>
            <option onClick={() => addTriangle(canvas)}>Triangle</option>
            <option onClick={() => heart(canvas)}>Heart</option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            aria-label="Default select example"
          >
            <option selected>Select Images</option>
            <option onClick={() => setImage(canvas)}>Image</option>
            <option onClick={() => arrow(canvas)}>Add SVG</option>
            <option onClick={() => clipPath(canvas)}>ClipPath Image</option>
          </select>

          <button
            className="btn btn-secondary btn-sm mb-2"
            onClick={() => textBoxSample(canvas)}
          >
            Text
          </button>
          <select
            class="form-select form-select-sm mb-2"
            aria-label="Default select example"
          >
            <option selected>Select Font-weight</option>
            <option onClick={() => bold(canvas)}>Bold</option>
            <option onClick={() => underline(canvas)}>Underline</option>
            <option onClick={() => italic(canvas)}>Italic</option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            aria-label="Default select example"
          >
            <option selected>Select Text-Align</option>
            <option onClick={() => center(canvas)}>Center</option>
            <option onClick={() => left(canvas)}>Left</option>
            <option onClick={() => right(canvas)}>Right</option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            aria-label="Default select example"
          >
            <option selected>Select Font-Family</option>
            <option onClick={() => Arial(canvas)}>Arial</option>
            <option onClick={() => Monospace(canvas)}>Monospace</option>
            <option onClick={() => Courier(canvas)}>Courier</option>
            <option onClick={() => Cursive(canvas)}>Cursive</option>
            <option onClick={() => Helvetica(canvas)}>Helvetica</option>
          </select>

          <select
            class="form-select form-select-sm mb-2"
            aria-label=".form-select-sm example"
          >
            <option selected>Select Color for SVG</option>
            <option onClick={() => yellow(canvas)}>Yellow</option>
            <option onClick={() => red(canvas)}>Red</option>
            <option onClick={() => green(canvas)}>Green</option>
            <option onClick={() => gray(canvas)}>Gray</option>
          </select>

          <select
            class="form-select form-select-sm mb-2"
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

          <button
            className="btn btn-info btn-sm text-white SelectAllObjects mb-2"
            onClick={() => selectAllObjects(canvas)}
          >
            SelectAllObjects
          </button>

          <button
            className="btn btn-info btn-sm text-white mb-2"
            onClick={() => discardAllObjects(canvas)}
            id="DiscardAllObjects"
          >
            DiscardAllObjects
          </button>

          <button
            className="btn btn-info btn-sm text-white mb-2"
            id="SelectAllCircleObjects"
            onClick={() => selectAllCircles(canvas)}
          >
            SelectAllCircle
          </button>

          <button
            onClick={() => groupAllSelect(canvas)}
            className="btn btn-info btn-sm text-white mb-2"
            id="GroupSelectedObjects"
          >
            GroupSelectedObjects
          </button>

          <button
            onClick={() => unGroupAllSelect(canvas)}
            className="btn btn-info btn-sm text-white mb-2"
            id="UnGroupObjects"
          >
            UnGroupObjects
          </button>

          <button
            onClick={() => backGroundImage(canvas)}
            className="btn btn-info btn-sm text-white mb-2"
          >
            SetBackgroundImage
          </button>

          <select
            class="form-select form-select-sm mb-2"
            aria-label="Default select example"
          >
            <option selected>Select Background-Color for canvas</option>
            <option onClick={() => redColor(canvas)}>red</option>
            <option onClick={() => blueColor(canvas)}>blue</option>
            <option onClick={() => blackColor(canvas)}>black</option>
          </select>

          <button
            onClick={() => overlayImage(canvas)}
            className="btn btn-info btn-sm mb-2 text-white"
          >
            SetOverlayImage
          </button>

          <button
            onClick={() => overlayColor(canvas)}
            className="btn btn-info btn-sm mb-2 text-white"
          >
            SetOverlayColor
          </button>

          <button
            className="btn btn-danger btn-sm mb-2"
            onClick={() => clear(canvas)}
          >
            clear
          </button>

          <button
            className="btn btn-outline-warning btn-sm mb-2"
            onClick={() => download(canvas)}
          >
            Download PNG file
          </button>

          <button
            className="btn btn-outline-warning btn-sm mb-2"
            onClick={() => downloadJson(canvas)}
          >
            Download JSON file
          </button>

          <button
            className="btn btn-outline-warning btn-sm mb-2"
            onClick={() => DownloadSvg(canvas)}
          >
            Download Svg file
          </button>

          <button
            className="btn btn-outline-warning btn-sm mb-2"
            onClick={() => rectangle(canvas)}
          >
            4-Rectangle
          </button>

          <input
            className="mb-2 adding"
            type="file"
            onClick={() => loadFile(canvas)}
          />
        </div>

        <div className="col-md-6 d-flex justify-content-center my-3 wallpaper">
          <div>
            <canvas className="canvas" id="canvas" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
