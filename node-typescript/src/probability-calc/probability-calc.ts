
// Calculates the probability of the occurence of a certain value at least on one dice 
// if some dices, with a certain number of possible values, are thrown
//  diceCardinality: the number of values a dice take if thrown
//  numberOfDices: the number of dices thrown
// EXAMPLE
//  the probability that the value 1 occurs at least on one dice with 6 faces if 2 dices are thrown is 11/36
export function probabilityOfOneOccurrence(diceCardinality: number, numberOfDices: number) {
    let accumulator = 0;
    for (let i = 1; i <= numberOfDices; i++) {
        accumulator = accumulator + Math.pow(diceCardinality, numberOfDices - i) * Math.pow((diceCardinality - 1), (i-1));
    }
    return accumulator/Math.pow(diceCardinality, numberOfDices);
}

import {randomIntInc} from '../utils/random-generators';
export function diceThrowSimulation(diceCardinality: number, numberOfDices: number, numberOfThrows: number) {
    const diceThrows = new Array<Array<number>>();
    for (let i = 0; i < numberOfThrows; i++) {
        const diceThrow = new Array<number>();
        for (let j = 0; j < numberOfDices; j++) {
            diceThrow.push(randomIntInc(1, diceCardinality));
        }
        diceThrows.push(diceThrow);
    }
    return diceThrows;
}
