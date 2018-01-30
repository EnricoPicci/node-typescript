
import {User} from 'service-interface';
import {FunctionProcessingError} from './function-processing-error';

export interface AddUserResult {
    userId: string;
    message: string;
}

export function addUserImpl(data: any) {
    let response: FunctionProcessingError | AddUserResult;
    if (!data) {
        response = new FunctionProcessingError();
        response.message = 'addUser function - No user data passed in';
    } else {
        const user = new User(data.id, data.name);
        const validationResult = user.validate();
        if (!validationResult.isValid) {
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
          userId: data.id,
          message: 'user added',
        };
    }
    return response;
}

function doAddUserStuff() {
    // DO STUFF
}
