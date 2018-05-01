
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';


export function generateError() {
    const strings = ['1', '12', '123', null, '12345'];
    return Observable.from(strings)
            .map((num: any) => num.length)
}


export function generateErrorAndResume(skipToResume: number = 0) {
    const strings = ['1', '12', '123', null, '12345'];
    return Observable.from(strings)
            .skip(skipToResume)
            .map((num: any) => num.length)
}
