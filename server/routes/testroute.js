import express from 'express';
import pool from '../db.js';

const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
  try {
    const response = await pool.query('SELECT NOW()');
    res.send(`current time ${response.rows[0].now}`);
    // res.send('hello from current time');
  } catch (err) {
    console.log(err.stack);
  }


});


export default testRouter;