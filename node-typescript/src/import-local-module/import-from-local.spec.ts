import { toUpperCaseFromLocalUtil, sum2numbersFromLocalUtil, concatenateNumbersFromLocalUtil } from './import-from-local';
import { expect } from 'chai';
import 'mocha';

describe('functions using utils imported from local npm', () => {

  it('should uppercase', () => {
    const stringLowerCase = 'abc';
    const result = toUpperCaseFromLocalUtil(stringLowerCase);
    expect(result).to.equal('ABC');
  });

  it('should sum 2 numbers', () => {
    const number1 = 1;
    const number2 = 2;
    const result = sum2numbersFromLocalUtil(number1, number2);
    expect(result).to.equal(number1 + number2);
  });

  it('should concatenate numbers', () => {
    const numbers = [1, 2, 3, 4];
    const result = concatenateNumbersFromLocalUtil(numbers);
    expect(result).to.equal('1234');
  });

});
