import common from 'oci-common';

// picks up configuration from environment variables
// https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clienvironmentvariables.htm#CLI_Environment_Variables
const provider = new common.ConfigFileAuthenticationDetailsProvider();

export default provider;