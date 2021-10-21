import fs from 'fs/promises';
import { notFound, badRes, goodRes } from '../lib/helpers.js';
import generateMaze from '../lib/mazeGenerator.js';

async function postMaze(req, res) {
  const { length, width, depth } = req.body;
  const error = [];
  if (!width || typeof +width !== 'number') error.push('Bad Width');
  if (!depth || typeof +depth !== 'number') error.push('Bad Depth');
  if (!length || typeof +length !== 'number' || +length > +width * +depth)
    error.push('Bad Length');

  if (error.length > 0)
    return badRes(res, 400, {
      message: 'Bad Request',
      reasons: error,
    });

  try {
    await generateMaze('./maze', width, depth, length);
    return goodRes(res, 'good params');
  } catch (err) {
    console.log(err);
    return badRes(res, 500, {
      message: 'Internal Server Error',
      reason: err.message,
    });
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
    console.log(err);
    badRes(res, 500, { message: 'Internal Server Error', reason: err.message });
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
