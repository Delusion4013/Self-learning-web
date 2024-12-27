const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`Event: ${JSON.stringify(event)}`);
  //Look in app.js for the actual session sending/retrieving code
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
