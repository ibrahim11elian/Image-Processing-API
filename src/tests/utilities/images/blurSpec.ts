import { app } from '../../../server';
import supertest from 'supertest';
import { blurImage } from '../../../utilities/images/blur';
import path from 'path';
import { existsSync, unlink, readFile } from 'fs';
const request = supertest(app);

describe('endpoint blur image', () => {
  it('gets the api endpoint, status should be 200 and image blured and restored', async () => {
    const response = await request.get(
      '/api/images/blur?fname=encenadaport&effect=3'
    );
    expect(response.status).toBe(200);
  });

  it('endpoint status should be 404 for image does not exist', async () => {
    const response = await request.get(
      '/api/images/blur?fname=anyname-does-not-exist'
    );
    expect(response.status).toBe(404);
  });

  it('gets the api endpoint, status should be 200 and image blured and restored with new format', async () => {
    const response = await request.get(
      '/api/images/blur?fname=encenadaport&effect=3&format=jpeg'
    );
    expect(response.status).toBe(200);
  });
});

describe('blur an image', () => {
  let originalImagePath: string;
  let bluredPath: string;
  beforeAll(() => {
    originalImagePath = path.resolve(`assets/images/encenadaport.jpg`);
    bluredPath = path.resolve(`assets/blured/encenadaport_4.jpg`);
    if (existsSync(bluredPath)) {
      unlink(bluredPath, (err) => {
        if (err) throw err;
        console.log('image was deleted');
      });
    }
  });
  it('image should be blured and stord', async () => {
    await blurImage(originalImagePath, 4);
    try {
      const image = readFile(bluredPath, (err, data) => {
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

  it('image should be blured and stord with new format as png', async () => {
    await blurImage(originalImagePath, 4, 'png');
    try {
      const image = readFile(bluredPath, (err, data) => {
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
