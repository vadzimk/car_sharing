/* eslint-disable no-unused-vars */

import express from 'express';
import db, {pgp} from '../db/index.js';
import middleware from '../middleware.js';
import listingRouter from './listingRouter.js';


const locationRouter = express.Router();

/**
 * @sets req.decodedToken
 * */
locationRouter.use(middleware.decodeHostToken);


locationRouter.post('/add-location', async (req, res, next) => {
  const userId = req.decodedToken.id;
  console.log('/add-location req.body', req.body);
  const {addr_line2, addr_line1, zipcode} = req.body.newLocation;
  console.log('/add-location body', addr_line1, addr_line2, zipcode);
  const text_location = 'insert into location(addr_line2, addr_line1, zipcode) values ($1, $2, $3) returning *;';
  const text_appuser_location = 'insert into appuser_location(locationid, appuserid) values ($1, $2) returning id;';
  
  try {
    const result = await db.tx(async t => {
      await t.one('select * from zip where code=$1', [zipcode]); // if not found will abort
      console.log('zip found');
      const location = await t.one(text_location,
        [addr_line2, addr_line1, zipcode]);
      console.log('inserted location', location);
      console.log('appuserlocation values', location.id, userId);
      await t.one(text_appuser_location, [location.id, userId]);
      console.log('inserted appuserlocation');
      return location;
    });
    res.status(200).json({location: result});
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});



export default locationRouter;