import db from '../db/index.js';
import supertest from 'supertest';
import app from '../app.js';
import {pgp} from '../db/index.js';

let token;
const api = supertest(app);
const newTestUser = {
  'first_name': 'First',
  'last_name': 'Last',
  'dl_number': '9999',
  'dl_date': '2000-12-31',
  'countryid': 247,
  'phone': '123456789',
  'email': 'walton03u_d512g@tahyu.com',
  'password': 'secret',
  'ishost': 'false',
};
const existingTestUser = {
  'email': 'walton03u_d512g@tahyu.com',
  'password': 'secret',
};
const createUser = async (newUser) => {
  return await api.post('/api/user/signup').
    set('Authorization', `Bearer ${token}`).
    send(newUser);
};

const deleteTestUser = async (user) => {
  const text = 'delete from appuser where email=$1';
  const values = [user.email];
  try {
    await db.none(text, values);
  } catch (e) {
    console.log(e);
  }
};

describe('new user', () => {
  beforeEach(async () => {
    await deleteTestUser(newTestUser);
  });
  
  test('can be created when valid', async () => {
    
    const response = await createUser(newTestUser);
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('error');
    
    // user in db
    const userFromDb = await db.one(
      'select * from appuser where email=$1 and dl_number=$2 and countryid=$3',
      [newTestUser.email, newTestUser.dl_number, newTestUser.countryid]);
    expect(userFromDb).toMatchObject({
      'email': newTestUser.email,
      'dl_number': newTestUser.dl_number,
      'countryid': newTestUser.countryid,
    });
    
  });
  
  test('can not be created when invalid', async () => {
    const newUser = {
      ...newTestUser,
      'email': '',
    };
    delete newUser.first_name;
    
    const response = await api.post('/api/user/signup').
      set('Authorization', `Bearer ${token}`).
      send(newUser).
      expect(400);
    expect(response.body).toHaveProperty('error');
    
    // user in db
    const checkuserindb = async () => {
      const user = await db.one(
        'select * from appuser where email=$1 and dl_number=$2 and countryid=$3',
        [newUser.email, newUser.dl_number, newUser.countryid]);
      console.log('checkUserInDb', user);
    };
    // db returns no rows
    await expect(checkuserindb()).rejects.toThrow(pgp.errors.QueryResultError);
    
  });
  
});

// describe('existing user', () => {
//   test('login with valid credentials', async () => {
//
//   });
// });

afterAll(() => {
  db.$pool.end();
});