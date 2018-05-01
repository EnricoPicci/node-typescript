
import {User} from 'service-interface';
import {FunctionProcessingError} from './function-processing-error';

export interface AddUserResult {
    userId: string;
    message: string;
}

export function addUserImpl(data: any) {
    let response: FunctionProcessingError | AddUserResult;
    let user: User;
    if (!data) {
        response = new FunctionProcessingError();
        response.message = 'addUser function - No user data passed in';
    } else {
        user = new User(data);
        const validationResult = user.validate();
        if (!validationResult.isValid) {
          console.log('data', data);
          const validationErrors = validationResult.errors;
          let message = 'addUser function';
          validationErrors.reduce((message, error) => message + '\n' + error);
          response = new FunctionProcessingError();
          response.message = message;
        }
    }
    if (!response) {
        // if you arrive here it means the a user has been passed and it is valid
        // DO STUFF
        doAddUserStuff();
        response = {
          userId: user.id,
          message: 'user added',
        };
    }
    return response;
}

function doAddUserStuff() {
    // DO STUFF
}
