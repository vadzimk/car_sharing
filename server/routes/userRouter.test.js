import db from '../db/index.js';
import supertest from 'supertest';
import app from '../app.js';
import {pgp} from '../db';

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

// cleanup function
const deleteTestUser = async (user) => {
  const text = 'delete from appuser where email=$1';
  const values = [user.email];
  try {
    await db.none(text, values);
  } catch (e) {
    console.log('deleteTestUser error:', e);
  }
};

beforeAll(async () => {
  await deleteTestUser(newTestUser);
});

describe('new user', () => {
  afterEach(async () => {
    await deleteTestUser(newTestUser);
  });
  
  test('can be created when valid', async () => {
    
    const response = await createUser(newTestUser);
    console.log('can be created when valid ERROR:', response.body.error);
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('error');
    
    // user in db
    let userFromDb;
    try {
      userFromDb = await db.one(
        'select * from appuser where email=$1 and dl_number=$2 and countryid=$3',
        [newTestUser.email, newTestUser.dl_number, newTestUser.countryid]);
    } catch (e) {
      console.log('can be created when valid ERROR from db:', e);
    }
    
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

describe('existing user', () => {
  beforeAll(async () => {
    await createUser(newTestUser);
  });
  
  test('can login with valid credentials', async () => {
    const response = await api.post('/api/user/login').send(existingTestUser);
    console.log('can login with valid credentials ERROR:', response.body.error);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  
  test('can not login with invalid credentials', async () => {
    const response = await api.post('/api/user/login').
      send({...existingTestUser, password: '123'});
    expect(response.status).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });
});

afterAll(db.$pool.end);