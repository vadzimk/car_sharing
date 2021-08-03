import express from 'express';
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import cors from 'cors';
import testRouter from './routes/testroute.js';
import userRouter from './routes/userRouter.js';
import middleware from './middleware.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(middleware.getTokenFromRequest);
app.use(middleware.requestLogger);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.use('/api/test', testRouter);
app.use('/api/user', userRouter);

// checks in ci pipeline if the app is running after deployment
app.get('/api/health', (req, res) => {
  res.send('ok');
});
app.get('/api/version', (req, res) => {
  res.send('1'); // change to make sure new version is deployed
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


export default app;
