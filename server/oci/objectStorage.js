import * as objectstorage from 'oci-objectstorage';
import provider from './provier.js';
import config from '../config.js';

const client = new objectstorage.ObjectStorageClient({
  authenticationDetailsProvider: provider,
});

// test object storage connection and buckets
(async () => {
  const listBucketsRequest = {
    namespaceName: config.oci.namespaceName,
    compartmentId: config.oci.compartment,
  };
  
  try {
    // https://docs.oracle.com/en-us/iaas/tools/typescript/2.33.0/classes/_objectstorage_lib_client_.objectstorageclient.html#listallbuckets
    const listBucketsResponse = await client.listBuckets(listBucketsRequest);
    console.log('OCI listBucketsResponse', listBucketsResponse);
  } catch (error) {
    console.log('listBuckets Failed with error  ' + error);
  }
})();


export const getPutUrl = async (Key) => {
  try {
    // Create a request and dependent object(s).
    const createPreauthenticatedRequestDetails = {
      name: 'my-image-upload',
      objectName: Key,
      accessType:
      objectstorage.models.CreatePreauthenticatedRequestDetails.AccessType.ObjectReadWrite,
      timeExpires: new Date(Date.now() + 60_000*5) // in five minutes
    };
    
    const createPreauthenticatedRequestRequest = {
      namespaceName: config.oci.namespaceName,
      bucketName: config.oci.bucketName,
      createPreauthenticatedRequestDetails: createPreauthenticatedRequestDetails,
    };
    
    // Send request to the Client.
    // https://docs.oracle.com/en-us/iaas/api/#/en/objectstorage/20160918/PreauthenticatedRequest/
    const createPreauthenticatedRequestResponse = await client.createPreauthenticatedRequest(
      createPreauthenticatedRequestRequest
    );
    return createPreauthenticatedRequestResponse.accessUri;
  } catch (error) {
    console.log('createPreauthenticatedRequest Failed with error  ' + error);
  }
};