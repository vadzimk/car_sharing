import express from 'express';
import db from '../db/index.js';

const testRouter = express.Router();

testRouter.get('/date', async (req, res) => {
  try {
    const result = await db.one('SELECT NOW()');
    res.send(`current time ${result.now}`);
  } catch (err) {
    console.log(err.stack);
  }
  
});

testRouter.delete('/email', async (req, res, next) => {
  const email = req.body.email;
 
  try {

    const text = 'delete from "appuser" where email=$1';
    const values = [email];
    
    await db.none(text, values);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

export default testRouter;