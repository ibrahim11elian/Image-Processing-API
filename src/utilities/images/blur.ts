import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { imageExist } from './get';

// callback function when requesting the blur route 'api/images/blur?fname={image name}&effect={blur effect}'
async function bluri(req: express.Request, res: express.Response) {
  let effect: unknown = req.query.effect;
  const format: unknown = req.query.format;
  const originalImagePath = path.resolve(`assets/images/${req.query.fname}`);

  const bluredPath = path.resolve(
    `assets/blured/${req.query.fname}_${effect}.${format || 'jpg'}`
  );

  if (effect) {
    effect = Number(effect);
  }

  // checking if blured image is already exist with the same blur effect if so return the same blured image.
  if (fs.existsSync(bluredPath)) {
    res.status(200).sendFile(path.resolve(bluredPath));
  } else if (
    imageExist(originalImagePath) &&
    (effect as number) >= 0.3 &&
    (effect as number) <= 1000
  ) {
    // checking is the original image exist if not responed back error.
    try {
      await blurImage(
        imageExist(originalImagePath) as string,
        effect as number,
        format as 'jpg' | 'jpeg' | 'png' | undefined
      );
      res.status(200).sendFile(bluredPath);
    } catch (error) {
      res.status(500).send('fiald to process!!');
    }
  } else {
    res.status(404).json({
      cod: 404,
      msg: 'image not found or blur effect not in range (0.3 , 1000)',
    });
  }
}

// blur image and save it to blured folder
export async function blurImage(
  fpath: string,
  effect: number,
  format?: 'jpg' | 'jpeg' | 'png'
) {
  const filename = fpath.replace(/^.*[\\/]/, '').split('.')[0];

  if (effect) {
    await sharp(fpath)
      .blur(effect)
      .toFormat(format || 'jpg')
      .toFile(
        path.resolve(`assets/blured/${filename}_${effect}.${format || 'jpg'}`)
      );
  }
}

export default bluri;
