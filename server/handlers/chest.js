import fs from 'fs/promises';
import path from 'path';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function chestHandler(req, res) {
  const dir = req.query.get('dir');

  if (!dir) return badRes(res, 'Must provide a dir');

  try {
    // TODO file system security
    const fileData = await fs.readFile(path.join(path.resolve('./maze'), dir));
    return goodRes(res, JSON.parse(fileData.toString()));
  } catch (err) {
    return badRes(res, err.message);
  }
}
