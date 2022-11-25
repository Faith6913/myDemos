// 该模块用于将地图显示到页面上
import * as map from "./map.js";
const divContainer = document.getElementById("game");
const pieceWidth = 45; // 每一个小块的宽度
const pieceHeight = 45; // 每一个小块的高度

/**
 * 设置game容器的宽高
 */
const setDivContainer = () => {
  divContainer.style.width = pieceWidth * map.colNumber + "px";
  divContainer.style.height = pieceHeight * map.rowNumber + "px";
};

/**
 * 根据列数和行数判断箱子是否在正确位置
 * @param {Number} row 行数
 * @param {Number} col 列数
 */
const isCorrectPos = (row, col) => {
  for (let i = 0; i < map.correct.length; i++) {
    if (map.correct[i].row === row && map.correct[i].col === col) {
      return true;
    }
  }
  return false;
};

/**
 * 根据行和列，生成对应的div加入到容器中
 * @param {Number} row
 * @param {Number} col
 */
const setOnePiece = (row, col) => {
  const value = map.content[row][col];
  const div = document.createElement("div");
  div.style.top = `${45 * row}px`;
  div.style.left = `${45 * col}px`;
  div.classList.add("item");
  if (value === map.PLAYER) {
    div.classList.add("player");
  } else if (value === map.BOX) {
    if (isCorrectPos(row, col)) {
      div.classList.add("correct-box");
    } else {
      div.classList.add("box");
    }
  } else if (value === map.WALL) {
    div.classList.add("wall");
  } else {
    // 空白
    if (isCorrectPos(row, col)) {
      div.classList.add("correct");
    } else {
      return;
    }
  }
  divContainer.appendChild(div);
};

/**
 * 展示页面内容的函数
 */
const setContent = () => {
  // 1. 清空容器内部元素
  divContainer.innerHTML = "";
  // 2. 根据地图将元素加入到容器当中
  map.content.forEach((row, i) => {
    row.forEach((col, j) => {
      setOnePiece(i, j);
    });
  });
};

/**
 * 该函数用于显示地图
 */
export default () => {
  // 1. 设置div的宽高
  setDivContainer();
  // 2. 显示地图中的内容
  setContent();
};
export { isCorrectPos };
