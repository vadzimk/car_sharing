import common from 'oci-common';

// picks up configuration from environment variables
// https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clienvironmentvariables.htm#CLI_Environment_Variables
//   user=OCI_CLI_USER
//   fingerprint=OCI_CLI_FINGERPRINT
//   key_file=OCI_CLI_KEY_FILE
//   tenancy=OCI_CLI_TENANCY
//   OCI_COMPARTMENT


// const provider = new common.ConfigFileAuthenticationDetailsProvider('~/.oci/config');
const provider = new common.ConfigFileAuthenticationDetailsProvider('.oci/config');

export default provider;