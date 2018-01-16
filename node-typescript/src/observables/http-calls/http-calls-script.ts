// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/observables/http-calls/http-calls-script.js
// =================================================== 


// this example simulates a user who wants to search on wikipedia for a certain word
// the guy starts writing the word up to a certain position and then starts going randomly
// deleting on adding one character at the time, simulating the fact he is not really sure about
// the word he wants to actually search for
//
// the example is inspired by
// https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html

// the word we want to write
const stringToWrite = 'potatoes';
 // this means that at the beginning the stringToWrite word will be written in a sequence up to the position defined by the following
 // variable, and then the random back and forth will start
 // this simulates a user who is not sure about the word he really wants to write and so, at a certain point, starts deleting characters
 // or adding new characters to the word he is trying to write
const positionWhereBackAndForthStarts = 5;
// number of times we iterate the back and forth process
const itearations = 50;
// min and max delay between each simulated keystroke
const delayMin = 100;
const delayMax = 400;
// time interval that has to pass before we consider that the user has actually written something meaningful for him/her
// and therefore it is worth to issue a request to the server
// if we want to issue requests while the user is actually typing, debounceTime MUST be lower than delayMax
// if this is not the case, all the simulated keystrokes will considered too fast and therefore there will be no 
// request issued to the server
const debounceTime = 300;
import {typeAndCallHttp} from './http-calls';
typeAndCallHttp(stringToWrite, positionWhereBackAndForthStarts, itearations, delayMin, delayMax, debounceTime).subscribe(
    d => console.log(d)
)

    