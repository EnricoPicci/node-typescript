//  code used in the answer for stackoverflow
// https://stackoverflow.com/questions/49296906/rxjs-iterate-back-in-observables?noredirect=1#comment85606527_49296906

import {Observable} from 'rxjs';

const values = ['aa', 'ab', 'ac', 'ba', 'db', 'bc', 'cc', 'cb', 'cc']

Observable.from(values)
// accumulate all previous values into an array of strings
.scan((previousValues, thisValue) => {
    previousValues.push(thisValue)
    return previousValues
}, [])
// create an object with the previous objects and the last one
.map(previousValues => {
    const lastValue = previousValues[previousValues.length - 1]
    return {previousValues, lastValue}
})
// filters the ones to emit based on some similarity logic
.filter(data => isNotSimilar(data.lastValue, data.previousValues))
// creates a new stream of events emitting only the values which passed the filter
.mergeMap(data => Observable.of(data.lastValue))
.subscribe(
    value => console.log(value)
)

function isNotSimilar(value: string, otherValues: Array<string>) {
    const otherValuesButNotLast = otherValues.slice(0, otherValues.length - 1);
    const aSimilar = otherValuesButNotLast.find(otherValue => otherValue[0] === value[0]);
    return aSimilar === undefined;
}
