// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/utils/utils-script.js
// =================================================== 

// import {random_0_1} from './random-generators'; 
// for (let i =0; i < 20; i++) {
//     console.log(random_0_1());
// }


import {randomTick} from './random-generators'; 
randomTick(100, 2000, 10).subscribe(
    d => console.log(d),
    e => console.error(e),
    () => console.log('done')
)
