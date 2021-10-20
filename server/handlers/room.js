import fs from 'fs/promises';
import path from 'path';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function roomHandler(req, res) {
  let dir = req.query.get('dir');

  if (!dir) return badRes(res, 'Must provide a dir');
  dir = dir.replace('maze', ''); // removes relative to maze dir
  try {
    // TODO fix big securety problem
    const dirData = await fs.readdir(path.join(path.resolve('./maze'), dir));
    return goodRes(res, dirData);
  } catch (err) {
    return badRes(res, err.message);
  }
}
