
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import {random_0_1, randomTick} from '../../utils/random-generators';
import {httpGetRequestAsObs} from '../../utils/http';


export const typerStart = (string2write: string) => {
    let typedString = '';
    const typerObs = Observable.from(string2write.split(''))
                                    .map(s => typedString = typedString + s);
    return typerObs;
}

export const typerGoesBackAndForth = (string2write: string, startPosition: number, iterations: number) => {
    let typedString = string2write.slice(0, startPosition);
    let position = startPosition;
    const typerObs = Observable.range(0, iterations)
                                    .map(_n => {
                                        if (random_0_1() > 0) {
                                            if (position < string2write.length) {
                                                typedString = typedString + string2write[position];
                                                position++;
                                            }
                                        } else {
                                            if (typedString.length > 0) {
                                                typedString = typedString.slice(0, typedString.length - 1);
                                                position--;
                                            }
                                        }
                                        return typedString;
                                    });
    return typerObs;
}

export const typerStartAndThenGoesBackAndForth = (string2write: string, startBackFortPosition: number, iterations: number) => {
    return typerStart(string2write.slice(0,startBackFortPosition)).concat(
            typerGoesBackAndForth(string2write, startBackFortPosition, iterations));
}

export const typerStartAndThenGoesBackAndForthWithInterval = (string2write: string, 
                                                                startBackFortPosition: number, 
                                                                iterations: number,
                                                                interval: number) => {
    return Observable
            .interval(interval)
            .zip(typerStartAndThenGoesBackAndForth(string2write, startBackFortPosition, iterations), (_n, s) => s);
}

export const typerStartAndThenGoesBackAndForthWithRandomDelay = (string2write: string, 
                                                                    startBackFortPosition: number, 
                                                                    iterations: number,
                                                                    delayMin: number,
                                                                    delayMax: number) => {
    return randomTick(delayMin, delayMax, iterations)
            .zip(typerStartAndThenGoesBackAndForth(string2write, startBackFortPosition, iterations), (_n, s) => s);
}

// https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html
export const typeAndCallHttp = (string2write: string, 
                                startBackForthPosition: number, 
                                iterations: number,
                                delayMin: number,
                                delayMax: number,
                                debounceTime: number) => {
    return typerStartAndThenGoesBackAndForthWithRandomDelay(string2write, startBackForthPosition, iterations, delayMin, delayMax)
            .filter(s => s.length > 0)
            // non empty strings are passed to the next step
            .do(s => console.log('-->', s))
            .debounceTime(debounceTime)
            // only if the user has types 1 time only within the debounceTime interval we pass to the next step
            .do(s => console.log('============>', s))
            // to move to the next step the string must be different from the preious one
            .distinctUntilChanged()
            .do(s => console.log('XXXXXXXXXXXXXXXXXXXXXXXXX>', s))
            // switchMap ensures that the previous http request, is still in-flight, is terminated and that we SWITCH to the next one
            // this is the safeguard against out-of-order responses (i.e. the last response received is related not to the last request sent)
            .switchMap(s => httpGetRequestAsObs(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${s}&namespace=0&limit=10`))
}


