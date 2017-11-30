
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/bindNodeCallback';





// export const someFunction1 = (a, b, c) => {
//     console.log(a); // 5
//     console.log(b); // 'some string'
//     console.log(c); // {someProperty: 'someValue'}
// };
// const someFunction0 = (someFunction1) => someFunction1 +1;

// const boundSomeFunction1 = Observable.bindCallback(someFunction0);
//     boundSomeFunction1(1,2).subscribe(values => {
//     console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
// });

// function someFunction((a, b, c) => {
//     console.log(a); // 5
//     console.log(b); // 'some string'
//     console.log(c); // {someProperty: 'someValue'}
// });

// const boundSomeFunction = Observable.bindCallback(someFunction);
//     boundSomeFunction().subscribe(values => {
//     console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
// });




const someFunction = (a, b, cb) => {
    const u_param = a + b + a;
    console.log('I am the callback');
    cb(u_param + 1);
};

const boundSomeFunction = Observable.bindCallback(someFunction);
boundSomeFunction(1,3).subscribe(values => {
    console.log('val', values)
});

const someFunctionTyped = (a: number, b: number, cb: (data: string) => void) => {
    const u_param = a + b + a + '';
    console.log('I am the typed callback');
    cb(u_param + 1);
};

const boundSomeFunctionTyped = Observable.bindCallback(someFunctionTyped);
boundSomeFunctionTyped(1,3).subscribe(values => {
    console.log('val', values)
});


export const callBack = (data: string) => {console.log('do I get called?', data)}
const someFunctionWithCallbackDefined = (a: number, b: number, callBack) => {
    const u_param = a + b + a + '';
    console.log('I am the typed callback');
    callBack(u_param + 1);
};

const boundSomeFunctionWithCallbackDefined = Observable.bindCallback(someFunctionWithCallbackDefined);
boundSomeFunctionWithCallbackDefined(1,3).subscribe(values => {
    console.log('I get called', values);
});


function f(x, cb) {
    const y = x + x;
    cb(y);
}; 

f(10, (n) => {console.log('data is', n)})

const fBound = Observable.bindCallback(f);
fBound(11).subscribe(n => console.log('data is', n))


// const someFunction2 = (a, b, cb) => {
//     const u_param = a + b + a;
//     console.log('I am the callback 2');
//     cb(u_param + 1);
// };

// const boundSomeFunction2 = Observable.bindCallback(someFunction2);
// boundSomeFunction2(1,3).subscribe(values => {
//     console.log('val 2', values) // [5, 'some string', {someProperty: 'someValue'}]
// });
