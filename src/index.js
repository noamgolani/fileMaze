import path from "path";
import fs from "fs";

function runMaze(rootRoomPath) {
  /**
   * Replace me
   */
}

function readMazeRoom(roomPath, callback) {
  /**
   * Reaplace me
   */
}

function openChest(chestPath, callback) {
  /**
   * Replace me
   */
}

function runMazeSync(rootRoomPath) {
  /**
   * Replace me
   */
}

function readMazeRoomSync(roomPath) {
  /**
   * Replace me
   */
}

function openChestSync(chestPath) {
  /**
   * Replace me
   */
}

switch (process.argv[2]) {
  case "sync":
    runMazeSync("./maze");
    break;
  case "callback":
    runMaze("./maze");
    break;
  default:
    console.log(
      "please choose between: 'sync' and 'callback' \n\tnode mazeRunner.js [type]"
    );
}
