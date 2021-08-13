/* eslint-disable no-unused-vars */

import express from 'express';
import yup from 'yup';
import db from '../db/index.js';
import jwt from 'jsonwebtoken';

const listingRouter = express.Router();

const transmissionOptions = ['A', 'M'];
const categoryOptions = [
  'Small',
  'Medium',
  'Large',
  'Estate',
  'Premium',
  'Minivan',
  'SUV'];

listingRouter.post('/create', async (req, res, next) => {
  let userId;
  try {
    console.log('req.token', req.token);
    const decodedToken = jwt.verify(req.token, process.env.JWT_KEY);
    
    userId = decodedToken.id;
    console.log('userId', userId);
    if (!decodedToken.ishost) throw new Error('Unauthorized token');
  } catch (e) {
    res.status(401).json({error: e.message});
    return next(e);
  }
  
  const validationSchema = yup.object().shape({
    plate: yup.string().required('plate is required'),
    make: yup.string().required('make is required'),
    model: yup.string().required('model is required'),
    year: yup.number().
      min(1900, 'year is too old').
      max(new Date().getFullYear(), 'year cannot be greater than current year').
      required('year is required'),
    transmission: yup.string().
      oneOf(transmissionOptions, 'transmission is not one of the options').
      required('transmission is required'),
    seat_number: yup.number().min(1).max(100).required('seat number required'),
    large_bags_number: yup.number().
      min(0).
      max(100).
      required('large bag numbers is required'),
    category: yup.string().
      oneOf(categoryOptions, 'category is not one of the options').
      required('category is required'),
    miles_per_rental: yup.number().min(1, 'miles per rental cannot be <1'),
  });
  
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  
  try {
    console.log('body from listingRouter', req.body);
    const listingForDb = {
      ...req.body,
      plate: req.body.plate.toUpperCase(),
      make: toTitleCase(req.body.make),
      model: toTitleCase(req.body.model.toUpperCase()),
      transmission: req.body.transmission.substr(0, 1).toUpperCase(),
    };
    if(Object.prototype.hasOwnProperty.call(listingForDb, 'miles_per_rental') && !listingForDb.miles_per_rental){
      delete listingForDb.miles_per_rental;
    }
    const validListing = await validationSchema.validate(listingForDb); // throws error if invalid
    
    const text_listing = 'insert into listing (plate, make, model, year, transmission, seat_number, large_bags_number, category, miles_per_rental, active) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id';
    const values_listing = [
      validListing.plate,
      validListing.make,
      validListing.model,
      validListing.year,
      validListing.transmission,
      validListing.seat_number,
      validListing.large_bags_number,
      validListing.category,
      validListing.miles_per_rental,
      validListing.active];
    
    const text_appuser_listing = 'insert into appuser_listing (appuserid, listingid) values ($1, $2) returning id';
    
    let values_appuser_listing = [userId];
    
    const result = await db.tx(async t => {
      
      const listing = await t.one(text_listing, values_listing);
      values_appuser_listing[1] = listing.id;
      await t.one(text_appuser_listing, values_appuser_listing);
      return listing.id;
  
    });
    
    res.status(200).json({id: result}).end();
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

export default listingRouter;