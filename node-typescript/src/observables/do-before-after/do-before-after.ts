
import {Observable} from 'rxjs';

export class DoBeforeAfter<T> {
    wrapped$: Observable<T>;


    constructor(wrapped$: Observable<T>, doFunction: (data: any) => void) {
        this.wrapped$ = Observable.of(null)
            .do(_ => console.log("BEFORE"))
            .switchMap(_ => wrapped$)
            .do(doFunction)
            .do(_ => console.log('AFTER'));
    }

}
