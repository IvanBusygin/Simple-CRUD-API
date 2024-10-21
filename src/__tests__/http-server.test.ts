import http from 'http';
import request from 'supertest';
import { users } from '../database/db';
import { server as httpServer } from '../server/server';

const URL = 'http://localhost:3000/';

describe('Testing API', () => {
  let server: http.Server | null = null;

  const user = {
    username: 'John Doe',
    age: 44,
    hobbies: ['reading', 'gaming'],
  };

  const user2 = {
    username: 'Jane Doe',
    age: 55,
    hobbies: ['cooking', 'traveling'],
  };

  let userId = '';

  beforeAll(() => {
    server = http
      .createServer(async (req, res) => await httpServer(req, res))
      .listen(3000, () => {
        console.log(`Server with PID ${process.pid} running at ${URL}`);
      });
  });

  afterAll(() => {
    server?.close();
  });

  it('1. Get all records with a GET api/users request (an empty array is expected)', async () => {
    const response = await request(URL).get('api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(users);
  });

  it('2. Create a user with a POST api/users request', async () => {
    const response = await request(URL).post('api/users').send(user);

    userId = response.body.id;
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(user);
    expect(typeof userId).toBe('string');
  });

  it('3. Get user created on a previous step with a GET api/users/:userId request', async () => {
    const response = await request(URL).get(`api/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(user);
    expect(response.body.id).toBe(userId);
  });

  it('4. Update created user with a PUT api/users/:userId request', async () => {
    const response = await request(URL).put(`api/users/${userId}`).send(user2);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(user2);
    expect(response.body.id).toBe(userId);
  });

  it('5. Delete created user with a DELETE api/users/:userId request', async () => {
    const response = await request(URL).delete(`api/users/${userId}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toBe('');
  });

  it('6. Check that user has been deleted with a GET api/users/:userId request', async () => {
    const response = await request(URL).get(`api/users/${userId}`);

    expect(response.statusCode).toBe(404);
  });
});
