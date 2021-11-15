import express from 'express';


const offersRouter = express.Router();

// eslint-disable-next-line no-unused-vars
offersRouter.get('/', async(req, res, next)=>{
  // TODO implement offers
  // make, model, year, price, picture
  console.log(req.query);
  res.status(200).json([{id:1}]);
  
});

export default offersRouter;
