import express from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";

async function resize(req: express.Request, res: express.Response) {
  let width: unknown = req.query.width;
  let height: unknown = req.query.height;
  const originalImagePath = path.resolve(
    `assets/images/${req.query.fname}.jpg`
  );
  const thumnailPath = path.resolve(`assets/thumnail/${req.query.fname}.jpg`);

  if (width) {
    width = Number(width);
  }
  if (height) {
    height = Number(height);
  }

  // get thumnail width if it exist
  let thumWidth: number | undefined = await (
    await sharp(thumnailPath).metadata()
  ).width;

  // checking if thumnail is already exist and thumnail width = user entred width if so return the same thumnail.
  if (fs.existsSync(thumnailPath) && thumWidth === width) {
    res.status(200).sendFile(path.resolve(thumnailPath));
  } else if (fs.existsSync(originalImagePath)) {
    // checking is the original image exist and resize, if not responed back error.
    try {
      await resizeImage(originalImagePath, width as number, height as number);
      res.status(200).sendFile(thumnailPath);
    } catch (error) {
      res.status(500).send("fiald to process!!");
    }
  } else {
    res.status(404).json({
      cod: 404,
      msg: "image not found",
    });
  }
}

// resize image and save it to thumnail folder
async function resizeImage(fpath: string, width: number, height?: number) {
  const filename = fpath.replace(/^.*[\\\/]/, "");
  if (width || height) {
    await sharp(fpath)
      .resize(width, height)
      .toFile(path.resolve(`assets/thumnail/${filename}`));
  }
}

export default resize;
