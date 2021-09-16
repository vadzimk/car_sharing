/* eslint-disable no-unused-vars */

import express from 'express';
import yup from 'yup';
import db, {pgp} from '../db/index.js';
import jwt from 'jsonwebtoken';
import {getPutUrl} from '../aws/s3.js';
import queries from '../db/model.js';

const listingRouter = express.Router();

/**
 * @sets req.decodedToken
 * */
listingRouter.use(async (req, res, next) => {
  try {
    console.log('req.token', req.token);
    const decodedToken = jwt.verify(req.token, process.env.JWT_KEY);
    req.decodedToken = decodedToken;
    
    if (!decodedToken.ishost) throw new Error('Unauthorized token');
    next();
  } catch (e) {
    res.status(401).json({error: e.message});
    return next(e);
  }
  const userId = req.decodedToken.id;
  console.log('userId', userId);
  try {
    const text_appuser = 'select id from appuser where id=$1';
    await db.one(text_appuser, [userId]);
  } catch (e) {
    res.status(401).json({error: 'user not found'});
    return next();
  }
  
});

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
  
  const userId = req.decodedToken.id;
  
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
  
  function toTitleCase (str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      },
    );
  }
  
  try {
    console.log('body from listingRouter/create', req.body);
    const listingForDb = {
      ...req.body,
      plate: req.body.plate.toUpperCase(),
      make: toTitleCase(req.body.make),
      model: toTitleCase(req.body.model.toUpperCase()),
      transmission: req.body.transmission.substr(0, 1).toUpperCase(),
    };
    if (Object.prototype.hasOwnProperty.call(listingForDb,
      'miles_per_rental') && !listingForDb.miles_per_rental) {
      delete listingForDb.miles_per_rental;
    }
    const validListing = await validationSchema.validate(listingForDb); // throws error if invalid
    
    const keysToUrls = {};
    req.body.images?.forEach((k) => {
      keysToUrls[k] = getPutUrl(k);
    });
    console.log('keysToUrls', keysToUrls);
    const text_listing = 'insert into listing (plate, make, model, year, transmission, seat_number, large_bags_number, category, miles_per_rental, active) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';
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
    
    const result = await db.tx(async t => {
      
      const listing = await t.one(text_listing, values_listing);
      console.log('inserted listing', listing);
      
      const appuser_listing = await t.one(text_appuser_listing,
        [userId, listing.id]);
      
      console.log('inserted appuser_listing', appuser_listing);
      return listing;
      
    });
    
    res.status(200).json({listing: result, keysToUrls});
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

/** @req.body {listingId , filename[]}
 * */
listingRouter.post('/imagekeys', async (req, res, next) => {
  // https://stackoverflow.com/questions/37300997/multi-row-insert-with-pg-promise
  const userId = req.decodedToken.id;
  
  try {
    // verify the listingid belongs to this appuserid
    const text_appuser_listing = 'select listingid from appuser_listing where appuserid=$1 and listingid=$2';
    const result_appuser_listing = await db.one(text_appuser_listing,
      [userId, req.body.listingId]);
    
    console.log('result_appuser_listing', result_appuser_listing);
    
    const {listingid} = result_appuser_listing;
    
    // insert filenames in image table
    const columnSet = new pgp.helpers.ColumnSet(['filename', 'listingid'],
      {table: 'image'});
    const values = req.body.keys.map(
      k => ({filename: k, listingid: listingid}));
    console.log('insert values', values);
    
    const query = pgp.helpers.insert(values, columnSet);
    await db.none(query);
    res.status(200);
  } catch (e) {
    res.status(400).json({error: e.message});
    return next();
  }
  
});

listingRouter.get('/get-host-listings', async (req, res, next) => {
  const userId = req.decodedToken.id;
  const {fromDate, toDate} = req.query;
  console.log('/get-host-listings query', req.query);
  const text = queries.listing_getall;
  
  try {
    const listings = await db.many(text, [userId, fromDate, toDate]);
    res.status(200).json({listings});
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

listingRouter.post('/add-location', async (req, res, next) => {
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
      const location = await t.one(text_location, [addr_line2, addr_line1, zipcode]);
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

export default listingRouter;