import { User } from './user';
import { expect } from 'chai';
import 'mocha';

describe('User class', () => {

  it('the validation should succeed', () => {
    const user = new User('123', 'John');
    expect(user.isValid()).to.equal(true);
  });

  it('the validation should NOT succeed', () => {
    const user = new User('123', 'John');
    user.name = null;
    expect(user.isValid()).to.equal(false);
  });

  it('the validation should succeed', () => {
    const user = new User('123', 'John');
    const userAsServiceInput = user.asServiceInput();
    expect(userAsServiceInput).to.not.equal(null || undefined);
    const userJson = JSON.parse(userAsServiceInput);
    expect(userJson.id).to.equal(user.id);
    expect(userJson.name).to.equal(user.name);
  });

});
