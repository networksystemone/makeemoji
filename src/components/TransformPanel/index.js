import React, { useState, useEffect } from "react";
import runFrameTransformations from "../../runFrameTransformations";
import gifshot from "gifshot";

const SIZE = 100;

const opts = {
  gifWidth: SIZE,
  gifHeight: SIZE
};

const TransformPanel = ({ img, transformation }) => {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    if (img) {
      (async () => {
        setGif(null);
        const images = await runFrameTransformations(img, transformation);
        gifshot.createGIF({ images, ...opts }, ({ image, error }) => {
          if (!error) {
            setGif(image);
          }
        });
      })();
    }
  }, [img]);

  return (
    <div>
      {!gif && ""}
      <img src={gif} />
    </div>
  );
};

export default TransformPanel;
