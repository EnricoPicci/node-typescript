
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import * as fs from 'fs';
import * as readline from 'readline';
import * as dir from 'node-dir';
import * as mkdirp from 'mkdirp';

// ======================  Reads files from directory and subdirectories ============================
// returns and Observable which emits for each file found in the directory and all its subdirectories
export function filesObs(fromDirPath: string) {
    return _filesFromDir(fromDirPath)
            .switchMap(files => Observable.from(files))
}
const _filesFromDir = Observable.bindNodeCallback(dir.files);

// ======================  Find snippets in files of a directory and subdirectories =========================
// Search in all files contained in a directory (and its subdirs) for snippets which begin with a given token
// and end with a given token.
// Returns an Observable which emits any time a file containing a snippet is found
// The returned observable is of type Observable<[]>
// the Array emitted by the Observable contains 2 items:
//  first item: is the name of the file which contains the snippets
//  second item: an array of arrays of NumberedLine
//                each array represents a snippet
//                each NumberedLine in the array represents a line of the file
export function findSnippetsObs(
    fromDirPath: string,
    startSnippet: string,
    endSnippet: string,
    skipLine?: (line: string) => boolean) : Observable<{filePath: string, snippets: Array<Array<NumberedLine>>}>
{
    return filesObs(fromDirPath)
            .mergeMap(filePath => _findSnippetsObs(filePath, startSnippet, endSnippet, skipLine))
            .filter((fileAndSnippet: any) => fileAndSnippet[1].length > 0)
            .map(fileAndSnippet => {
                const filePath: string = fileAndSnippet[0];
                const snippets: Array<Array<NumberedLine>> = fileAndSnippet[1];
                return {filePath, snippets};
            });
}
export interface NumberedLine {
    lineNumber: number,
    line: string
}
const _findSnippetsObs = Observable.bindCallback(_findSnippets);
function _findSnippets(
    filePath: string,
    startSnippetToken: string,
    endSnippetToken: string,
    skipLine: (line: string) => boolean,
    callback: (filePath: string, snippets: Array<Array<NumberedLine>>) => void
) {
    if(!skipLine) {
        skipLine = (_line: string) => false;
    }
    let startSnippetFound = false;
    let endSnippetFound = false;
    let lineNumber = 0;
    let snippet: Array<NumberedLine>;
    const snippets = new Array<Array<NumberedLine>>();
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    rl.on('line', (line: string)  => {
        lineNumber++;
        const numberedLine: NumberedLine = {lineNumber, line};
        if (!skipLine(line)) {
            startSnippetFound = startSnippetFound || line.indexOf(startSnippetToken) > -1;
            endSnippetFound = line.indexOf(endSnippetToken) > -1;
            if (startSnippetFound) {
                if (!snippet) {
                    snippet = new Array<NumberedLine>();
                    snippets.push(snippet);
                }
                if (endSnippetFound) {
                    snippet.push(numberedLine);
                }
            }
            if (startSnippetFound && !endSnippetFound) {
                snippet.push(numberedLine);
            }
            if (endSnippetFound) {
                startSnippetFound = false;
                endSnippetFound = false;
                snippet = null;
            }
        }
    })
    rl.on('close', ()  => {
        callback(filePath, snippets);
    })
}


// ======================  Writes a file with a given content =========================
// Writes a file with a specific content
// Returns an Observable which emits the name of the file written when the write operation is completed
export function writeFileObs(filePath: string, lines: Array<string>) {
    return _writeFileObs(filePath, lines);
}
const _writeFileObs = Observable.bindCallback(_writeFile);
function _writeFile(
    filePath: string,
    lines: Array<string>,
    callback: (filePath: string) => void
) {
    const lastSlash = filePath.lastIndexOf('/');
    const sqlFileDir = filePath.substr(0, lastSlash + 1);
    mkdirp(sqlFileDir, err => {
        if (err) {
            console.error('error in creating a directory', err);
            throw err;
        }
        const fileContent = lines.join('\n');
        fs.writeFile(filePath, fileContent, err => {
            if (err) throw err;
            callback(filePath);
        })
    });
}
