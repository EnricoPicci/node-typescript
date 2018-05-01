
import {generateError} from './catch-retry';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

generateError()
.mergeMap(data => {
    return Observable.of(data)
            .catch(_err => Observable.empty());
})
.subscribe(
    num => console.log('number', num),
    err => console.error('error', err),
    () => console.log('DONE')
)




// generateError()
// .skip(4)
// .subscribe(
//     num => console.log('number', num),
//     err => console.error('error', err),
//     () => console.log('DONE')
// )

// let skipToResume = 0;
// let counter = 0;
// const strings = ['1', '12', '123', null, '12345'];
// Observable.from(strings)
// .skip(skipToResume)
// .map((num: any) => num.length)
// .do(() => counter++)
// .catch((_err, caught) => {
//     counter++;
//     console.log('counter', counter);
//     const obsOfOne = Observable.of('FOUND A PROBLEM');
//     skipToResume = counter;
//     return obsOfOne.concat(caught)
// })
// .subscribe(
//     num => console.log('number', num),
//     err => console.error('error', err),
//     () => console.log('DONE')
// )


// generateError()
// .subscribe(
//     num => console.log('number', num),
//     err => console.error('error', err),
//     () => console.log('DONE')
// )
