/* eslint-disable no-unused-vars */

import express from 'express';
import db from '../db/index.js';
import middleware from '../middleware.js';

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

locationRouter.get('/', async (req, res, next) => {
  // get host locations
  const text_locations = 'select s5.locationid, s5.addr_line2, s5.addr_line1, s5.zipcode, s5.city, s5.country, state.name as state, state.abbreviation as state_abbr\n' +
    'from (\n' +
    '         select s4.*, country.name as country\n' +
    '         from (\n' +
    '                  select s3.*, city.name as city, city.countryid, city.stateid\n' +
    '                  from (\n' +
    '                           select s2.*, zip.cityid\n' +
    '                           from (\n' +
    '                                    select s1.locationid, location.addr_line2, location.addr_line1, location.zipcode\n' +
    '                                    from (select appuser_location.locationid\n' +
    '                                          from appuser_location\n' +
    '                                          where appuserid = $1) as s1\n' +
    '                                             join location on location.id = s1.locationid) as s2\n' +
    '                                    join zip on zip.code = s2.zipcode) as s3\n' +
    '                           join city on city.id = s3.cityid) as s4\n' +
    '                  join country on country.id = s4.countryid) as s5\n' +
    '         join state on state.id = s5.stateid';
  
  try {
    const hostLocations = await db.any(text_locations, [req.decodedToken.id]);
    res.status(200).json(hostLocations);
  } catch (e) {
    res.status(400).json({error: e.message});
    return next(e);
  }
  
});

export default locationRouter;