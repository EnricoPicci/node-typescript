import { validateCustomer, Customer } from './customer';
import { expect } from 'chai';
import 'mocha';

describe('validateCustomer function', () => {

  it('the validation should succeed', () => {
    const customer: Customer = {
        id: '123',
        lastName: 'Smith',
        email: 'john@smith.com'
    };
    const validationResult = validateCustomer(customer);
    expect(validationResult.isValid).to.equal(true);
  });

  it('the validation should NOT succeed because the id is null', () => {
    const customer: Customer = {
        id: null,
        lastName: 'Smith',
        email: 'john@smith.com'
    };
    const validationResult = validateCustomer(customer);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.errors.length).to.equal(1);
  });
  it('the validation should NOT succeed because the email is null', () => {
    const customer: Customer = {
        id: '123',
        lastName: 'Smith',
        email: null
    };
    const validationResult = validateCustomer(customer);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.errors.length).to.equal(1);
  });
  it('the validation should NOT succeed because the email is NOT valid', () => {
    const customer: Customer = {
        id: '123',
        lastName: 'Smith',
        email: 'john.smith@.com'
    };
    const validationResult = validateCustomer(customer);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.errors.length).to.equal(1);
  });

});
