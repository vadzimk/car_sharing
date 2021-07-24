import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3001,
  db: {},
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  }
};

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  config.db.user = process.env.DEV_DB_USER;
  config.db.host = process.env.DEV_DB_HOST;
  config.db.database = process.env.DEV_DB_DB;
  config.db.password = process.env.DEV_DB_PASSWORD;
  config.db.port = process.env.DEV_DB_PORT;
} else {
  config.db.connectionString = process.env.DATABASE_URL;
  config.db.ssl =  {
    rejectUnauthorized: false
  };
}


export default config;