import { app } from '../../../server';
import supertest from 'supertest';
import { cropImage } from '../../../utilities/images/crop';
import path from 'path';
import { existsSync, unlink, readFile } from 'fs';
const request = supertest(app);

describe('endpoint croping image', () => {
  it('gets the api endpoint, status should be 200 and image croped and restored', async () => {
    const response = await request.get(
      '/api/images/crop?fname=encenadaport&width=300&height=300&left=20&top=40'
    );
    expect(response.status).toBe(200);
  });

  it('endpoint status should be 404 for image does not exist', async () => {
    const response = await request.get(
      '/api/images/crop?fname=anyname-does-not-exist'
    );
    expect(response.status).toBe(404);
  });

  it('gets the api endpoint, status should be 200 and image croped and restored with new format', async () => {
    const response = await request.get(
      '/api/images/crop?fname=encenadaport&width=300&height=300&format=png&left=20&top=40'
    );
    expect(response.status).toBe(200);
  });
});

describe('croping an image', () => {
  let originalImagePath: string;
  let cropedPath: string;
  beforeAll(() => {
    originalImagePath = path.resolve(`assets/images/encenadaport.jpg`);
    cropedPath = path.resolve(
      `assets/croped/encenadaport_400_400_coord_10_30.jpg`
    );
    if (existsSync(cropedPath)) {
      unlink(cropedPath, (err) => {
        if (err) throw err;
        console.log('image was deleted');
      });
    }
  });

  it('image should be croped and stord', async () => {
    await cropImage(originalImagePath, 30, 10, 400, 400);
    try {
      const image = readFile(cropedPath, (err, data) => {
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

  it('image should be croped and stord with new format as jpeg', async () => {
    await cropImage(originalImagePath, 30, 10, 400, 400, 'jpeg');
    try {
      const image = readFile(cropedPath, (err, data) => {
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
