import { expect } from 'chai';
import 'mocha';

import {MyClass} from './my-class';

describe('doSomethingWithName object method', () => {

    it('calls the object method passing the callback', done => {
        const myClass = new MyClass();
        const name = 'I am your class';
        myClass.name = name;
        const myCallback = err => {
            if(err) {
                console.error(err);
                done(err);
            } else {
                console.log('the name of my class is ' + myClass.name);
                expect(myClass.name).to.equal(name);
                done();
            }
        };
        myClass.doSomethingWithName(myCallback)
    });

});
