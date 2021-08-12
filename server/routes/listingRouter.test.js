import supertest from 'supertest';
import app from '../app.js';
import db from '../db';
import {createUser, newTestUser, existingTestUser, deleteTestUser} from './testHelpers.js';

const api = supertest(app);
let token;

const newListing = {
  plate: 'xyz',
  make: 'abc',
  model: 'foo',
  year: '1901',
  transmission: 'M', // TODO add constraint in db
  seat_number: '4', // TODO add constraint in db
  large_bags_number: '2', // TODO add constraint in db
  category: 'Small',
  miles_per_rental: '', // TODO add constraint in db
  active: false,
};

const createListing = async (newListing) => {
  return await api.post('/api/listing/create').
    set('Authorization', `Bearer ${token}`).
    send(newListing);
};

describe('new listing', () => {
  
  beforeAll(async ()=>{
    await createUser(newTestUser);
    const response = await api.post('/api/user/login').send(existingTestUser);
    token = response.body.token;
  
  });
  
  test('can be created when valid', async () => {
    delete newListing.miles_per_rental;
    const response = await createListing(newListing);
    
    console.log('listing response',response.body);
    
    expect(response.status).toBe(200);
    console.log('listing ERR:', response.body.error);
    
    // TODO get id from response
    expect(response.body).toHaveProperty('id');
    
    // listing from db
    let listingFromDb;
    try{
      listingFromDb = await db.one('select plate from listing where id=$1', [response.body.id]);
    } catch (e) {
      console.log('can be created when valid ERROR from db:', e);
    }
    expect(listingFromDb.plate).toEqual(newListing.plate);
  });
  afterAll(async()=>{
    await deleteTestUser(existingTestUser);
  });
});
