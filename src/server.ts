import express from 'express';
import routes from './routes/api/images';
import cors from 'cors';
import morgan from 'morgan';
import { resolve } from 'path';

export const app = express();
const port = process.env.PORT || 3000;

// using morgan middleware for logging information
app.use(morgan('tiny'));
// using CORS to let the client talk to server without security interruption
app.use(cors());
// home direct to readme file
app.get('/', function (req, res) {
  res.redirect('https://github.com/ibrahim11elian/Image-Processing-API#readme');
});

// using images folder as static to return the url of the image if we want
app.use('/images', express.static(resolve(`assets/images`)));

// routes
app.use('/api/images', routes);

// start server
if (!module.parent) {
  app.listen(port, () =>
    console.log(`app is running on http://localhost:${port}`)
  );
}
