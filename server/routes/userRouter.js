import express from 'express';

import bcrypt from 'bcrypt';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import db from '../db/index.js';
import {pgp} from '../db/index.js';

const userRouter = express.Router();

userRouter.post('/signup',
  async (req, res, next) => {
    
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    
    const validationSchema = yup.object().shape({
      first_name: yup.string().required('fist_name is required'),
      last_name: yup.string().required('last_name is required'),
      dl_number: yup.string().required('dl_number is required'),
      dl_date: yup.date().max(new Date(), 'dl_date must be in the past').
        required('dl_date is required'),
      countryid: yup.number().min(1, 'countryid is invalid'),
      phone: yup.string().matches(phoneRegExp, 'phone is invalid').
        required('required'),
      email: yup.string().
        email('email is invalid').
        required('email is required'),
      password: yup.string().
        min(5, 'password min length is 5').
        required('password is required'),
      
    });
    
    try {
      const validUser = await validationSchema.validate(req.body); // throws error if invalid
      // const validUser = req.body;
      const passwordhash = await bcrypt.hash(validUser.password, 10);
      const text = 'insert into appuser (first_name, last_name, dl_number, dl_date, countryid, phone, email, passwordhash, ishost) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      const values = [
        validUser.first_name,
        validUser.last_name,
        validUser.dl_number,
        validUser.dl_date,
        validUser.countryid,
        validUser.phone,
        validUser.email,
        passwordhash,
        validUser.ishost];
      await db.none(text, values);
      res.status(200).end();
    } catch (e) {
      res.status(400).json({error: e.message});
      return next(e);
    }
  });

userRouter.get('/countries', async (req, res, next) => {
  // test with all countries first
  
  try {
    const text = 'select * from country';
    const countries = await db.many(text);
    res.status(200).json(countries);
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

userRouter.post('/login', async (req, res, next) => {
  
  const validationSchema = yup.object().shape({
    email: yup.string().
      email('email format is invalid').
      required('email is required'),
    password: yup.string().required('password is required'),
  });
  
  try {
    const validLogin = await validationSchema.validate(req.body);
    
    const text = 'select id, email, ishost, passwordhash, first_name from appuser where email=$1';
    const values = [validLogin.email];
    
    const user = await db.one(text, values);
    const correct = await bcrypt.compare(validLogin.password,
      user.passwordhash);
    
    if (!correct) {
      return res.status(401)  // unauthorized - invalid password
        .json({error: 'invalid email or password'}).end();
    }
    
    // generate token for authorized user
    const userForToken = {
      id: user.id,
      email: user.email,
      ishost: user.ishost,
      first_name: user.first_name,
    };
    const token = jwt.sign(userForToken, process.env.JWT_KEY);
    res.status(200).send({
      token,
      first_name: user.first_name,
      email: user.username,
      ishost: user.ishost,
    });
  } catch (e) {
    if (e instanceof pgp.errors.QueryResultError) {
      res.status(401)  // unauthorized  - invalid email
        .json({error: 'invalid email or password'});
    } else {
      res.status(400).json({error: e.message}); // bad request
    }
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