import db from '../db/index.js';
import supertest from 'supertest';
import app from '../app.js';

let token;
const api = supertest(app);

beforeAll(async () => {
  const text = 'delete from appuser where email=$1';
  const values = ['walton03u_d512g@tahyu.com'];
  try {
    await db.none(text, values);
  } catch (e) {
    console.log(e);
  }
  
});

describe('new user', () => {
  test('can be created when valid', async () => {
    const newUser = {
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
    
    const response = await api.post('/api/user/signup').
      set('Authorization', `Bearer ${token}`).
      send(newUser).
      expect(200);
    expect(response.body).not.toHaveProperty('error');
    
    // user in db
    const userFromDb = await db.one(
      'select * from appuser where email=$1 and dl_number=$2 and countryid=$3',
      [newUser.email, newUser.dl_number, newUser.countryid]);
    expect(userFromDb).toMatchObject({
      'email': newUser.email,
      'dl_number': newUser.dl_number,
      'countryid': newUser.countryid,
    });
    
  });
  
  test('can not be created when invalid', async () => {
    const newUser = {

      'last_name': 'Last',
      'dl_number': '9999',
      'dl_date': '2000-12-31',
      'countryid': 247,
      'phone': '123456789',
      'email': '',
      'password': 'secret',
      'ishost': 'false',
    };
    
    const response = await api.post('/api/user/signup').
      set('Authorization', `Bearer ${token}`).
      send(newUser).
      expect(400);
    expect(response.body).toHaveProperty('error');
    
    // user in db
    const userFromDb = await db.one(
      'select * from appuser where email=$1 and dl_number=$2 and countryid=$3',
      [newUser.email, newUser.dl_number, newUser.countryid]);
    expect(userFromDb).toMatchObject({
      'email': newUser.email,
      'dl_number': newUser.dl_number,
      'countryid': newUser.countryid,
    });
    
  });
  
});

afterAll(() => {
  db.$pool.end();
});