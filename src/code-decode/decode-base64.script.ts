// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/code-decode/decode-base64.script.js
// =================================================== 

import {recids} from './base64.data';
import {decode, encodeBuffer, decodeBuffer} from './decode-base64';


console.log('decode', decode(recids.results[0]));


console.log('decode buffer', decodeBuffer(recids.results[0]));


const sEncoded = encodeBuffer('Hello Enrico');
console.log('decode buffer string', decodeBuffer(sEncoded));