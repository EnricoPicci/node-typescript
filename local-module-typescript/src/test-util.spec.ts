import { TestUtil } from './test-util';
import { expect } from 'chai';
import 'mocha';

describe('TestUtil class', () => {

  it('should move to upper case', () => {
    const testUtil = new TestUtil();
    const initialString = 'abcd';
    const result = testUtil.toUpperCase(initialString);
    expect(result).to.equal('ABCD');
  });

});
