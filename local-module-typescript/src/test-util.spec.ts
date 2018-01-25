import { TestUtil, TestUtilGranular } from './test-util';
import { expect } from 'chai';
import 'mocha';

describe('TestUtil class', () => {

  it('should move to upper case', () => {
    const testUtil = new TestUtil();
    const initialString = 'abcd';
    const result = testUtil.toUpperCase(initialString);
    expect(result).to.equal('ABCD');
  });


  it('should move to upper case using a granular import', () => {
    const testUtilGranular = new TestUtilGranular();
    const initialString = 'cde';
    const result = testUtilGranular.toUpperCase(initialString);
    expect(result).to.equal('CDE');
  });

});
