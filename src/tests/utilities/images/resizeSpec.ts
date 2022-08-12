import { app } from '../../../server';
import supertest from 'supertest';
import { resizeImage } from '../../../utilities/images/resize';
import path from 'path';
import { existsSync, unlink, readFile } from 'fs';
const request = supertest(app);

describe('endpoint resizing image', () => {
  it('gets the api endpoint, status should be 200 and amage restored', async () => {
    const response = await request.get(
      '/api/images?fname=encenadaport&width=300&height=300'
    );
    expect(response.status).toBe(200);
  });

  it('endpoint status should be 404 for image does not exist', async () => {
    const response = await request.get(
      '/api/images?fname=anyname-does-not-exist'
    );
    expect(response.status).toBe(404);
  });
});

describe('resizing an image', () => {
  it('image should be resized and stord', async () => {
    const originalImagePath = path.resolve(`assets/images/encenadaport.jpg`);
    const thumnailPath = path.resolve(
      `assets/thumnail/encenadaport_400_400.jpg`
    );
    if (existsSync(thumnailPath)) {
      unlink(thumnailPath, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
    }
    await resizeImage(originalImagePath, 400, 400);
    try {
      const image = readFile(thumnailPath, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      });
      expect(image).not.toBeNull;
    } catch (error) {
      console.log(error);
    }
  });
});
