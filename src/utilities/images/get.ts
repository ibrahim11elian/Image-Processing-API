import express from 'express';
import fs from 'fs';
import path from 'path';

// response with image url
function getImage(req: express.Request, res: express.Response): void {
  // checking is image exist or not
  if (fs.existsSync(path.resolve(`assets/images/${req.query.fname}.jpg`))) {
    res.status(200).json({
      cod: 200,
      msg: 'image found',
      url: `http://${req.get('host')}/images/${req.query.fname}.jpg`,
    });
  } else {
    res.status(404).json({
      cod: 404,
      msg: 'image not found',
    });
  }
}

export default getImage;
