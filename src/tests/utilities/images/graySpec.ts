import { app } from '../../../server';
import supertest from 'supertest';
import { grayImage } from '../../../utilities/images/gray';
import path from 'path';
import { existsSync, unlink, readFile } from 'fs';
const request = supertest(app);

describe('endpoint grayscale image', () => {
  it('gets the api endpoint, status should be 200 and image transformed to grayscaly and restored', async () => {
    const response = await request.get('/api/images/gray?fname=encenadaport');
    expect(response.status).toBe(200);
  });

  it('endpoint status should be 404 for image does not exist', async () => {
    const response = await request.get(
      '/api/images/gray?fname=anyname-does-not-exist'
    );
    expect(response.status).toBe(404);
  });

  it('gets the api endpoint, status should be 200 and image transformed to grayscaly and restored with new format', async () => {
    const response = await request.get(
      '/api/images/gray?fname=encenadaport&format=png'
    );
    expect(response.status).toBe(200);
  });
});

describe('grayscale an image', () => {
  let originalImagePath: string;
  let grayPath: string;
  beforeAll(() => {
    originalImagePath = path.resolve(`assets/images/encenadaport.jpg`);
    grayPath = path.resolve(`assets/gray/encenadaport.jpg`);
    if (existsSync(grayPath)) {
      unlink(grayPath, (err) => {
        if (err) throw err;
        console.log('image was deleted');
      });
    }
  });
  it('image should be transformed to grayscale and stord', async () => {
    await grayImage(originalImagePath);
    try {
      const image = readFile(grayPath, (err, data) => {
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

  it('image should be transformed to grayscale and stord with new format as png', async () => {
    await grayImage(originalImagePath, 'png');
    try {
      const image = readFile(grayPath, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      });
      expect(image).not.toBeNull();
    } catch (error) {
      console.log(error);
    }
  });
});
