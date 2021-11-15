/* eslint-disable no-unused-vars */

import express from 'express';
import yup from 'yup';
import db, {pgp} from '../db/index.js';
import middleware from '../middleware.js';

import {getPutUrl} from '../aws/s3.js';
import queries from '../db/model.js';

const listingRouter = express.Router();

/**
 * @sets req.decodedToken
 * */
listingRouter.use(middleware.decodeHostToken);

const transmissionOptions = ['A', 'M'];
const categoryOptions = [
  'Small',
  'Medium',
  'Large',
  'Estate',
  'Premium',
  'Minivan',
  'SUV'];

listingRouter.post('/', async (req, res, next) => {
  
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

// get-host-listings
listingRouter.get('/', async (req, res, next) => {
  const userId = req.decodedToken.id;
  const {fromDate, toDate} = req.query;
  console.log('get /listing query', req.query);
  const text = queries.listing_getall;
  
  try {
    const listings = await db.any(text, [userId, fromDate, toDate]);
    res.status(200).json({listings});
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

// update-listing
listingRouter.put('/', async (req, res, next) => {
  const userId = req.decodedToken.id;
  
  const {
    id,
    plate, // implemented update
    make,  // implemented update
    model, // implemented update
    year,  // implemented update
    transmission, // implemented update
    seat_number, // implemented update
    large_bags_number, // implemented update
    miles_per_rental, // implemented update
    active, // implemented update
    category, // implemented update
    base_rate,  // implemented update
    fee, // implemented update
    location_id, // implemented update
    addr_line2,
    addr_line1,
    zipcode,
    num_days_rented,
    sale_total,
  } = req.body;
  
  // TODO add validation to update-listing
  console.log('put /listing req.body', req.body);
  
  const text_listing_location = 'insert into listing_location (locationid, listingid, "timestamp") values ($1, $2, CURRENT_TIMESTAMP) returning locationid as location_id;';
  const text_appuser_location = 'select id from appuser_location where appuserid=$1 and locationid=$2;';
  const text_location = 'select id as location_id, addr_line1, addr_line2, zipcode from location where id=$1;';
  const text_rate = 'insert into rate (base_rate) values ($1) returning id as rate_id, base_rate;';
  const text_listing_rate = 'insert into listing_rate (listingid, rateid, "timestamp") values ($1, $2, CURRENT_TIMESTAMP);';
  const text_insurance = 'insert into insurance (fee) values ($1) returning id as insurance_id, fee;';
  const text_listing_insurance = 'insert into listing_insurance (insuranceid, listingid, "timestamp") values ($1, $2, CURRENT_TIMESTAMP);';
  const listing_columns = [
    'plate',
    'make',
    'model',
    'year',
    'transmission',
    'seat_number',
    'large_bags_number',
    'miles_per_rental',
    'active',
    'category',
  ];
  
  const listing_data = Object.keys(req.body).
    filter(k => listing_columns.includes(k)).
    reduce((obj, key) => ({...obj, [key]: req.body[key]}), {});
  
  console.log('listing_data', listing_data);
  console.log('listing_data_keys', Object.keys(req.body).
    filter(k => listing_columns.includes(k)));
  try {
    const result = await db.tx(async t => {
      let result = {id};
      if (location_id) {
        await t.one(text_appuser_location, [userId, location_id]); // verify this location belongs to this user
        const location_id_result = await t.one(text_listing_location,
          [location_id, id]);
        const location_result = await t.one(text_location,
          [location_id_result.location_id]);
        result = {...result, ...location_result};
        console.log('put /listing listing_location result', result);
      }
      if (Object.keys(listing_data).length) {
        console.log('begin listing_data', listing_data);
        const query_listing = pgp.helpers.update(listing_data,
          Object.keys(listing_data),
          'listing') + ' where id=$1' +
          ` returning ${Object.keys(listing_data).toString()}`;
        console.log('query_listing', query_listing);
        const listing_result = await t.one(query_listing, [id]);
        result = {...result, ...listing_result};
      }
      if (typeof base_rate !== 'undefined') {
        const rate_result = await t.one(text_rate, [base_rate]);
        console.log('rate_result', rate_result);
        await t.none(text_listing_rate, [id, rate_result.rate_id]);
        result = {...result, base_rate: rate_result.base_rate};
      }
      if (typeof fee !== 'undefined') {
        // TODO implement update
        const insurance_result = await t.one(text_insurance, [fee]);
        await t.none(text_listing_insurance,
          [insurance_result.insurance_id, id]);
        result = {...result, fee: insurance_result.fee};
      }
      return result;
    });
    console.log('listing_update', result);
    res.status(200).json({listing_update: result});
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

listingRouter.delete('/delete-host-listing', async (req, res, next) => {
  const userId = req.decodedToken.id;
  const text_appuser_listing_findid = 'select id as appuser_listing_id from appuser_listing where appuserid=$1 and listingid=$2;';
  const text_listing = 'update listing set active=false where id=$1';
  const text_appuser_listing_delete = 'update appuser_listing set deleted=true where id=$1;';
  try{
    await db.tx(async t=>{
      const appuser_listing_result =  await t.one(text_appuser_listing_findid, [userId, req.body.id]);
      console.log('appuser_listing_result', appuser_listing_result);
      await t.none(text_listing, [req.body.id]);
      await t.none(text_appuser_listing_delete, [appuser_listing_result.appuser_listing_id]);
    });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
});

export default listingRouter;