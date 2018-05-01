

// setInterval()


import { timer } from 'rxjs/observable/timer';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { share } from 'rxjs/operators';
// import { scan } from 'rxjs/operators';

function timeFrames(frameApproximateLenght: number) {
    const clock = timer(0, frameApproximateLenght);
    let t0 = Date.now();
    let t1: number;
    const obsTime = clock.pipe(
        tap(() => t1 = Date.now()),
        map(() => t1 - t0),
        tap(() => t0 = t1),
        map(dTms => dTms / 1000),
        share()
    );
    return obsTime;
}


const approximateTimeIntervaLenghtMs = 10;
const A = 100;
let vel = 0;
let space = 0;

const timeIntervals = timeFrames(approximateTimeIntervaLenghtMs);

const deltaSpace = timeIntervals.pipe(
    map(dT => {
        const dV = A * dT;
        vel = vel + dV;
        const dS = vel * dT  + A / 2 * dT * dT;
        space = space + dS;
        return {dV, vel, dS, space};
    }),
);

const transmittedData = [];
deltaSpace.pipe(
    map(s => transmittedData.push(s)),
    take(100) // stop after 100 intervals
)
.subscribe();

setTimeout(() => {
    transmittedData.forEach(s=> console.log(s));
}, 1000);


