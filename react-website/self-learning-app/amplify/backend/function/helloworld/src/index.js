
/**
 * This is a simpler Lambda function that just returns Hello World to the user
 * You should even be able to just go to url/helloworld in your browser to see the response, or curl url/helloworld in console
 * @param {*} event 
 */
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
      headers: { //We need the CORS headers to be able to communicate between front-end and back end remotely
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
