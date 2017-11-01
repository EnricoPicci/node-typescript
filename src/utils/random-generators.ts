
// https://blog.tompawlak.org/generate-random-values-nodejs-javascript
export const randomIntExcl = (low, high) => {
    return Math.floor(Math.random() * (high - low) + low);
}
export const randomIntInc = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

export const random_0_1 = () => {
    return randomIntInc(0, 1);
}

export const random_signed_1 = () => {
    return randomIntInc(0, 1) === 0 ? -1 : 1;
}

export const random_letter = () => {
    const alphabet = 'abcdefghijlmenopqrstvwyz';
    return alphabet.split('')[randomIntExcl(0, alphabet.length)];
}

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/repeat';
// returns an Observable toat emits a random number with random delay for nTimes times
// https://stackoverflow.com/questions/41388199/how-to-create-an-infinite-observable-that-produces-random-numbers-at-random-inte
export const randomTick = (delayMin: number, delayMax: number, nTimes: number) => {
    return Observable.of('')
                .switchMap(_d => Observable
                                    .timer(randomIntExcl(delayMin, delayMax))
                                    .mapTo(randomIntInc(0, 1000)))
                .repeat(nTimes);
}
