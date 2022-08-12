import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function resize(req: express.Request, res: express.Response) {
  let width: unknown = req.query.width;
  let height: unknown = req.query.height;
  const originalImagePath = path.resolve(
    `assets/images/${req.query.fname}.jpg`
  );
  const thumnailPath = path.resolve(
    `assets/thumnail/${req.query.fname}_${width}_${height}.jpg`
  );

  if (width) {
    width = Number(width);
  }
  if (height) {
    height = Number(height);
  }

  // checking if thumnail is already exist and thumnail width = user entred width if so return the same thumnail.
  if (fs.existsSync(thumnailPath)) {
    res.status(304).sendFile(path.resolve(thumnailPath));
  } else if (fs.existsSync(originalImagePath)) {
    // checking is the original image exist and resize, if not responed back error.
    try {
      await resizeImage(originalImagePath, width as number, height as number);
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
  height?: number
) {
  const filename = fpath.replace(/^.*[\\/]/, '').split('.')[0];

  if (width || height) {
    await sharp(fpath)
      .resize(width, height)
      .toFile(
        path.resolve(`assets/thumnail/${filename}_${width}_${height}.jpg`)
      );
  }
}

export default resize;
