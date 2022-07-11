import common from 'oci-common';
import config from '../config.js';
// picks up configuration from environment variables
// https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clienvironmentvariables.htm#CLI_Environment_Variables
//   user=OCI_CLI_USER
//   fingerprint=OCI_CLI_FINGERPRINT
//   key_file=OCI_CLI_KEY_FILE
//   tenancy=OCI_CLI_TENANCY
//   OCI_COMPARTMENT

// const provider = new common.ConfigFileAuthenticationDetailsProvider('~/.oci/config');
// const provider = new common.ConfigFileAuthenticationDetailsProvider('.oci/config');

let provider;
try { // prevent app from crushing when it can't find config file
  provider = new common.ConfigFileAuthenticationDetailsProvider(config.oci.configurationFilePath);
} catch (e) {
  console.log('error from ConfigFileAuthenticationDetailsProvider', e);
}

export default provider;