/* eslint-disable consistent-return */
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const URL = 'http://localhost:5000';

const logFile = 'dat.log';

async function openChest(chestPath) {
  try {
    const response = await axios.get(`${URL}/chest?dir=${chestPath}`);
    const jsonContent = response.data;
    if (jsonContent.treasure) return 'found';
    if (jsonContent.next) return jsonContent.next;
  } catch (err) {
    throw new Error(`Cant open chest: ${chestPath}`);
  }
}

async function readMazeRoom(roomPath) {
  try {
    const response = await axios.get(`${URL}/room?dir=${roomPath}`);
    fs.appendFile(logFile,`Entered: ${roomPath}\n`);
    const items = response.data;

    items.forEach(async (item) => {
      const itemPath = path.join(roomPath, item);
      const response = await axios.get(`${URL}/stat?dir=${itemPath}`);
      const stat = response.data;
      if (stat.isFile) {
        try{
          const chestContent = await openChest(itemPath);
          if (chestContent === 'found') fs.appendFile(logFile,`Found: ${itemPath}\n`);
          await readMazeRoom(chestContent);
        }catch {
          console.log("Problem reading chest");
        }
      }
    });
  } catch (err) {
    throw Error(`Cant find the door to room: ${roomPath}`);
  }
}

export default function runMaze(root) {
  console.log('--- Running Async ---');
  readMazeRoom(root).then(()=>{
    console.log("Read dat.log");
  });
}
