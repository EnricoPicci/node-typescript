import { expect } from 'chai';
import 'mocha';

import {probabilityOfOneOccurrence, diceThrowSimulation} from './probability-calc';

describe('probabilityOfOneOccurrence function', () => {
    
    it('probability of getting at least one predefined value, e.g. 6, while launching 2 dices with 6 faces', () => {
        const diceFaces = 6;
        const numberOfDices = 2;
        const probability = probabilityOfOneOccurrence(diceFaces, numberOfDices);
        expect(probability).to.equal(11/36);
    });

});

describe('diceThrowSimulation function', () => {
    
    it('simulates some throws of dices', () => {
        const diceFaces = 6;
        const numberOfDices = 2;
        const numberOfThrows = 1000;
        const diceThrows = diceThrowSimulation(diceFaces, numberOfDices, numberOfThrows);
        expect(diceThrows.length).to.equal(numberOfThrows);
        diceThrows.map(diceThrow => {
            expect(diceThrow.length).to.equal(numberOfDices);
            diceThrow.map(diceValue => {
                expect(diceValue).to.be.gte(1);
                expect(diceValue).to.be.lte(diceFaces);
            })
        })
    });

});

describe('verify correctness of probability calculation comparing it with results of simulation', () => {
    
    it('verify correctness of probability calculation simulating 6 faces dices and 2 dices', () => {
        const numberOfThrows = 1000000;
        const diceFaces = 6;
        const numberOfDices = 2;
        const expectedProbability = 11/36;
        const diceThrowsWithAtLeast_1_One = diceThrowSimulation(diceFaces, numberOfDices, numberOfThrows)
                                                .filter(diceThrow => diceThrow.filter(value => value === 1).length > 0);
        const simulationError = expectedProbability - diceThrowsWithAtLeast_1_One.length/numberOfThrows;
        expect(Math.abs(simulationError)).to.lt(0.001);
        console.log('simulationError', simulationError);
    });
    it('verify correctness of probability calculation simulating 3 faces dices and 5 dices', () => {
        const numberOfThrows = 100000;
        const diceFaces = 3;
        const numberOfDices = 5;
        const expectedProbability = 211/243;
        const diceThrowsWithAtLeast_1_One = diceThrowSimulation(diceFaces, numberOfDices, numberOfThrows)
                                                .filter(diceThrow => diceThrow.filter(value => value === 1).length > 0);
        const simulationError = expectedProbability - diceThrowsWithAtLeast_1_One.length/numberOfThrows;
        expect(Math.abs(simulationError)).to.lt(0.001);
        console.log('simulationError', simulationError);
    });
    it('show the probability calculation simulating 25 faces dices and 10 dices', () => {
        const numberOfThrows = 100000;
        const diceFaces = 25;
        const numberOfDices = 10;
        const diceThrowsWithAtLeast_1_One = diceThrowSimulation(diceFaces, numberOfDices, numberOfThrows)
                                                .filter(diceThrow => diceThrow.filter(value => value === 1).length > 0);
        const probability = diceThrowsWithAtLeast_1_One.length/numberOfThrows;
        console.log('Probability with ' + diceFaces + ' faces and ' + numberOfDices + ' dices', probability);
    });

});
