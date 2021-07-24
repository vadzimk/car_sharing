import pg from 'pg';
const { Pool } = pg;
import config from './config.js';


const options = config.db;
  
const pool = new Pool(options);
pool
  .connect()
  .then(() => console.log('connected to db'))
  .catch((err) => console.error('connection error', err.stack));

   
export default pool;