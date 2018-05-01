// try to buffer all events and then emit only one event with an array of all data buffered

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/toArray';

export function bufferAll(numberOfEventsEmitted: number) {
    return Observable.range(1, numberOfEventsEmitted)
            .toArray();
}
