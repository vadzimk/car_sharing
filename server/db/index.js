import promise from 'bluebird';
import pgPromise from 'pg-promise';
import config from '../config.js';

const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
};

export const pgp = pgPromise(initOptions);


const db = pgp(config.db); // database instance

export default db;