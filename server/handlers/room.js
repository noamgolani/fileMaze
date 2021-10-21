import fs from 'fs/promises';
import path from 'path';
import { goodRes, badRes } from '../lib/helpers.js';

export default async function roomHandler(req, res) {
  let dir = req.query.get('dir');

  if (!dir)
    return badRes(res, 400, {
      message: 'Bad Request',
      reason: 'Must provide a dir',
    });
  dir = dir.replace('maze', ''); // removes relative to maze dir
  try {
    // TODO fix big securety problem
    const dirData = await fs.readdir(path.join(path.resolve('./maze'), dir));

    const itemStats = await Promise.allSettled(
      dirData.map(async (itemPath) => ({
        path: itemPath,
        stat: await fs.lstat(path.join(path.resolve('./maze'), dir, itemPath)),
      })),
    );

    // filters the non files
    const onlyFiles = itemStats
      .filter((itemStat) => {
        if (itemStat.status === 'rejected') return false;
        return itemStat.value.stat.isFile();
      })
      .map((itemStat) => itemStat.value.path);

    return goodRes(res, onlyFiles);
  } catch (err) {
    return badRes(res, 404, {
      message: 'Not found',
      reason: `Cant find ${dir}`,
    });
  }
}
