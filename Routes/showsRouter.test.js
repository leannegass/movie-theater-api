const request = require('supertest');
const app = require('../app');
const { Show } = require('../models');

describe('TV show routes', () => {
  afterEach(async () => {
    await Show.destroy({ truncate: true });
  });
});
  describe('GET /shows', () => {
    it('should return an array of TV shows', async () => {
      await Show.bulkCreate([{ title: 'Show 1' }, { title: 'Show 2' }]);

      const response = await request(app).get('/shows');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(2);
    });
  });
describe('GET/shows/:id', () => {
  it('should return a TV show by ID', async () => {
    const show = await Show.create({title: 'New Show' });
    const response = await request(app).get(`/shows/${show.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title");
  });
  it('should return 404 for non-existent ID', async () => {
    
    const response = await request(app).get('/shows/:id');
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe({  error: 'Show not found' });
});
});