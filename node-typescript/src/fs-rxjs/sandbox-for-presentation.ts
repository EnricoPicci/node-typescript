import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/bindNodeCallback';


// function someFunction(
//     _input1: string,
//     _input2: number,
//     _callback: (cbParam1: string, cbParam2: Array<number>) => void
// ) {
//     // do stuff
// }

// const someFunctionBound = Observable.bindCallback(someFunction);





// someFunctionBound()




// someFunctionBound
// someFunction()









// 



import * as fs from 'fs';
import * as readline from 'readline';
const lines = new Array<string>();
const rl = readline.createInterface( { input: fs.createReadStream('file.txt'), crlfDelay: Infinity } );
rl.on('line', (line: string)  => { lines.push(line); } );
rl.on('close', ()  => { processLinesCb(lines); } )

function processLinesCb(_lines) { // doStuff }













function _readLines(fileFullName: string, processLinesCb: (file: string, lines: Array<string>) => void)
{
    const lines = new Array<string>();
    const rl =      readline.createInterface({input:fs.createReadStream(fileFullName), crlfDelay: Infinity});
    rl.on('line', (line: string)  => {lines.push(line);});
    rl.on('close', ()  => {processLinesCb(fileFullName, lines);})
}



const _readFileObservable = Observable.bindCallback(_readLines)






_readFileObservable




_readLines}
