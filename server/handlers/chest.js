import fs from 'fs/promises';
import path from 'path';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function chestHandler(req, res) {
  let dir = req.query.get('dir');

  if (!dir)
    return badRes(res, 400, {
      message: 'Bad Request',
      reason: 'Must provide a dir',
    });
  dir = dir.replace('maze', '');

  try {
    // TODO file system security
    const fileData = await fs.readFile(path.join(path.resolve('./maze'), dir));
    return goodRes(res, JSON.parse(fileData.toString()));
  } catch (err) {
    return badRes(res, 404, {
      reason: `Cant find ${dir}`,
      message: 'Not found',
    });
  }
}
