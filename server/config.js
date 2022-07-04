import dotenv from 'dotenv';

dotenv.config();

const config = {
  node_env: process.env.NODE_ENV,
  PORT: process.env.PORT || 3001,
  db: {
    connectionString: process.env.DATABASE_URL_PRODUCTION,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
  oci: {
    namespaceName: process.env.OCI_NAMESPACE,
    bucketName: process.env.OCI_BUCKET,
    tenancy: process.env.OCI_CLI_TENANCY,
    compartment: process.env.OCI_COMPARTMENT,
  }
};

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV ===
  'test') {
  config.db = {connectionString: process.env.DATABASE_URL_TEST};
} 
if(process.env.GITHUB_ACTIONS){
  config.db = {connectionString: process.env.DATABASE_URL_TEST};
}

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('connectionString', config.db
  .connectionString);

export default config;