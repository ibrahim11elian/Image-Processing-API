import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { imageExist } from './get';

// callback function when requesting the crop route 'api/images/crop?fname={image name}&width={crop width}&height={crop height}&top={Y coord}&left={X coord}'
async function crop(req: express.Request, res: express.Response) {
  let width: unknown = req.query.width;
  let height: unknown = req.query.height;
  let left: unknown = req.query.left;
  let top: unknown = req.query.top;

  const format: unknown = req.query.format;
  const originalImagePath = path.resolve(`assets/images/${req.query.fname}`);

  const cropedPath = path.resolve(
    `assets/croped/${req.query.fname}_${width}_${height}_coord_${top}_${left}.${
      format || 'jpg'
    }`
  );

  if (width) {
    width = Number(width);
  }
  if (height) {
    height = Number(height);
  }
  if (left) {
    left = Number(left);
  }
  if (top) {
    top = Number(top);
  }

  // checking if croped image is already exist and croped image width = user entred width and has the same coordnates if so return the same croped image.
  if (fs.existsSync(cropedPath)) {
    res.status(200).sendFile(path.resolve(cropedPath));
  } else if (imageExist(originalImagePath)) {
    // checking is the original image exist and crop, if not responed back error.
    try {
      await cropImage(
        imageExist(originalImagePath) as string,
        left as number,
        top as number,
        width as number,
        height as number,
        format as 'jpg' | 'jpeg' | 'png' | undefined
      );
      res.status(200).sendFile(cropedPath);
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

// crop image and save it to croped folder
export async function cropImage(
  fpath: string,
  left: number,
  top: number,
  width: number,
  height?: number,
  format?: 'jpg' | 'jpeg' | 'png'
) {
  const filename = fpath.replace(/^.*[\\/]/, '').split('.')[0];

  if (width || height) {
    await sharp(fpath)
      .extract({
        width: width as number,
        height: height as number,
        left: left as number,
        top: top as number,
      })
      .toFormat(format || 'jpg')
      .toFile(
        path.resolve(
          `assets/croped/${filename}_${width}_${height}_coord_${top}_${left}.${
            format || 'jpg'
          }`
        )
      );
  }
}

export default crop;
