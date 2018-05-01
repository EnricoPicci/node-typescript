
import {Observable} from 'rxjs/observable';

// import {Subject} from 'rxjs';
// import {Subscription} from 'rxjs';


// import { map } from 'rxjs/operators';
// import { _throw } from 'rxjs/observable/throw';

// const obs1 = Observable.range(1, 5).pipe(
//   map(data => {
//     if (data === 3) {
//       _throw('I am the Error Observable');
//     }
//     return data;
//   }
// ))



// import { map } from 'rxjs/operators';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

// const obs1 = Observable.range(1, 5).pipe(
//   map(data => {
//     if (data === 3) {
//       return ErrorObservable.create(new Error('I am the Error Observable'));
//     }
//     return data;
//   }
// ))


// import { map, catchError } from 'rxjs/operators';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

// const obs1 = Observable.range(1, 5).pipe(
//   map(data => {
//     if (data === 3) {
//       throw('I do not know why I do not like 3');
//     }
//     return data;
//   }),
//   catchError(error => ErrorObservable.create(new Error('I am the Error Observable - '+ error)))
// )



// const obs1 = Observable.range(1, 5)
//               .map(data => {
//                 if (data === 3) {
//                   throw('I do not know why I do not like 3');
//                 }
//                 return data;
//               });




import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const obs1 = Observable.range(1, 5)
              .map(data => {
                if (data === 4) {
                  return new ErrorObservable(new Error('I do not know why, but I do not like this'))
                }
                return data;
              });

obs1.subscribe(
  console.log,
  console.error,
  () => {
    console.log('DONE');
  }
)

