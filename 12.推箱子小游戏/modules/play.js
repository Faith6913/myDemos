import * as Map from "./map.js";
import showUI, { isCorrectPos } from "./ui.js";
/**
 * 得到某一坐标的，指定方向上一下个的信息（第几行、第几列、内容）
 * @param {Number} row 行数
 * @param {Number} col 列数
 * @param {String} direction left、right、up、down
 * @return {Object} {row: xxx; col: xxx; value: xxx}
 */
const getNextInfo = (row, col, direction) => {
  let info = {};
  if (direction === "left") {
    info.row = row;
    // 排除最左边的情况
    if (col === 0) {
      info.col = col;
    }
    info.col = col - 1;
    info.value = Map.content[info.row][info.col];
  } else if (direction === "right") {
    info.row = row;
    // 排除最右边的情况
    if (col === Map.colNumber - 1) {
      info.col = col;
    }
    info.col = col + 1;
    info.value = Map.content[info.row][info.col];
  } else if (direction === "up") {
    info.col = col;
    // 排除最上边的情况
    if (row === 0) {
      info.row = row;
    }
    info.row = row - 1;
    info.value = Map.content[info.row][info.col];
  } else if (direction === "down") {
    info.col = col;
    // 排除最上边的情况
    if (row === Map.rowNumber - 1) {
      info.row = row;
    }
    info.row = row + 1;
    info.value = Map.content[info.row][info.col];
  }
  return info;
};

/**
 * 获取玩家的信息
 * @returns {Object} {row: xxx; col: xxx} 玩家信息
 */
const getPlayerInfo = () => {
  for (let row = 0; row < Map.rowNumber; row++) {
    for (let col = 0; col < Map.colNumber; col++) {
      if (Map.content[row][col] === Map.PLAYER) {
        return {
          row,
          col,
        };
      }
    }
  }
  throw new Error("地图上居然没有玩家");
};

const getTargetPoint = (playerPoint, boxPoint) => {
  const targetPoint = {};
  if (playerPoint.row === boxPoint.row) {
    targetPoint.row = playerPoint.row;
    targetPoint.col = boxPoint.col + (boxPoint.col - playerPoint.col);
  } else if (playerPoint.col === boxPoint.col) {
    targetPoint.col = playerPoint.col;
    targetPoint.row = boxPoint.row + (boxPoint.row - playerPoint.row);
  }
  return targetPoint;
};

/**
 * 用交换坐标函数实现移动效果
 * @param {Array} point1 需要交换的点的坐标
 * @param {Array} point2 需要交换的点的坐标
 */
const exchange = (point1, point2) => {
  let temp = Map.content[point1.row][point1.col];
  Map.content[point1.row][point1.col] = Map.content[point2.row][point2.col];
  Map.content[point2.row][point2.col] = temp;
};

const pushBox = (playerPoint, boxPoint) => {
  const targetPoint = getTargetPoint(playerPoint, boxPoint);
  if (
    (Map.content[targetPoint.row][targetPoint.col] === Map.BOX &&
      isCorrectPos(targetPoint.row, targetPoint.col)) ||
    Map.content[targetPoint.row][targetPoint.col] === Map.WALL
  ) {
    return;
  }
  exchange(boxPoint, targetPoint);
  exchange(boxPoint, playerPoint);
};

/**
 * 按照指定的方向，让玩家移动一步
 * @param {String} direction  left、right、up、down
 */
const playerMove = (direction) => {
  const playerPoint = getPlayerInfo();
  const nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);
  // 什么时候不能移动
  if (nextInfo.value === Map.WALL) {
    return;
  }
  // 能移动的时候
  if (nextInfo.value === Map.SPACE) {
    // 正常移动
    exchange(playerPoint, nextInfo);
    showUI();
  } else if (nextInfo.value === Map.BOX) {
    if (isCorrectPos(nextInfo.row, nextInfo.col)) {
      // 撞箱子了
      return;
    } else {
      pushBox(playerPoint, nextInfo);
      showUI();
    }
  }
  console.log(Map.content);
};

export { playerMove };
