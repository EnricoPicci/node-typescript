
// https://stackoverflow.com/questions/50079052/rxjs-recursively-call-api-until-all-items-are-fetched/50085053#50085053

import { Observable } from 'rxjs';
// import { Subject } from 'rxjs';
// import { ReplaySubject } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Subject } from 'rxjs';
// import { defer } from 'rxjs/observable/defer';

// import { merge } from 'rxjs/observable/merge';
// import { of } from 'rxjs/observable/of';
import { take } from 'rxjs/operators';
import { takeWhile } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
// import { mergeMap } from 'rxjs/operators';
import { expand } from 'rxjs/operators';
// import { subscribeOn } from 'rxjs/operator/subscribeOn';
// import { switchMap } from 'rxjs/operators';

let counterOfItemsFetched = 0;
function api() {
    // console.log('counterOfItemsFetched', counterOfItemsFetched)
    return counterOfItemsFetched < 1000 ? 100 : 1;
}

function apiAsynCall() {
    return Observable.of(api()).delay(1000);
}

Observable.of(0).pipe(
    expand(() => apiAsynCall().pipe(tap(itemsFetched => counterOfItemsFetched = counterOfItemsFetched + itemsFetched))),
    filter(counter => counter > 0),
    tap(() => console.log(counterOfItemsFetched)),
    takeWhile(counter => counter ===  100),
    take(15)
)
.subscribe(
    null,
    null,
    () => console.log('counter value at the end', counterOfItemsFetched)
)
