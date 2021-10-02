import supertest from 'supertest';
import app from '../app.js';
import {
  createUser, deleteTestUser,
  existingTestUser,
  loginUser, newLocation,
  newTestUser,
} from './testHelpers.js';

const api = supertest(app);
let token;
// eslint-disable-next-line no-unused-vars
let newLocationId;

describe('location', () => {
  beforeAll(async () => {
    await createUser(newTestUser);
    token = await loginUser(existingTestUser);
  });
  
  test('can be added', async () => {
    const result = await api.post('/api/location/add-location').
      set('Authorization', `Bearer ${token}`).
      send({newLocation});
    
    expect(result.statusCode).toEqual(200);
    expect(result.body.location.addr_line1).toEqual(newLocation.addr_line1);
    expect(result.body.location.id).toBeDefined();
    newLocationId = result.body.location.id;
  });
  
  test('returns all locations', async () => {
    const result = await api.get('/api/location').
      set('Authorization', `Bearer ${token}`);
    expect(result.statusCode).toEqual(200);
    console.log('getUserLocations', result.body);
  });
  
  test('can be deleted', async () => {
    await api.delete('/api/location').
      set('Authorization', `Bearer ${token}`).
      send({locationid: newLocationId}).
      expect(204);
    
  });
  
  afterAll(async () => {
    await deleteTestUser(existingTestUser);
  });
});