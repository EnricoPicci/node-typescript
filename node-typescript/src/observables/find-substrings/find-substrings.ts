
// ===================================================================================================
// ==============  Functional approach with Observables
// ===================================================================================================


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export const emitNumberSequence = (from: number, count: number) => {
    return Observable.range(from, count);
}

export const takeSubstring = (start: number, length: number, string: string) => {
    return {
        string: string.substr(start, length),
        position: start
    }
}

export const rollingSubstrings = (sourceString: string, substringLength: number) => {
    return emitNumberSequence(0, sourceString.length)
            .map(start => takeSubstring(start, substringLength, sourceString))
}

export const searchStringOccurrences = (stringToSearch: string, target: string) => {
    return rollingSubstrings(stringToSearch, target.length)
        .filter(stringAndPosition => stringAndPosition.string === target)
}




// ===================================================================================================
// ==============  Less functional approach
// ===================================================================================================

// https://stackoverflow.com/questions/3365902/search-for-all-instances-of-a-string-inside-a-string
export function allIndexOf(str, toSearch) {
    var indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }
    return indices;
}


