import { isEmailValid } from './utils';
import { expect } from 'chai';
import 'mocha';

describe('isEmailValid function', () => {

  it('the validation should succeed', () => {
    const email = 'a.b@c.com';
    expect(isEmailValid(email)).to.equal(true);
  });

  it('the validation should NOT succeed', () => {
    const email = 'a.b@c';
    expect(isEmailValid(email)).to.equal(false);
  });

  it('the validation should NOT succeed because email is null', () => {
    var email;
    expect(isEmailValid(email)).to.equal(false);
  });

});
