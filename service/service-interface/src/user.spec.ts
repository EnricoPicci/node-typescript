import { User } from './user';
import { expect } from 'chai';
import 'mocha';

describe('User class', () => {

  it('the validation should succeed', () => {
    const user = new User('123', 'John');
    const validationResult = user.validate();
    expect(validationResult.isValid).to.equal(true);
    expect(validationResult.getErrorMessage().length).to.equal(0);
  });

  it('the validation should NOT succeed', () => {
    const user = new User('123', 'John');
    user.name = null;
    const validationResult = user.validate();
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.getErrorMessage().length).to.greaterThan(0);
  });

  it('asServiceInput produces a correct json', () => {
    const user = new User('123', 'John');
    const userAsServiceInput = user.asServiceInput();
    expect(userAsServiceInput).to.not.equal(null || undefined);
    const userJson = JSON.parse(userAsServiceInput);
    expect(userJson.id).to.equal(user.id);
    expect(userJson.name).to.equal(user.name);
  });

});
