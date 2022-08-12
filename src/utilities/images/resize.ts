import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function resize(req: express.Request, res: express.Response) {
  let width: unknown = req.query.width;
  let height: unknown = req.query.height;
  const format: unknown = req.query.format;
  const originalImagePath = path.resolve(`assets/images/${req.query.fname}`);

  const thumnailPath = path.resolve(
    `assets/thumnail/${req.query.fname}_${width}_${height}.${format || 'jpg'}`
  );

  if (width) {
    width = Number(width);
  }
  if (height) {
    height = Number(height);
  }

  // checking if thumnail is already exist and thumnail width = user entred width if so return the same thumnail.
  if (fs.existsSync(thumnailPath)) {
    res.status(200).sendFile(path.resolve(thumnailPath));
  } else if (imageExist(originalImagePath)) {
    // checking is the original image exist and resize, if not responed back error.
    try {
      await resizeImage(
        imageExist(originalImagePath) as string,
        width as number,
        height as number,
        format as 'jpg' | 'jpeg' | 'png' | undefined
      );
      res.status(200).sendFile(thumnailPath);
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

// resize image and save it to thumnail folder
export async function resizeImage(
  fpath: string,
  width: number,
  height?: number,
  format?: 'jpg' | 'jpeg' | 'png'
) {
  const filename = fpath.replace(/^.*[\\/]/, '').split('.')[0];

  if (width || height) {
    await sharp(fpath)
      .resize(width, height)
      .toFormat(format || 'jpg')
      .toFile(
        path.resolve(
          `assets/thumnail/${filename}_${width}_${height}.${format || 'jpg'}`
        )
      );
  }
}

// check if the original image exist with different and if so return back the whole path with format
export function imageExist(originalImagePath: string): string | false {
  const formats = ['jpeg', 'jpg', 'png'];

  for (let i = 0; i < formats.length; i++) {
    if (fs.existsSync(`${originalImagePath}.${formats[i]}`)) {
      return `${originalImagePath}.${formats[i]}`;
    }
  }
  return false;
}

export default resize;
