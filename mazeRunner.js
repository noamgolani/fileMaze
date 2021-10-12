import fs from "fs";
import path from "path";

function runMaze(root) {
   readMazeRoom(root, (err, result) => {
      if (err) console.log(`\x1b[31m${err.message}\x1b[0m`);
      else console.log(`\x1b[32mFound: ${result}\x1b[0m`);
   });
}

function readMazeRoom(roomPath, callback) {
   fs.readdir(roomPath, (err, files) => {
      if (err)
         return callback(new Error(`Cant find the door to room: ${roomPath}`));

      const items = files;
      while (items.length > 0) {
         const item = items.pop();
         const itemPath = path.join(roomPath, item);

         fs.lstat(itemPath, (err, stat) => {
            if (!err && stat.isFile())
               openChest(itemPath, (err, chestContent) => {
                  if (err) return callback(err);
                  if (chestContent === "found") return callback(null, itemPath);
                  if (chestContent) {
                     console.log(`Going to room: ${chestContent}`);
                     readMazeRoom(chestContent, callback);
                  }
               });
         });
      }
   });
}

function openChest(chestPath, callback) {
   fs.readFile(chestPath, (err, content) => {
      if (err) return callback(new Error(`Cant open chest: ${chestPath}`));
      console.log(`Opening chest: ${chestPath}`);
      try {
         const jsonContent = JSON.parse(content);
         if (jsonContent.treasure) return callback(null, "found");
         if (jsonContent.next) return callback(null, jsonContent.next);
         return callback(null, null);
      } catch (err) {
         return callback(new Error(`Cant open chest: ${chestPath}`));
      }
   });
}

function runMazeSync(root) {
   const result = readMazeRoomSync(root);
   console.log(`\x1b[32mFound: ${result}\x1b[0m`);
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
               if (chestContent === "found") return itemPath;
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

function openChestSync(chestPath) {
   try {
      console.log(`Opening chest: ${chestPath}`);
      const content = fs.readFileSync(chestPath);
      const jsonContent = JSON.parse(content);
      if (jsonContent.treasure) return "found";
      if (jsonContent.next) return jsonContent.next;
      return null;
   } catch (err) {
      throw new Error(`Cant open chest: ${chestPath}`);
   }
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
