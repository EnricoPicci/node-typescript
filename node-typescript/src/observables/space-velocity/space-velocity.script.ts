

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { timer } from 'rxjs/observable/timer';
import { merge } from 'rxjs/observable/merge';

import { switchMap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { share } from 'rxjs/operators';


const clock = timer(0, 10).pipe(take(1000));

let t0 = Date.now();
let t1;
const timeIntervals = new Array<number>();
const obsTime = clock.pipe(
    tap(() => t1 = Date.now()),
    map(() => t1 - t0),
    tap(d => timeIntervals.push(d)),
    tap(() => t0 = t1),
    share()
)


function deltaSpace(acc: number, initialVelocity: number, timeFrames: Observable<number>) {
    let vel = initialVelocity;
    return timeFrames.pipe(
        map(deltaTime => {
            const seconds = deltaTime / 1000;
            vel = vel + seconds * acc;
            return {deltaSpace: vel * seconds, acc, vel};
        })
    )
}

const accelerationX = new BehaviorSubject<number>(0);
setTimeout(() => accelerationX.next(2), 100);
setTimeout(() => accelerationX.next(0), 1100);
setTimeout(() => accelerationX.next(-1), 3100);
setTimeout(() => accelerationX.next(0), 5100);
let velocityX = 0;
const deltaSpaceObsX = accelerationX.pipe(
    switchMap(acc => deltaSpace(acc, velocityX, obsTime)),
    tap(data => velocityX = data.vel)
)


const accelerationY = new BehaviorSubject<number>(0);
setTimeout(() => accelerationY.next(1), 3100);
setTimeout(() => accelerationY.next(0), 5100);
let velocityY = 0;
const deltaSpaceObsY = accelerationY.pipe(
    switchMap(acc => deltaSpace(acc, velocityY, obsTime)),
    tap(data => velocityY = data.vel)
)

merge(deltaSpaceObsX, deltaSpaceObsY)
.subscribe(
    data => console.log(data)
);




// function acceleration(accelerationArray: Array<{time: number, val: number}>) {
//     return from(accelerationArray).pipe(
//                 map(data => of(data.val).pipe(delay(data.time))),
//                 mergeMap(data => data)
//             )
// }



// const accelerationX = [
//     {time: 0, val: 0},
//     {time: 100, val: 2},
//     {time: 1100, val: 0},
//     {time: 3100, val: -1},
//     {time: 5100, val: 0},
// ]

// const accelerationY = [
//     {time: 0, val: 0},
//     {time: 3100, val: +1},
//     {time: 5100, val: 0},
// ]

