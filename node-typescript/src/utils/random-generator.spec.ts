import {randomIntExcl, random_0_1, random_signed_1} from './random-generators';
import { expect } from 'chai';
import 'mocha';

describe('randomIntExcl function', () => {
    
    it('generates 1000 numbers which can be integrr between 0 or 5, with 0 included and 5 excluded', () => {
    const numbers = new Array<number>();
    const iterations = 1000;
    for (let i = 0; i < iterations ; i++) {
        numbers.push(randomIntExcl(0, 5));
    }
    const occurences_of_0 = numbers.filter(n => n == 0).length;
    const occurences_of_5 = numbers.filter(n => n == 5).length;
    expect(occurences_of_0).to.greaterThan(0);
    expect(occurences_of_5).to.equal(0);
    });

});

describe('random_0_1 function', () => {

  it('generates 1000 numbers which can be either 0 or 1', () => {
    const numbers = new Array<number>();
    const iterations = 1000;
    for (let i = 0; i < iterations ; i++) {
        numbers.push(random_0_1());
    }
    const occurences_of_0 = numbers.filter(n => n == 0).length;
    const occurences_of_1 = numbers.filter(n => n == 1).length;
    expect(occurences_of_0).to.greaterThan(0);
    expect(occurences_of_1).to.greaterThan(0);
    expect(occurences_of_0 + occurences_of_1).to.equal(iterations);
  });

});

describe('random_signed_1 function', () => {
    
    it('generates 1000 numbers which can be either -1 or 1', () => {
        const numbers = new Array<number>();
        const iterations = 1000;
        for (let i = 0; i < iterations ; i++) {
            numbers.push(random_signed_1());
        }
        const occurences_of_negative_1 = numbers.filter(n => n == -1).length;
        const occurences_of_positive_1 = numbers.filter(n => n == 1).length;
        expect(occurences_of_negative_1).to.greaterThan(0);
        expect(occurences_of_positive_1).to.greaterThan(0);
        expect(occurences_of_negative_1 + occurences_of_positive_1).to.equal(iterations);
    });

});

import {randomTick} from './random-generators'; 
describe('randomTick function', () => {
    
    it('generates random numbers with random delays', () => {
        const timestamps = new Array<number>();
        const iterations = 10;
        const delayMin = 100;
        const delayMax = 300;
        randomTick(delayMin, delayMax, iterations).subscribe(
            _n => timestamps.push(Date.now()),
            e => console.error(e),
            () => {
                const delays = new Array<number>();
                for (let i = 1; i < timestamps.length; i++) {
                    delays.push(timestamps[i] - timestamps[i - 1]);
                }
                delays.map(d => expect(d).to.within(delayMin, delayMax));
                console.log('test randomTick done');
            }
        )
    });

});
