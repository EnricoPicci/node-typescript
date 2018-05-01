
import {BehaviorSubject} from 'rxjs';

export class BehaviourSubjectAugmented<T> {
    bs: BehaviorSubject<T>;

    constructor(initialValue: T, private comparer: (p: T, q: T) => boolean) {
        this.bs = new BehaviorSubject(initialValue);
    }

    getValue() {
        return this.bs.getValue();
    }

    asObservable() {
        return this.bs.asObservable()
                        .distinctUntilChanged(this.comparer);
    }

    complete() {
        return this.bs.complete();
    }
    next(value: T) {
        return this.bs.next(value);
    }

}
