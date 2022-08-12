import express from 'express';
import { getImage, resize } from '../../../utilities/operations';
const route = express.Router();

route.get('/', getImage);

route.get('/resize', resize);

export default route;
