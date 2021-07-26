import db from '../db/index.js';
import supertest from 'supertest';
import app from '../app.js';

let token;
const api = supertest(app);
beforeAll(async () => {
  const text = 'delete from appuser';
  try{
    await db.none(text);
  } catch (e){
    console.log(e);
  }

});

describe('new user', () => {
  test('can be created', async () => {
    const newUser = {
      'first_name': 'First',
      'last_name': 'Last',
      'dl_number': '9999',
      'dl_date': '2000-12-31',
      'countryid': 247,
      'phone': '123456789',
      'email': 'walton03u_d512g@tahyu.com',
      'password': 'secret',
      'ishost': 'false'
    };

    await api.post('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(200);

    // user in db
    const userFromDb = await db.one('select * from appuser where email=$1 and dl_number=$2 and countryid=$3', [newUser.email, newUser.dl_number, newUser.countryid]);
    expect(userFromDb).toMatchObject({
      'email': newUser.email,
      'dl_number': newUser.dl_number,
      'countryid': newUser.countryid
    });

  });

});


afterAll(() => {
  db.$pool.end();
});