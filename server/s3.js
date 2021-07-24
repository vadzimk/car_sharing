import aws from 'aws-sdk';
import config from './config.js';

aws.config.update(config.aws);
const s3 = new aws.S3();


// test connection to s3
s3.listBuckets((err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data.Buckets);
  }
});

//test generation of pre-signed url
const bucketParams = {
  Bucket: 'video-bucket001',
  Key: 'Half Neck Circles-222427275.mp4',
};
s3.getSignedUrl('getObject', bucketParams, function (err, url) {
  if (err) {
    console.log('err', err);
  } else {
    console.log('The URL is', url);
  }
});


export default s3;
