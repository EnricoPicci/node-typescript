// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/tower-of-hanoi/move-tower.script.js
// =================================================== 

import {moveTower, createTower, Disk} from './move-tower';

const source = createTower(5);
const dest = new Array<Disk>();
const spare = new Array<Disk>();

const bottomDisk = source[0];

const iterations = moveTower(source, dest, spare, bottomDisk);

console.log('iterations', iterations);

console.log('source', source);
console.log('dest', dest);
console.log('spare', spare);
