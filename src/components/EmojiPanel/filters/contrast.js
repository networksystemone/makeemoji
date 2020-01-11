import { normalizeNumberPercentage } from "./utils";

export default (context, amount = "1") => {
  amount = normalizeNumberPercentage(amount);
  if (amount === 1) return context;
  if (amount < 0) amount = 0;

  const { height, width } = context.canvas;
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const { length } = data;
  // in rgba world, every
  // n * 4 + 0 is red,
  // n * 4 + 1 green and
  // n * 4 + 2 is blue
  // the fourth can be skipped as it's the alpha channel
  // https://gist.github.com/jonathantneal/2053866
  for (let i = 0; i < length; i += 4) {
    data[i + 0] = ((data[i + 0] / 255 - 0.5) * amount + 0.5) * 255;
    data[i + 1] = ((data[i + 1] / 255 - 0.5) * amount + 0.5) * 255;
    data[i + 2] = ((data[i + 2] / 255 - 0.5) * amount + 0.5) * 255;
  }

  context.putImageData(imageData, 0, 0);
  return context;
};
