import { ciaoMondo } from './ciao-mondo';
import { expect } from 'chai';
import 'mocha';

describe('ciaoMondo function', () => {

  it('should return Ciao Mondo', () => {
    const result = ciaoMondo();
    expect(result).to.equal('Ciao Mondo');
  });

});
