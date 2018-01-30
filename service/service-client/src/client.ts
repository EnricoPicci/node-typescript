import { Observable } from 'rxjs/Observable';

import {httpPostRequestAsObs} from 'node-typescript-utils-enrico';
import {User} from 'service-interface';

export function addUser(id: string, name: string): Observable<any> {
    const url = 'https://2y68nbptvk.execute-api.us-east-1.amazonaws.com/dev/addUser/post';
    const user = new User(id, name);
    const validationResult = user.validate();
    if (!validationResult.isValid) {
        throw new Error('user not valid /n' + validationResult.getErrorMessage());
    }
    return httpPostRequestAsObs(url, user);
}
