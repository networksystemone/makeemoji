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

export default {
  colors: (ctx, img, i) => {
    const width = 100;
    const height = 100;
    const angle = (360 / frameCount) * i;
    const hdeg = 9 * angle;
    ctx.translate(width / 2, height / 2);
    ctx.drawImage(img, -width / 2, -height / 2);
    hueRotateFilter(ctx, hdeg);
    contrastFilter(ctx, contrast);
    saturateFilter(ctx, saturate);
  },
  spin: (ctx, img, i) => {
    const width = 100;
    const height = 100;
    const angle = (360 / frameCount) * i;
    const deg = (angle * Math.PI) / 180;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate(deg);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  },
  spinColors: (ctx, img, i) => {
    const width = 100;
    const height = 100;
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
  party: (ctx, img, i) => {
    const width = 100;
    const height = 100;
    const [x, y] = partyTranslations[i];
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(x, y);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  },
  partyColors: (ctx, img, i) => {
    const width = 100;
    const height = 100;
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
  shaking: (ctx, img, i) => {
    const width = 100;
    const height = 100;
    const [x, y] = shakingTranslations[i];
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.translate(x, y);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  },
  angry: (ctx, img, i) => {
    const width = 100;
    const height = 100;
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
  bounce: (ctx, img, i) => {
    translate(ctx, img, i, bounceTranslations);
  },
  popInOutBottom: (ctx, img, i) => {
    translate(ctx, img, i, popInOutBottomTranslations);
  },
  popInOutTop: (ctx, img, i) => {
    translate(ctx, img, i, popInOutTopTranslations);
  },
  popInOutLeft: (ctx, img, i) => {
    translate(ctx, img, i, popInOutLeftTranslations);
  },
  popInOutRight: (ctx, img, i) => {
    translate(ctx, img, i, popInOutRightTranslations);
  },
  flip: (ctx, img, i) => {
    const width = 100;
    const height = 100;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    if (i > 4) ctx.scale(-1, 1);
    ctx.drawImage(img, -width / 2, -height / 2);
    contrastFilter(ctx, contrast);
  }
};

function translate(ctx, img, i, translations) {
  const width = 100;
  const height = 100;
  const [x, y] = translations[i];
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  ctx.filter = `contrast(${contrast}%)`;
  ctx.translate(x, y);
  ctx.drawImage(img, -width / 2, -height / 2);
}
