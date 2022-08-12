import { app } from '../../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('getting an image url', () => {
  it('gets the api endpoint, status should be 200', async () => {
    const response = await request.get('/api/images?fname=encenadaport');
    expect(response.status).toBe(200);
  });

  it('endpoint status should be 404', async () => {
    const response = await request.get(
      '/api/images?fname=anyname-does-not-exist'
    );
    expect(response.status).toBe(404);
  });
});
