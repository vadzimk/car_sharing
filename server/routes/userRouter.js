import express from 'express';

import bcrypt from 'bcrypt';
import db from '../db/index.js';

const userRouter = express.Router();

userRouter.post('/',
  async (req, res, next) => {
    const body = req.body;

    if (!body.password || body.password.length < 3) {
      // TODO validate all fields
      return res.status(400).json({error: 'password must be at least 3 characters long'});
    }

    console.log('dl_number', body.dl_number);
    const passwordhash = await bcrypt.hash(body.password, 10);

    try {
      const client = await db.getClient();
      const text = 'insert into appuser (first_name, last_name, dl_number, dl_date, countryid, phone, email, passwordhash, ishost) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      const values = [body.first_name, body.last_name, body.dl_number, body.dl_date, body.countryid, body.phone, body.email, passwordhash, body.ishost];
      await client.query(text, values);
      client.release();
      res.status(200).end();
    } catch (e) {
      res.status(400).json({error: e.message});
      return next(e);
    }
  });


// userRouter.get('/',
//   async (req, res, next) => {
//     try {
//       const users = await User.find({})
//         .populate('blogs', {url: 1, title: 1, author: 1, id: 1})
//       res.json(users);
//     } catch (e) {
//       return next(e);
//     }
//   });


export default userRouter;