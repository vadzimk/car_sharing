import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3001,
  db: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
};

if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV ===
  'test') && !process.env.GITHUB_ACTIONS) {
  
  config.db = {connectionString: process.env.DATABASE_URL_LOCAL};
  
}

export default config;