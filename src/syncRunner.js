/* eslint-disable consistent-return */
import fs from 'fs';
import path from 'path';

function openChestSync(chestPath) {
  try {
    console.log(`Opening chest: ${chestPath}`);
    const content = fs.readFileSync(chestPath);
    const jsonContent = JSON.parse(content);
    if (jsonContent.treasure) return 'found';
    if (jsonContent.next) return jsonContent.next;
    return null;
  } catch (err) {
    throw new Error(`Cant open chest: ${chestPath}`);
  }
}

function readMazeRoomSync(roomPath) {
  try {
    const items = fs.readdirSync(roomPath);
    while (items.length > 0) {
      const item = items.pop();
      const itemPath = path.join(roomPath, item);
      const stat = fs.lstatSync(itemPath);
      if (stat.isFile()) {
        try {
          const chestContent = openChestSync(itemPath);
          if (chestContent === 'found') return itemPath;
          if (chestContent) {
            console.log(`Going to room: ${chestContent}`);
            try {
              return readMazeRoomSync(chestContent);
            } catch (err) {
              console.log(`\x1b[31m${err.message}\x1b[0m`);
            }
          }
        } catch (err) {
          console.log(`\x1b[31m${err.message}\x1b[0m`);
        }
      }
    }
  } catch (err) {
    throw new Error(`Cant find the door to room: ${roomPath}`);
  }
}

export default function runMazeSync(root) {
  console.log('--- Running Sync ---');
  const result = readMazeRoomSync(root);
  console.log(`\x1b[32mFound: ${result}\x1b[0m`);
}
