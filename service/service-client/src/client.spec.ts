
import 'mocha';

import {addUser} from './client';

describe('addUser function', () => {
    
    it('invokes the addUser function provided by out node client', done => {
        const id = '321';
        const name = 'Joe';
        let serviceCallResult;
        addUser(id, name).subscribe(
            data => serviceCallResult = data,
            error => console.error(error),
            () => {
                console.error('serviceCallResult', serviceCallResult);
                if (serviceCallResult.result.userId === id) {
                    return done()
                } else {
                    // console.error(serviceCallResult);
                    return done(new Error('serviceCallResult not as expected'));
                }
            }
        )
    });

});

