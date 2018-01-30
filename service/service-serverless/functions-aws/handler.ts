import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';

import {addUserImpl} from './src/add-user';
import {FunctionProcessingError} from './src/function-processing-error';

export const hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! I am your typescript function 123 ',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};


export const addUser: Handler = (event : APIGatewayEvent, context : Context, callback : Callback) => {
  const data = JSON.parse(event.body);
  const result = addUserImpl(data);
  const isError = result instanceof FunctionProcessingError;
  let response;
  if (isError) {
    response = {
      statusCode: 499,
      body: JSON.stringify({
        message: 'ERROR Serverless' + '\n' + result.message,
        input: event,
      }),
    };
  } else {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Serverless addUser function - completed successfully',
        result,
      }),
    };
  }


  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
