
// built to respond to
// https://stackoverflow.com/questions/49486848/rxjs-queueing-ajax-requests-from-separate-inputs/49492395#49492395


import {Observable} from 'rxjs';

let counter1 = 0;
let counter2 = 0;

const obs1 = Observable.interval(500);
const obs2 = Observable.interval(300).skip(1).throttleTime(800);

const oobs1 = obs1
.map(n => 'obs1 ' + n)
.do(_ => counter1++)
.do(_ => {
    if (counter1 > 10) {
        throw('counter limit 1');
    } 
})
.map(data => ({data, input: 1}))
// .switchMap(data => {
//     let delay = 600;
//     if (counter1 % 3 === 0) {
//         delay = 300;
//     }
//     return Observable.of(data).delay(delay);
// })
// .subscribe(console.log, console.error, () => console.log('DONE 1'))

const oobs2 = obs2
.map(n => 'obs2 ' + n)
.do(_ => counter2++)
.do(_ => {
    if (counter2 > 10) {
        throw('counter limit 2');
    } 
})
.map(data => ({data, input: 2}))
// .switchMap(data => {
//     return Observable.of(data).delay(50);
// })
// .subscribe(d => console.log('obs2', d), console.error, () => console.log('DONE 2'))

// function returnObs(number: number, data: string) {
//     if (number === 1) {
//         let delay = 600;
//         if (counter1 % 3 === 0) {
//             delay = 300;
//         }
//         return Observable.of(data).delay(delay);
//     }
//     return Observable.of(data).delay(50);
// }


// const obsArray = [oobs1, oobs2];

function getObs(number: number) {
    if (number === 1) {
        return oobs1;
    }
    return oobs2;
}

Observable.from([1, 2])
.map(n => getObs(n))
// .map(data => {
//     if (data.input) {}
// })
.mergeAll()
.subscribe(d => console.log('obs all', d), console.error, () => console.log('DONE ALL'))
