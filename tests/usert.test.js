const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models/User');
const User = require('../src/models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  let token;
  let userId;
  const testUser = {
    firstname: 'Test',
    surname: 'User',
    email: 'test.user@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  it('should create a new user and return 201', async () => {
    const res = await request(app).post('/v1/usuario').send(testUser);
    expect(res.statusCode).toEqual(201);
  });

  it('should return 400 when creating a user with a duplicate email', async () => {
    const res = await request(app).post('/v1/usuario').send(testUser);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Este email já está em uso.');
  });

  it('should login the user and return a JWT token', async () => {
    const res = await request(app).post('/v1/usuario/token').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should require authentication to read user information', async () => {
    const createdUser = await User.findOne({ where: { email: testUser.email } });
    userId = createdUser.id;

    const unauthenticated = await request(app).get(`/v1/usuario/${userId}`);
    expect(unauthenticated.statusCode).toEqual(401);

    const res = await request(app)
      .get(`/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('firstname', testUser.firstname);
  });

  it('should update the authenticated user', async () => {
    const res = await request(app)
      .put(`/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ firstname: 'Updated', surname: 'Name', email: 'updated.user@example.com' });

    expect(res.statusCode).toEqual(204);

    const checkRes = await request(app)
      .get(`/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(checkRes.body.firstname).toEqual('Updated');
    expect(checkRes.body.email).toEqual('updated.user@example.com');
  });

  it('should delete the authenticated user', async () => {
    const res = await request(app)
      .delete(`/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should return 404 when reading a deleted user with a valid token', async () => {
    const res = await request(app)
      .get(`/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});