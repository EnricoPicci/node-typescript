import 'mocha';


import {BlockEmitter, CounterEmitter} from './block-emitter';

describe('BlockEmitter class', () => {
    
    it(`emits 2 times and then completes`, done => {
        const block_size = 10;
        const arr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];
        const emitter = new BlockEmitter(arr, block_size);
        let blockEmittedCounter = 0;
        const blocks = new Array<Array<string>>();
        emitter.getObservable().subscribe(
            data => {
                blockEmittedCounter++;
                blocks.push(data);
            },
            err => done(err),
            () => {
                if (blocks.length !== 2) {
                    console.error('err', blocks);
                    return done('number of blocks expected wrong');
                }
                if (blockEmittedCounter !== 2) {
                    const err = 'only 2 emissions expected';
                    console.error('err', err);
                    return done(err);
                }
                if (blocks[blocks.length - 1].length !== 7) {
                    const err = '7 elements expected in the last block';
                    console.error('err', err);
                    return done(err);
                }
                return done();
            }
        )
        emitter.next();
        emitter.next();
        emitter.next();
    });

});




describe('BlockEmitter class', () => {
    
    it(`emits 4 times and then completes - the next command is given from within the subscribe code`, done => {
        const block_size = 5;
        const arr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];
        const emitter = new BlockEmitter(arr, block_size);
        let blockEmittedCounter = 0;
        const blocks = new Array<Array<string>>();
        emitter.getObservable().subscribe(
            data => {
                blockEmittedCounter++;
                blocks.push(data);
                emitter.next();
            },
            err => done(err),
            () => {
                if (blocks.length !== 4) {
                    console.error('err', blocks);
                    return done('number of blocks expected wrong');
                }
                if (blockEmittedCounter !== 4) {
                    const err = 'only 4 emissions expected';
                    console.error('err', err);
                    return done(err);
                }
                return done();
            }
        )
        
        // trigger the Observable
        emitter.next();
    });

});



describe('CounterEmitter class', () => {
    
    it(`emits 4 times and then completes - the next command is given from within the subscribe code`, done => {
        const emitter = new CounterEmitter(4);
        let emissionCounter = 0;
        const emissions = new Array<number>();
        emitter.getObservable().subscribe(
            _d => {
                emissionCounter++;
                emissions.push(emissionCounter);
                emitter.next();
            },
            err => done(err),
            () => {
                if (emissions.length !== 4) {
                    console.error('err', emissions);
                    return done('number of emissions is not what expected');
                }
                if (emissionCounter !== 4) {
                    const err = 'only 4 emissions expected';
                    console.error('err', err);
                    return done(err);
                }
                return done();
            }
        )
        
        // trigger the Observable
        emitter.next();
    });

});
