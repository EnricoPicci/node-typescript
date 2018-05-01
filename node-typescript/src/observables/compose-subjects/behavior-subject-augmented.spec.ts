
import {BehaviourSubjectAugmented} from './behavior-subject-augmented';

import { expect } from 'chai';
import 'mocha';

describe('BehaviourSubjectAugmented', () => {

  it('emits 1 number and then completes', done => {
    const startValue = 1;
    const bs = new BehaviourSubjectAugmented<number>(startValue, (p, q) => p === q);
    
    bs.asObservable().subscribe(
      num => {
        expect(num).to.equal(startValue);
      },
      error => console.error(error),
      () => done()
    )
    setTimeout(() => bs.complete(), 100);
  });

  it('emits 2 numbers out of the 3 injected, given the comparison criteria', done => {
    const startValue = 1;
    const comparer = (p, q) => {
        const resp = p === q;
        console.log('pq', p, q, resp);
        return resp;
    };
    const bs = new BehaviourSubjectAugmented<number>(startValue, comparer);

    setTimeout(() => bs.next(1), 10);
    setTimeout(() => bs.next(2), 20);

    let count = 0;
    
    bs.asObservable().subscribe(
        data => {
            count++;
            console.log(data);
        },
        error => console.error(error),
        () => {
            expect(count).to.equal(2);
            done();
        }
    )
    setTimeout(() => bs.complete(), 100);
  });

  it('gets the last value emitted', done => {
    const startValue = 1;
    const comparer = (p, q) => {
        const resp = p === q;
        console.log('pq', p, q, resp);
        return resp;
    };
    const bs = new BehaviourSubjectAugmented<number>(startValue, comparer);

    let lastValueEmitted;
    setTimeout(() => bs.next(2), 10);
    setTimeout(() => lastValueEmitted = bs.getValue(), 15);
    setTimeout(() => bs.next(1), 20);
    
    bs.asObservable().subscribe(
        null,
        error => console.error(error),
        () => {
            expect(lastValueEmitted).to.equal(2);
            done();
        }
    )
    setTimeout(() => bs.complete(), 100);
  });

})
