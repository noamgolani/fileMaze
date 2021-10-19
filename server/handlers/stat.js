import fs from 'fs/promises';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function statHandler(req, res) {
  const { query } = req;

  if (!query.dir) return badRes(res, 'Must provide a dir query');
  console.log(query.dir);

  try {
    const statData = await fs.lstat(query.dir);
    statData.isFile = statData.isFile();
    return goodRes(res, statData);
  } catch (err) {
    return badRes(res, err.message);
  }
}
