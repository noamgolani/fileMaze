import fs from "fs";
import path from "path";

const [, , mazeName, maxWidth, startingDepth, length] = process.argv;

let allRooms = [];

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * array.length);
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

function createRoom(dir, width, depth) {
   if (depth === 0) return;

   fs.mkdirSync(dir);
   allRooms.push(dir);

   for (let i = 0; i < width; i++) {
      const randomWidth = Math.floor(Math.random() * maxWidth) + 1;
      createRoom(`${dir}/room-${i}`, randomWidth, depth - 1);
   }
}

function createClues(dir, rooms, depth) {
   const content = {};
   if (depth <= 0) {
      content.treasure = true;
   } else {
      content.next = rooms.pop();
      createClues(content.next, rooms, depth - 1);
   }
   fs.writeFileSync(`${dir}/chest.json`, JSON.stringify(content));
   if (Math.random() < 0.3)
      fs.writeFileSync(`${dir}/chest.nosj`, "I`m a bad clue");
}

//gerarte the folders
createRoom(`./${mazeName}`, maxWidth, startingDepth);

const startingClue = `./${mazeName}`;
allRooms = allRooms.filter((dir) => dir !== startingClue);

createClues(startingClue, shuffleArray(allRooms), length);
console.log(`Starting clue: ${startingClue}`);
