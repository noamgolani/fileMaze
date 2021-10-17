/* eslint-disable consistent-return */
import fs from 'fs';
import path from 'path';

function openChest(chestPath, callback) {
  fs.readFile(chestPath, (err, content) => {
    if (err) return callback(new Error(`Cant open chest: ${chestPath}`));
    console.log(`Opening chest: ${chestPath}`);
    try {
      const jsonContent = JSON.parse(content);
      if (jsonContent.treasure) return callback(null, 'found');
      if (jsonContent.next) return callback(null, jsonContent.next);
      return callback(null, null);
    } catch {
      return callback(new Error(`Cant open chest: ${chestPath}`));
    }
  });
}

function readMazeRoom(roomPath, callback) {
  fs.readdir(roomPath, (err, files) => {
    if (err) {
      return callback(new Error(`Cant find the door to room: ${roomPath}`));
    }

    const items = files;
    while (items.length > 0) {
      const item = items.pop();
      const itemPath = path.join(roomPath, item);

      fs.lstat(itemPath, (e, stat) => {
        if (!e && stat.isFile()) {
          openChest(itemPath, (error, chestContent) => {
            if (error) return callback(error);
            if (chestContent === 'found') return callback(null, itemPath);
            if (chestContent) {
              console.log(`Going to room: ${chestContent}`);
              readMazeRoom(chestContent, callback);
            }
          });
        }
      });
    }
  });
}

export default function runMaze(root) {
  console.log('--- Running Async ---');
  readMazeRoom(root, (err, result) => {
    if (err) console.log(`\x1b[31m${err.message}\x1b[0m`);
    else console.log(`\x1b[32mFound: ${result}\x1b[0m`);
  });
}
