import express, { Response, Request } from 'express';
import logger from './src/utils/logger';
import connect from './src/utils/connect';
import routes from './src/routes';
import deserializeUser from './src/middleware/deserializeUser';
import config from './src/config/default';

const port = config.port as number;

const app = express();

// Parse the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(deserializeUser);

// API Access Policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.listen(port, async () => {
  logger.info(`Server listening at http://localhost:${port}`);

  await connect();

  routes(app);
});
