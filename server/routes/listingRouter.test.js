import supertest from 'supertest';
import app from '../app.js';
import db from '../db';
import {
  newListing,
  createUser,
  newTestUser,
  existingTestUser,
  deleteTestUser, loginUser,
} from './testHelpers.js';

const api = supertest(app);
let token;

// const path = 'D:\\projects\\car_sharing\\car.jpg';

// const preview = global.URL.createObjectURL(path);


let newListingId;
// let newLocationId;  // removed create location from this file


const createListing = async (newListing) => {
  return await api.post('/api/listing').
    set('Authorization', `Bearer ${token}`).
    send(newListing);
};

describe('new listing', () => {
  
  beforeAll(async () => {
    await createUser(newTestUser);
    token = await loginUser(existingTestUser);
    
  });
  
  test('can be created when valid by authorized user', async () => {
    const response = await createListing(newListing);
    
    console.log('listing response', response.body);
    
    expect(response.status).toBe(200);
    // console.log('listing ERR:', response.body.error);
    
    expect(response.body.listing).toHaveProperty('id');
    newListingId = response.body.listing.id;
    expect(response.body).toHaveProperty('keysToUrls');
    // console.log('keysToUrls', response.body.keysToUrls);
    // console.log('type', typeof response.body.keysToUrls);
    // console.log('keysToUrls value0',
    //   response.body.keysToUrls[newListing.images[0]]);
    
    expect(response.body.keysToUrls[newListing.images[0]]).toBeDefined();
    expect(response.body.keysToUrls[newListing.images[1]]).toBeDefined();
    
    // listing from db
    let listingFromDb;
    try {
      listingFromDb = await db.one('select plate from listing where id=$1',
        [response.body.listing.id]);
    } catch (e) {
      console.log('can be created when valid ERROR from db:', e);
    }
    expect(listingFromDb.plate).toEqual(newListing.plate.toUpperCase());
  });
  
  test('can be fetched in /api/listing', async () => {
    const result = await api.get('/api/listing').
      set('Authorization', `Bearer ${token}`).
      query({fromDate: new Date(), toDate: new Date()});
    console.log('get /listing result.error', result.error);
    expect(result.statusCode).toEqual(200);
    expect(result.body.listings).
      toEqual(expect.arrayContaining(
        [expect.objectContaining({plate: newListing.plate.toUpperCase()})],
      ));
  });
  
  test('can update location, year, active, base_rate, fee in existing listing',
    async () => {
      const rowToSubmit = {
        id: newListingId,
        // location_id: newLocationId,
        year: 2001,
        active: !newListing.active,
        base_rate: '99.00',
        fee: '29.00',
        miles_per_rental: 100,
      };
      const result = await api.put('/api/listing').
        set('Authorization', `Bearer ${token}`).
        send(rowToSubmit);
      
      console.log('put /api/listing result error', result.error);
      expect(result.statusCode).toEqual(200);
      console.log('put /api/listing result.body', result.body);
      expect(result.body.listing_update).toMatchObject(rowToSubmit);
      
    });
  
  test('can be marked deleted', async()=>{
    const listing={id: newListingId};
    await api.delete('/api/listing').
      set('Authorization', `Bearer ${token}`).
      send(listing).expect(204);
  });
  
  // TODO add test when reservation was made it should show valid values of 'num_days_rented' and 'sale_total'
  
  afterAll(async () => {
    await deleteTestUser(existingTestUser);
  });
});
