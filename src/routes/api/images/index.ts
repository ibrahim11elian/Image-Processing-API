import express from 'express';
import {
  getImage,
  resize,
  crop,
  gray,
  bluri,
} from '../../../utilities/operations';
const route = express.Router();

route.get('/', getImage);

route.get('/resize', resize);

route.get('/crop', crop);

route.get('/gray', gray);

route.get('/blur', bluri);

export default route;
