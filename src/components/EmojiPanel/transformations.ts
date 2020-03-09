import contrastFilter from "./filters/contrast";
import hueRotateFilter from "./filters/hueRotate";
import saturateFilter from "./filters/saturate";
import sepiaFilter from "./filters/sepia";
import {
  partyTranslations,
  shakingTranslations,
  bounceTranslations,
  popInOutBottomTranslations,
  popInOutTopTranslations,
  popInOutLeftTranslations,
  popInOutRightTranslations
} from "./translations";

const contrast = 120;
const saturate = 250;
const backgroundColor = "#ffffff";
const frameCount = 10;
const width = 100;
const height = 100;

type translation = [number, number];
const translate = (
  ctx: CanvasRenderingContext2D, 
  img: HTMLImageElement, 
  i: number, 
  translations: translation[]
) => {
  const [x, y] = translations[i];
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  ctx.filter = `contrast(${contrast}%)`;
  ctx.translate(x, y);
  ctx.drawImage(img, -width / 2, -height / 2);
};

export default {
  colors: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    const angle = (360 / frameCount) * i;
    const hdeg = 9 * angle;
    ctx.translate(width / 2, height / 2);
    ctx.drawImage(img, -width / 2, -height / 2);
    hueRotateFilter(ctx, hdeg);
    contrastFilter(ctx, contrast);
    saturateFilter(ctx, saturate);
  },
  spin: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    const angle = (360 / frameCount) * i;
    const deg = (angle * Math.PI) / 180;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate(deg);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  },
  spinColors: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    const angle = (360 / frameCount) * i;
    const deg = (angle * Math.PI) / 180;
    const hdeg = 9 * angle;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate(deg);
    ctx.drawImage(img, -width / 2, -height / 2);
    hueRotateFilter(ctx, hdeg);
    contrastFilter(ctx, contrast);
    saturateFilter(ctx, saturate);
  },
  party: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    const [x, y] = partyTranslations[i];
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(x, y);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  },
  partyColors: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    const angle = (360 / frameCount) * i;
    const hdeg = 9 * angle;
    const [x, y] = partyTranslations[i];
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(x, y);
    ctx.drawImage(img, -width / 2, -height / 2);
    hueRotateFilter(ctx, hdeg);
    contrastFilter(ctx, contrast);
    saturateFilter(ctx, saturate);
  },
  shaking: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    const [x, y] = shakingTranslations[i];
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(x, y);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  },
  angry: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    const [x, y] = shakingTranslations[i];
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(x, y);
    ctx.drawImage(img, -width / 2, -height / 2);
    sepiaFilter(ctx, 100);
    hueRotateFilter(ctx, 305);
    saturateFilter(ctx, saturate * 3);
    contrastFilter(ctx, contrast);
  },
  bounce: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    translate(ctx, img, i, bounceTranslations);
  },
  popInOutBottom: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    translate(ctx, img, i, popInOutBottomTranslations);
  },
  popInOutTop: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    translate(ctx, img, i, popInOutTopTranslations);
  },
  popInOutLeft: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    translate(ctx, img, i, popInOutLeftTranslations);
  },
  popInOutRight: (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    i: number
  ) => {
    translate(ctx, img, i, popInOutRightTranslations);
  },
  flip: (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    i: number
  ) => {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    if (i > 4) ctx.scale(-1, 1);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  }
};