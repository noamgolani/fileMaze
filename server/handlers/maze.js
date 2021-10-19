import fs from 'fs/promises';
import { notFound, badRes, goodRes } from '../lib/helpers.js';

function postMaze(req, res) {
  console.log(req);
}

async function deleteMaze(req, res) {
  try {
    fs.rmdir('./maze', {
      recursive: true,
      force: true,
    });
    goodRes(res, 'Succesfully deleted');
  } catch (err) {
    badRes(res, err.message);
  }
}

export default async function mazeHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      postMaze(req, res);
      break;
    case 'DELETE':
      deleteMaze(req, res);
      break;
    default:
      notFound(req, res);
      break;
  }
}
