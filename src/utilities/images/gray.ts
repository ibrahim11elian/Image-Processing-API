import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { imageExist } from './resize';

async function gray(req: express.Request, res: express.Response) {
  const format: unknown = req.query.format;
  const originalImagePath = path.resolve(`assets/images/${req.query.fname}`);

  const grayPath = path.resolve(
    `assets/gray/${req.query.fname}.${format || 'jpg'}`
  );

  // checking if gray image is already exist if so return the same gray image.
  if (fs.existsSync(grayPath)) {
    res.status(200).sendFile(path.resolve(grayPath));
  } else if (imageExist(originalImagePath)) {
    // checking is the original image exist and resize, if not responed back error.
    try {
      await grayImage(
        imageExist(originalImagePath) as string,
        format as 'jpg' | 'jpeg' | 'png' | undefined
      );
      res.status(200).sendFile(grayPath);
    } catch (error) {
      res.status(500).send('fiald to process!!');
    }
  } else {
    res.status(404).json({
      cod: 404,
      msg: 'image not found',
    });
  }
}

// grayscale image and save it to gray folder
export async function grayImage(
  fpath: string,
  format?: 'jpg' | 'jpeg' | 'png'
) {
  const filename = fpath.replace(/^.*[\\/]/, '').split('.')[0];

  await sharp(fpath)
    .grayscale()
    .toFormat(format || 'jpg')
    .toFile(path.resolve(`assets/gray/${filename}.${format || 'jpg'}`));
}

export default gray;
