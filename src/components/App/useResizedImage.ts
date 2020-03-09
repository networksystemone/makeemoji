import { useState, useEffect } from "react";

const SIZE = 100;
const backgroundColor = "#ffffff";

const useResizedImage = (src: string) => {
  const [resizedImage, setResizedImage] = useState("");

  useEffect(() => {
    if (!src) {
      setResizedImage("");
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, SIZE, SIZE);
      const dataUrl = canvas.toDataURL("image/png");
      setResizedImage(dataUrl);
    };
    img.src = src;
  }, [src]);

  return resizedImage;
};

export default useResizedImage;
