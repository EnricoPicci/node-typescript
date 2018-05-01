
import {Observable} from 'rxjs';

import {DoBeforeAfter} from './do-before-after';

// import { expect } from 'chai';
import 'mocha';

describe('DoBeforeAfter', () => {

  it('emits something before and after the event emitted by the original source', done => {
    const source = Observable.of('NOW');
    const beforeAfter = new DoBeforeAfter(source, data => console.log(data));
    
    beforeAfter.wrapped$.subscribe(
        null,
        error => console.error(error),
        () => done()
    )

  });


})
