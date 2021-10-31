import db from '../db';
import supertest from 'supertest';
import app from '../app.js';
import {customAlphabet, urlAlphabet} from 'nanoid';

const api = supertest(app);
const nanoid = customAlphabet(urlAlphabet, 10);

export const newTestUser = {
  'first_name': 'First',
  'last_name': 'Last',
  'dl_number': '9999',
  'dl_date': '2000-12-31',
  'countryid': 247,
  'phone': '123456789',
  'email': 'walton03u_d512g@tahyu.com',
  'password': 'secret',
  'ishost': 'true',
};

export const existingTestUser = {
  'email': 'walton03u_d512g@tahyu.com',
  'password': 'secret',
};

export const newListing = {
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
  images: [createKey('car.jpg'), createKey('car.jpg')],
};

export const newLocation = {
  addr_line2: 'unit 300',
  addr_line1: '4000 German Springs Rd',
  zipcode: '90001',
};

function createKey (filename) {
  const dotIndex = filename.lastIndexOf('.');
  return filename.slice(0, dotIndex) + '_' + nanoid() +
    filename.slice(dotIndex);
}

export const createUser = async (newUser) => {
  return await api.post('/api/user/signup').
    send(newUser);
};

/**
 * @return token of logged in user
 * */
export const loginUser = async(user)=>{
  const response = await api.post('/api/user/login').send(user);
  return response.body.token;
};

// cleanup function
export const deleteTestUser = async (user) => {
  const text = 'delete from appuser where email=$1';
  const values = [user.email];
  try {
    await db.none(text, values);
  } catch (e) {
    console.log('deleteTestUser error:', e);
  }
};