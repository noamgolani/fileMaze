import fs from 'fs';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function chestHandler(req, res) {
  const { query } = req;

  try {
    const fileData = await fs.readFile(query.dir);
    goodRes(res, JSON.parse(fileData.toString()));
  } catch (err) {
    badRes(res, err);
  }
}
