import React, { useState, useEffect } from "react";
import gifshot from "gifshot";
import transformations from "./transformations";
import { Panel, Image, Name } from "./styled";
import { blank } from "../App";

const width = 100;
const height = 100;
const emojis = 14;

const EmojiPanel = ({
  img,
  transformation = "rotate",
  name = "",
  interval = 0.1,
  frameCount = 10
}) => {
  const [gif, setGif] = useState(blank);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setGif(blank);
    setLoading("string");
    (async () => {
      const framesArray = [...Array(frameCount)].fill(null);
      const imagePromises = framesArray.map(async (_, i) => {
        return await transform(img, transformation, i);
      });
      const images = await Promise.all(imagePromises);
      const opts = {
        images,
        gifWidth: width,
        gifHeight: height,
        frameDuration: 1,
        interval
      };
      gifshot.createGIF(opts, ({ error, image: nextGif }) => {
        if (!error) {
          setGif(nextGif);
          setLoading(null);
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
        data-emoji={name}
        alt={`The generated ${name} animated emoji`}
      />
      <Name>:{name}:</Name>
    </Panel>
  );
};

export default EmojiPanel;

function createElements() {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return { img, canvas };
}

async function transform(image50, transformation, i) {
  return new Promise((resolve, reject) => {
    const { img, canvas } = createElements();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      transformations[transformation](ctx, img, i);
      resolve(canvas.toDataURL("image/png"));
      if (img.parentNode) img.parentNode.removeChild(img);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
    if (image50) {
      img.src = image50;
    }
  });
}

function downloadUri(uri, name) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
