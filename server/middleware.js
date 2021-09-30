import jwt from 'jsonwebtoken';
import db from './db/index.js';

const requestLogger = (req, res, next) => {
  
  if (process.env.NODE_ENV !== 'test9') {
    // console.log('Method', req.method);
    // console.log('Path', req.path);
    console.log('Body', req.body);
    console.log('--------');
  }
  
  next();
};

// express error handler
// execution order of middleware is the same as the order that they are loaded into express with app.use func
const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {  // handles particular error if this is it
    return response.status(400).send({error: 'malformatted id'});
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'missing or invalid token'});
  }
  
  next(error);  // in all other situations passes the error to default express error handler
};

const getTokenFromRequest = (req, res, next) => {
  const authorization = req.get('authorization'); // http header value named 'authorization' e.g Authorization: Bearer alrg.rei.ariu
  console.log('authorization', authorization);
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring('bearer '.length);
  }
  req.token = token;
  next();
};

const decodeHostToken = async (req, res, next) => {
  console.log('hello from decodeHostToken');
  try {
    console.log('req.token', req.token);
    const decodedToken = jwt.verify(req.token, process.env.JWT_KEY);
    req.decodedToken = decodedToken;
    
    if (!decodedToken.ishost) {
      throw new Error('Unauthorized token');
    }
    
    const userId = req.decodedToken.id;
    console.log('userId', userId);
    try {
      const text_appuser = 'select id from appuser where id=$1';
      await db.one(text_appuser, [userId]);
      console.log('decodeHostToken success');
    } catch (e) {
      throw new Error('User not found');
    }
    next();
  } catch (e) {
    res.status(401).json({error: e.message});
    return next(e);
  }
  
};

export default {
  requestLogger,
  errorHandler,
  getTokenFromRequest,
  decodeHostToken,
};