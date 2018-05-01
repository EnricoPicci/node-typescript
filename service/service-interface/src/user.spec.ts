
import { expect } from 'chai';
import 'mocha';

import { User } from './user';

describe('User class', () => {

  it('the validation should succeed', () => {
    const user = new User({id: '123', name: 'John'});
    const validationResult = user.validate();
    expect(validationResult.isValid).to.equal(true);
    expect(validationResult.getErrorMessage().length).to.equal(0);
  });

  it('the validation should NOT succeed', () => {
    const user = new User({id: '123', name: 'John'});
    user.name = null;
    const validationResult = user.validate();
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.getErrorMessage().length).to.greaterThan(0);
  });

});
