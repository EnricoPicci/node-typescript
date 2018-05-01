// https://stackoverflow.com/questions/43623868/rxjs-how-to-ignore-an-error-with-catch-and-keep-going

const Rx = require('rxjs/Rx');
function checkValue(n) {
  if(n === 4) {
    let aa: any;
    const d = aa.length;
    console.log(d);
  }
  return true;
}
const source = Rx.Observable.interval(100).take(10);

source
  // pass the item into the projection function of the switchMap operator
  .switchMap(x => {
     // we create a new stream of just one item
     // this stream is created for every item emitted by the source observable
     return Rx.Observable.of(x)
       // now we run the filter
       .do(checkValue)
       // we catch the error here within the projection function
       // on error this upstream pipe will collapse, but that is ok because it starts within this function and will not effect the source
       // the downstream operators will never see the error so they will also not be effect
       .catch(err => Rx.Observable.of(err));
     })
     .subscribe(v => console.log(v));
