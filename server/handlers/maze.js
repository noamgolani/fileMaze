import fs from 'fs/promises';
import { notFound, badRes, goodRes } from '../lib/helpers.js';
import generateMaze from '../lib/mazeGenerator.js';

async function postMaze(req, res) {
  const { length, width, depth } = req.body;
  if (!width || typeof +width !== 'number') return badRes(res, 'Bad Width');
  if (!depth || typeof +depth !== 'number') return badRes(res, 'Bad Depth');
  if (!length || typeof +length !== 'number' || +length > +width * +depth)
    return badRes(res, 'Bad Length');

  try {
    await generateMaze('./maze', width, depth, length);
    return goodRes(res, 'good params');
  } catch (err) {
    return badRes(res, err.message);
  }
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
      return postMaze(req, res);
    case 'DELETE':
      return deleteMaze(req, res);
    default:
      return notFound(req, res);
  }
}
