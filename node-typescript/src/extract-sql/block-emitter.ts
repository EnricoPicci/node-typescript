// Split the Array<string> received as input in blocks each of size blockSize
// returns an Observable which emits the sequence of blocks and terminates when all blocks have been emitted
// the Observable emits when the BlockEmitter.next() method is invoked

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

export class BlockEmitter {
    blocks = new Array<Array<string>>();
    currentBlockIndex = -1;
    subject = new Subject<Array<string>>();

    constructor(private strings: Array<string>, private blockSize: number) {
        while (this.strings.length > 0) {
            this.blocks.push(this.strings.splice(0, this.blockSize));
        }
    }

    getObservable() {
        return this.subject.asObservable();
    }

    next() {
        if (this.currentBlockIndex < this.blocks.length - 1) {
            // need to increment the index before invoking next to avoid infite loops
            // specifically when the subscriber invokes functions which are executed synchronously
            // in such cases, if we increment the index afte the invocation of the next method
            // the increment instruction if never reached and the loop becomes infinite
            this.currentBlockIndex++;
            this.subject.next(this.blocks[this.currentBlockIndex]);
        } else {
            this.subject.complete();
        }
    }
    
}

// emits a number of times defined by its size and then completes
export class CounterEmitter {
    currentIndex = 0;
    subject = new BehaviorSubject<number>(0);
    private subjectObs: Observable<number>;

    constructor(public counterSize: number) {
    }

    getObservable() {
        if (!this.subjectObs) {
            this.subjectObs = this.subject.asObservable();
        }
        return this.subjectObs;
        // return this.subject.asObservable().share();
    }

    next() {
        if (this.currentIndex < this.counterSize - 1) {
            // need to increment the index before invoking next to avoid infite loops
            // specifically when the subscriber invokes functions which are executed synchronously
            // in such cases, if we increment the index afte the invocation of the next method
            // the increment instruction if never reached and the loop becomes infinite
            this.currentIndex++;
            this.subject.next(this.currentIndex);
        } else {
            this.subject.complete();
        }
    }
    
}
