type translation = [number, number];

export const partyTranslations: translation[] = [
  [0, 10],
  [10, 8],
  [15, 3],
  [10, -3],
  [3, -8],
  [0, -10],
  [-3, -8],
  [-10, -3],
  [-15, 0],
  [-8, 8]
];

export const shakingTranslations: translation[] = [
  [6, 0],
  [4, 0],
  [-2, 0],
  [4, 0],
  [6, 0],
  [2, 0],
  [-2, 0],
  [-6, 0],
  [0, 0],
  [2, 0]
];

export const bounceTranslations: translation[] = [
  [0, 6],
  [0, 4],
  [0, -2],
  [0, 4],
  [0, 6],
  [0, 2],
  [0, -2],
  [0, -6],
  [0, 0],
  [0, 2]
];

export const popInOutBottomTranslations: translation[] = [
  [0, 100],
  [0, 66],
  [0, 33],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 33],
  [0, 66],
  [0, 100]
];

export const popInOutTopTranslations: translation[] = [
  [0, -100],
  [0, -66],
  [0, -33],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, -33],
  [0, -66],
  [0, -100]
];

export const popInOutLeftTranslations: translation[] = [
  [100, 0],
  [66, 0],
  [33, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [33, 0],
  [66, 0],
  [100, 0]
];

export const popInOutRightTranslations: translation[] = [
  [-100, 0],
  [-66, 0],
  [-33, 0],
  [-0, 0],
  [-0, 0],
  [-0, 0],
  [-0, 0],
  [-33, 0],
  [-66, 0],
  [-100, 0]
];
