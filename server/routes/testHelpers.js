import db from '../db';
import supertest from 'supertest';
import app from '../app.js';
const api = supertest(app);

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

export const createUser = async (newUser) => {
  return await api.post('/api/user/signup').
    send(newUser);
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