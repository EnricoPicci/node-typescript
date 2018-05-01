//  code used in the answer for stackoverflow
// https://stackoverflow.com/questions/49254451/how-to-implement-long-pooling-stream-using-rxjs/49256181?noredirect=1#comment85515301_49256181

import {Observable} from 'rxjs';

method1('123')
.switchMap(res => callMethod2EverySecond(res.id))
.subscribe(
    res => {
       if (!res.success && res.errors) {console.error(res)}
       else {console.log('subscription processing', res)}
    },
    (err) => console.log(err),
    () => console.log('finished')
);

function callMethod2EverySecond(id) {
    return Observable.interval(10)
           .mergeMap(data => method2(id, data))
           .do(resp => console.log('resp', resp))
           .filter(resp => resp !== null)
           .take(1)
}

function method1(data: string) {
    return Observable.of({id: data});
}

function method2(id: string, interval: number) {
    const ret = randomIntInc(0,1) === 0 ? null : {success: true, errors: null, interval, id};
    return Observable
            .of(ret)
            .delay(randomIntInc(0,2000));
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
