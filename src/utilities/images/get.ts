import express from 'express';
import path from 'path';
import { imageExist } from './resize';
// response with image url
function getImage(req: express.Request, res: express.Response): void {
  // checking is image exist or not
  if (imageExist(path.resolve(`assets/images/${req.query.fname}`))) {
    const format = (
      imageExist(path.resolve(`assets/images/${req.query.fname}`)) as string
    ).split('.');
    res.status(200).json({
      cod: 200,
      msg: 'image found',
      url: `http://${req.get('host')}/images/${req.query.fname}.${
        format[format.length - 1]
      }`,
    });
  } else {
    res.status(404).json({
      cod: 404,
      msg: 'image not found',
    });
  }
}

export default getImage;
