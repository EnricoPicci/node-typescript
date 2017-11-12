// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/move-tower/move-tower.js
// =================================================== 

import {moveTower, createTower, Disk} from './move-tower';

const source = createTower(5);
const dest = new Array<Disk>();
const spare = new Array<Disk>();

const bottomDisk = source[0];

const iterations = moveTower(bottomDisk, source, dest, spare);

console.log('iterations', iterations);

console.log('source', source);
console.log('dest', dest);
console.log('spare', spare);
