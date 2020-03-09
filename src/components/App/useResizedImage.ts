import { useState, useEffect } from "react";

const SIZE: number = 100;
const backgroundColor: string = "#ffffff";

const createResizer = (canvas: HTMLCanvasElement) => {
  return (
    imgsrc: string, 
    width: number, 
    height: number, 
    callback: Function
  ) => {
    let img = new Image();
    img.src = imgsrc;
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage( img, 0, 0, img.width, img.height, 0, 0, width, height);
      callback(canvas.toDataURL("image/png"));
    };
  };
};

const useResizedImage = (src: string) => {
  const [resizedImage, setResizedImage] = useState('');
  
  const passResized = (dataURL: string) => {
    setResizedImage(dataURL);
  };
  
  useEffect(() => {
    if (src) {
      const resizer = createResizer(document.createElement("canvas"));
      resizer(src, SIZE, SIZE, passResized);
    } else {
      setResizedImage('');
    }
  }, [src]);

  return resizedImage;
};

export default useResizedImage;