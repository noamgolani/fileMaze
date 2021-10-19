import fs from 'fs/promises';
import path from 'path';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function roomHandler(req, res) {
  const dir = req.query.get('dir');

  if (!dir) return badRes(res, 'Must provide a dir');

  try {
    // TODO fix big securety problem
    const dirData = await fs.readdir(path.join(path.resolve('./maze'), dir));
    return goodRes(res, dirData);
  } catch (err) {
    return badRes(res, err.message);
  }
}
