import express from 'express';
import {
  getImage,
  resize,
  crop,
  gray,
  bluri,
} from '../../../utilities/operations';

// route genrator
const route = express.Router();

// respond with image url
route.get('/', getImage);

// respond with resized image
route.get('/resize', resize);

// respond with croped image
route.get('/crop', crop);

// respond with grayscale image
route.get('/gray', gray);

// respond with blured image
route.get('/blur', bluri);

export default route;
