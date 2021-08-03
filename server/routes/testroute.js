import express from 'express';
import db from '../db/index.js';

const testRouter = express.Router();

testRouter.get('/date', async (req, res) => {
  try {
    const result = await db.one('SELECT NOW()');
    res.send(`current time ${result.now}`);
    // res.send('hello from current time');
  } catch (err) {
    console.log(err.stack);
  }
  
});

testRouter.delete('/reset-table/:tableName', async (req, res, next) => {
  const tableName = req.params.tableName;
  const key = req.body.key;
  const value = req.body.value;
  try {
    const text = 'delete from $1 where $2=$3';
    const values = [tableName, key, value];
    await db.none(text, values);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

export default testRouter;