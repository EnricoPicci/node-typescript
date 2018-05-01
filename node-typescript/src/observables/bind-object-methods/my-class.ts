// this class defines 2 methods which accepts a callback as their last parameter (as per node convention)
// then 2 functions are defined that return Observables bound to the 2 object methods above
// the first function does not require any parameter
// the second function requires one parameter

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindNodeCallback';

export class MyClass {
    name: string;

    doSomethingWithName(cb: (err) => void) {
        const error = 'I have no name';
        if (!this.name) {
            return cb(error)
        }
        return cb(null);
    }

    doSomethingWithNameAndParam(param: string, cb: (err) => void) {
        const error = 'I have no name and param value is: ' + param;
        const success = 'My name is: ' + this.name + ' and my param value is :' + param;
        if (!this.name) {
            return cb(error)
        }
        return cb(success);
    }

}

export function myClassObjFunctionObs(myObj: MyClass): Observable<MyClass> {
    return Observable.bindNodeCallback(myObj.doSomethingWithName).call(myObj);
}

export function myClassObjFunctionWithParamObs(param: string, myObj: MyClass): Observable<MyClass> {
    return Observable.bindNodeCallback(myObj.doSomethingWithNameAndParam.bind(myObj, param)).call(myObj);
}
