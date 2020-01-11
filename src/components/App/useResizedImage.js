import { useState, useEffect } from "react";

const SIZE = 100;
const backgroundColor = "#ffffff";

const useResizedImage = src => {
  const [resizedImage, setResizedImage] = useState(null);
  useEffect(() => {
    if (src) {
      const resizer = createResizer(document.createElement("canvas"));
      resizer(src, SIZE, SIZE, dataURL => {
        setResizedImage(dataURL);
      });
    } else {
      setResizedImage(null);
    }
  }, [src]);
  return resizedImage;
};
export default useResizedImage;

function createResizer(canvas) {
  return function(imgsrc, width, height, callback) {
    let img;
    let imgsrcstr = "string" === typeof imgsrc;
    if (imgsrcstr) {
      img = new Image();
      img.src = imgsrc;
      img.onload = onLoad;
    } else {
      img = imgsrc;
    }
    img._callback = callback;
    img._width = width;
    img._height = height;
    img._type = "png";
    if (!imgsrcstr) {
      onLoad.call(imgsrc);
    } // imgsrc has img's props
  };
  function onLoad() {
    const img = this;
    img._width == null &&
      (img._width = Math.round((img.width * img._height) / img.height));
    img._height == null &&
      (img._height = Math.round((img.height * img._width) / img.width));
    canvas.width = img._width;
    canvas.height = img._height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0, // starting
      img.width,
      img.height, // image
      0,
      0, // destination
      img._width,
      img._height // destination
    );
    img._callback(canvas.toDataURL("image/" + img._type));
    delete img._callback;
    delete img._width;
    delete img._height;
    delete img._type;
  }
}
