import fs from 'fs/promises';
import path from 'path';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function statHandler(req, res) {
  const dir = req.query.get('dir');

  if (!dir) return badRes(res, 'Must provide a dir query');

  try {
    // TODO fix path security problems
    const statData = await fs.lstat(path.join(path.resolve('./maze'), dir));
    statData.isFile = statData.isFile();
    return goodRes(res, statData);
  } catch (err) {
    return badRes(res, err.message);
  }
}
