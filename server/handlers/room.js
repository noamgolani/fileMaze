import fs from 'fs';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function roomHandler(req, res) {
  const { query } = req;

  try {
    const dirData = await fs.readdir(`${query.dir}`);
    goodRes(res, dirData);
  } catch (err) {
    badRes(res, err);
  }
}
