import {readFileSync} from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const queries={
  listing_getall: readFileSync(__dirname + '/listing_getall.sql', 'utf8')
};

export default queries;