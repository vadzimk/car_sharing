import AWS from 'aws-sdk';
import config from '../config.js';

AWS.config.update(config.aws);
const s3 = new AWS.S3();

// test connection to s3
s3.listBuckets((err, data) => {
  if (err) {
    console.log('S3 Buckets Error', err);
  } else {
    console.log('S3 Buckets connected', data.Buckets);
  }
});

// //test generation of pre-signed url
// export const bucketParams = {
//   Bucket: 'image-bucket001',
//   Key: 'Half Neck Circles-222427275.mp4',
// };

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property

// https://aws.amazon.com/blogs/developer/creating-amazon-cloudfront-signed-urls-in-node-js/

// /**
//  *
//  * @param operation one of putObject, getObject
//  * */
// s3.getSignedUrl('getObject', bucketParams, function(err, url) {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('The URL is', url);
//   }
// });

export const getPutUrl = (Key) => {
  return s3.getSignedUrl('putObject',
    {
      Bucket: 'image-bucket001',
      Key,
      ContentType: 'image/*'
    });
};

export default s3;
