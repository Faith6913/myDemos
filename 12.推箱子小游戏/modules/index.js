import showUI from "./ui.js";
import { playerMove } from "./play.js";
import { isGameOver } from "./rule.js";
showUI();
window.addEventListener("keypress", (e) => {
  if (e.key === "d") {
    playerMove("right");
  } else if (e.key === "a") {
    playerMove("left");
  } else if (e.key === "w") {
    playerMove("up");
  } else if (e.key === "s") {
    playerMove("down");
  }
  if (isGameOver()) {
    alert("游戏结束");
  }
});
