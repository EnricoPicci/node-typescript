console.clear();

let counterAp = 0;
let counterBp = 0;

const timeout1 = 3000;
const timeout2 = 500;
const timeout3 = 300;

function Ap(timeout: number, value: number) {
  return new Promise<any>(resolve => {
    setTimeout(() => {
      ++counterAp;
      console.log("A done (" + counterAp + ") " + value);
      resolve(value);
    }, timeout);
  });
}

function Bp(timeout: number, value: number) {
  return new Promise<any>(resolve => {
    setTimeout(() => {
      ++counterBp;
      console.log("B done (" + counterBp + ") " + value);
      resolve(value);
    }, timeout);
  });
}


// RESULT OBTAINED
//
// data 10
// A done (1) 10
// data 20
// B done (1) 20
// data 30
// B done (2) 30
// data 30

let pp = Promise.resolve(0);
pp = pp
.then(() => {
    console.log('data', 10)
    return Ap(timeout1, 10);
})
.then(() => {
    console.log('data', 20)
    return Bp(timeout2, 20);
})
.then(() => {
    console.log('data', 30)
    return Bp(timeout2, 30);
});
pp.then(d => console.log('data', d))



// RESULT OBTAINED
//
// data 0
// A done (1) 10
// data 10
// B done (1) 20
// data 20
// B done (2) 30
// data 30

// let pp = Promise.resolve(0);
// pp = pp
// .then(d => {
//     console.log('data', d)
//     return Ap(timeout1, d + 10);
// })
// .then(d => {
//     console.log('data', d)
//     return Bp(timeout2, d + 10);
// })
// .then(d => {
//     console.log('data', d)
//     return Bp(timeout2, d + 10);
// });
// pp.then(d => console.log('data', d))


// RESULT OBTAINED
//
// data 10
// B done (1) 30
// B done (2) 20
// A done (1) 10
// data 20
// data 30
// data 30

// const a1 = Ap(timeout1, 10);
// const b1 = Bp(timeout2, 20);
// const b2 = Bp(timeout3, 30);
// let pp = Promise.resolve(0);
// pp = pp
// .then(() => {
//     console.log('data', 10)
//     return a1;
// })
// .then(() => {
//     console.log('data', 20)
//     return b1;
// })
// .then(() => {
//     console.log('data', 30)
//     return b2;
// });
// pp.then(d => console.log('data', d))
