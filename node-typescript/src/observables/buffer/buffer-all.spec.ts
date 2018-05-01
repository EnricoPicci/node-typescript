
import 'mocha';
import { expect } from 'chai';

import {bufferAll} from './buffer-all';

describe('bufferAll function', () => {

  it('buffers all the items emitted by an observable and emits all of them when the source observable completes', done => {
    const numberOfEventsEmitted = 9;
    bufferAll(numberOfEventsEmitted)
    .subscribe(
      numbers => {
        expect(numbers.length).to.equal(numberOfEventsEmitted);
      },
      error => done(error),
      () => done()
    )
  });

});
