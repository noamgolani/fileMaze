import fs from 'fs';
import { goodRes, badRes } from '../lib/helpers';

export default async function statHandler(req, res) {
  const { query } = req;

  try {
    const statData = await fs.lstat(query.dir);
    statData.isFile = statData.isFile();
    goodRes(res, statData);
  } catch (err) {
    badRes(res, err);
  }
}
