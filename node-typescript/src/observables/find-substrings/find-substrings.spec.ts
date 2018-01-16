import { emitNumberSequence, takeSubstring, rollingSubstrings, searchStringOccurrences,
          allIndexOf } from './find-substrings';
import { expect } from 'chai';
import 'mocha';

describe('emitNumberSequence function', () => {

  it('emits 5 numbers in sequence', () => {
    const numbers = [1, 2, 3, 4, 5];
    let count = 0;
    const sequence = emitNumberSequence(1, 5);
    sequence.subscribe(
      num => {
        expect(numbers[count]).to.equal(num);
        count++;
      },
      error => console.error(error),
      () => expect(count).to.equal(5)
    )
  });

});

describe('takeSubstring function', () => {
  
  it('takes a substring', () => {
    const string = '0123456789';
    const stringAndPosition = takeSubstring(2, 5, string);
    expect(stringAndPosition.string).to.equal('23456');
    expect(stringAndPosition.position).to.equal(2);
  });
  it('takes a substring starting from too late to get its full length', () => {
    const string = '0123456789';
    const stringAndPosition = takeSubstring(7, 5, string);
    expect(stringAndPosition.string).to.equal('789');
    expect(stringAndPosition.position).to.equal(7);
  });

});       

describe('rollingSubstrings function', () => {
  
  it('extract all substrings of a certain length from a string', () => {
    const stringToSearch = 'write whatever you want here';
    const length = 5;
    let count = 0;
    rollingSubstrings(stringToSearch, length)
      .subscribe(
        _stringAnsPosition => count++,
        error => console.error(error),
        () => expect(count).to.equal(stringToSearch.length)
      )
  });

}); 

describe('searchStringOccurrences function', () => {

  it('finds the positions of occurrences of a string in another string', () => {
    const stringToSearch = 'she is able to sit on the table which is not stable';
    const target = 'able';
    let count = 0;
    searchStringOccurrences(stringToSearch, target)
      .subscribe(
        _start => count++,
        error => console.error(error),
        () => expect(count).to.equal(3)
      )
  });
});


describe('allIndexOf function', () => {
  
  it('finds the positions of occurrences of a string in another string', () => {
    const stringToSearch = 'she is able to sit on the table which is not stable';
    const target = 'able';
    const indexes = allIndexOf(stringToSearch, target);
    expect(indexes.length).to.equal(3)
  });

})
