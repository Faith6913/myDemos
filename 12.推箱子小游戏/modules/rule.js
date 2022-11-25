import { content, correct, BOX } from "./map.js";
export const isGameOver = () => {
  let boxCount = 0;
  correct.forEach((obj) => {
    if (content[obj.row][obj.col] === BOX) {
      boxCount++;
    }
  });
  return boxCount === correct.length;
};
