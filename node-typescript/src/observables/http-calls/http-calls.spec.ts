import { expect } from 'chai';
import 'mocha';

import * as _ from 'lodash';

import {typerStart, typerGoesBackAndForth, typerStartAndThenGoesBackAndForth} from './http-calls';

describe('typerStart function', () => {
    
    it('types one word adding one letter after the other in sequence', () => {
        const string = 'Toma';
        const expectedSequence = ['T', 'To', 'Tom', 'Toma'];
        const sequence = new Array<string>();
        typerStart(string).subscribe(
            typedString => {
                sequence.push(typedString);
            },
            error => console.error(error),
            () => expect(_.isEqual(sequence, expectedSequence)).to.equal(true)
        )
    });

});

describe('typerGoesBackAndForth function', () => {
    
    it('starts from a position in a word and then goes on typing that work back and forth randomly', () => {
        const word = 'Tomatoes';
        const sequence = new Array<string>();
        typerGoesBackAndForth(word, 4, 1000).subscribe(
            typedString => {
                sequence.push(typedString);
            },
            error => console.error(error),
            () => {
                const stringsNotSubstringOfWord = sequence.filter(s => word.slice(0, s.length) !== s);
                expect(stringsNotSubstringOfWord.length).to.equal(0);
                // statistically with many iterations we will have very likely at least an occurrence of the full word
                const occurrencesOfFullWord = sequence.filter(s => s === word);
                expect(occurrencesOfFullWord.length).to.greaterThan(0);
            }
        )
    });

});

describe('typerStartAndThenGoesBackAndForth function', () => {
    
    it('starts writing the first letters of a word and then goes on typing that work back and forth randomly', () => {
        const word = 'Tomatoes';
        const sequence = new Array<string>();
        typerStartAndThenGoesBackAndForth(word, 4, 100).subscribe(
            typedString => {
                sequence.push(typedString);
            },
            error => console.error(error),
            () => expect(sequence.length).to.equal(104)
        )
    });

});
