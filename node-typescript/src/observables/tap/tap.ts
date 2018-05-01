import { interval } from 'rxjs/observable/interval';
import { take, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

const observer = (name) => {
    return {
        next(val: number) {console.log(val, name)},
        error(err) {console.error(err, name)},
        complete() {console.log('DONE', name)}
    }

}


const observable = interval(100).pipe(
    take(5),
    tap(
        d => console.log(d + ' A'),
        console.error,
        () => console.log('done')
    ),
    tap(d => console.log(d + ' B'), console.error, () => console.log('done')),
    map(data => data * 2),
    tap(observer('LAST')),
);


observable.subscribe(d => console.log(d + ' C'))
