import express from 'express';


const mapRouter = express.Router();

// eslint-disable-next-line no-unused-vars
mapRouter.get('/:q', async(req, res, next)=>{
  console.log(req.params);
  
});

export default mapRouter;
