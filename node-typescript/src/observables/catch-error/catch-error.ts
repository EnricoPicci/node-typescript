
import { Observable } from 'rxjs/Observable';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

export function generateError() {
    const strings = ['1', '12', '123', null, '12345'];
    return Observable.from(strings).pipe(
                map((num: any) => num.length)
            )
}

generateError().pipe(
    map(data => data * 2),
    // catchError(_err => Observable.of('An error occurred'))
    // catchError(_err => [{one: 1}, {two: 2}])
    // catchError(err => Observable.of([{one: 1}, {two: 2}, err]))
    catchError(err => [{one: 1}, {two: 2}, err])
    // catchError()
)
.subscribe(
    console.log,
    console.error,
    () => console.log('DONE')
)

