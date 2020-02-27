import React, { useState, useEffect } from "react";
import gifshot from "gifshot";
import transformations from "./transformations";
import { Panel, Image, Name } from "./styled";
import { blank } from "../App";

const WIDTH = 100;
const HEIGHT = 100;

const transform = async (
  image50: string, 
  transformation: string, 
  i: number
) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    img.onload = () => {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      transformations[transformation](ctx, img, i);
      resolve(canvas.toDataURL("image/png"));
      if (img.parentNode) img.parentNode.removeChild(img);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
    if (image50) img.src = image50;
  });
};

const downloadUri = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface EmojiPanelProps {
  img: string;
  transformation: string;
  name: string;
  interval: number;
  frameCount?: number;
}
const EmojiPanel = ({
  img,
  transformation,
  name,
  interval,
  frameCount = 10
}: EmojiPanelProps) => {
  const [gif, setGif] = useState(blank);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGif(blank);
    setLoading(true);
    (async () => {
      const framesArray = [...Array(frameCount)].fill(null);
      const imagePromises = framesArray.map(async (_, i) => {
        return await transform(img, transformation, i);
      });
      const images = await Promise.all(imagePromises);
      const opts = {
        images,
        gifWidth: WIDTH,
        gifHeight: HEIGHT,
        frameDuration: 1,
        interval
      };
      gifshot.createGIF(opts, ({ error, image: nextGif }) => {
        if (!error) {
          setGif(nextGif);
          setLoading(false);
        }
      });
    })();
  }, [img]);

  const isClickable = gif !== blank;

  const handleClick = () => {
    if (isClickable) {
      downloadUri(gif, name);
    }
  };

  return (
    <Panel onClick={handleClick} clickable={isClickable}>
      <Image
        src={gif}
        loading={loading}
        alt={`The generated ${name} animated emoji`}
      />
      <Name>:{name}:</Name>
    </Panel>
  );
};

export default EmojiPanel;