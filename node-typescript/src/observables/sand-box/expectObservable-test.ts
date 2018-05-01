
import {Observable} from 'rxjs';
import { TestScheduler } from 'rxjs/testing/TestScheduler';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
// expect is from chai
// import { expect } from 'chai';
import * as chai from 'chai';

// const marbles = new TestScheduler((a, b) => a === b);
// const marbles = new TestScheduler((a, b) => {
//                         expect(a).to.deep.equal(b);
//                         return null;
//                     });

const marbles = new TestScheduler(chai.assert.deepEqual);

const source = marbles.createColdObservable('a-a-a-a');
// const map = source.mergeMap(a => Observable.of(a));
// const map = source.mergeMap(async a => a).do(data => {
//                                                 console.log(data.constructor.name);
//                                             });
// const promiseFunction = async a => a;
// const obsFunction = a => promiseFunction(a).then(a => Observable.of(a));
const obsFunction = a => Observable.of(a);
const map = source.mergeMap(a => obsFunction(a));
// map.subscribe(console.log)
marbles.expectObservable(map).toBe('a-a-a-a');
marbles.flush();
