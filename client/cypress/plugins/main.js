/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

import promise from 'bluebird';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();
import config from './config.js';


const initOptions = {
  promiseLib: promise, // overriding the default (ES6 Promise);
};

const pgp = pgPromise(initOptions);

const db = pgp(config.db); // database instance

// console.log('configdb in cypress: ', config.db);
// console.log('node_env in configdb cypress: ', config.node_env);
// console.log('node_env', process.env.NODE_ENV)

export default (on) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task',
    {
      'deleteAppuser': async (email) => {
        try {
          
          const text = 'delete from "appuser" where email=$1';
          const values = [email];
          
          await db.none(text, values);
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
      
    });
  
};
