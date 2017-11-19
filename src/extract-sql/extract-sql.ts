
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


const _filesFromDir = Observable.bindNodeCallback(dir.files);

export function sourceFilesFromDir(fromDirPath: string) {
    return _filesFromDir(fromDirPath)
            .map(files => files.filter(filePath => filePath.substr(filePath.length - 4, 4) === '.txt'))  // <=====
            .switchMap(files => Observable.from(files))
}

function _findExecSql(filePath: string, callback: (filePath: string, snippets: Array<Array<string>>) => void) {
    let execSqlFound = false;
    let endExecSqlFound = false;
    let lineCount = 0;
    let sqlExecSnippet: Array<string>;
    const sqlExecSnippets = [];
    const sqlExecOccurrences = [];
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    rl.on('line', (line: string)  => {
        lineCount++;
        execSqlFound = execSqlFound || line[6] !== '*' && line.indexOf('EXEC SQL') > -1;  // <=====
        endExecSqlFound = line[6] !== '*' && line.indexOf('END-EXEC') > -1;  // <=====
        if (execSqlFound) {
            if (!sqlExecSnippet) {
                sqlExecSnippet = new Array<string>();
                sqlExecSnippets.push(sqlExecSnippet);
            }
            if (endExecSqlFound) {
                sqlExecSnippet.push(line);
                sqlExecOccurrences.push({lineCount, line});
            }
        }
        if (execSqlFound && !endExecSqlFound) {
            sqlExecSnippet.push(line);
            sqlExecOccurrences.push({lineCount, line});
        }
        if (endExecSqlFound) {
            execSqlFound = false;
            endExecSqlFound = false;
            sqlExecSnippet = null;
        }
    })
    rl.on('close', ()  => {
        callback(filePath, sqlExecSnippets);
    })
}
const _findExecSqlObs = Observable.bindCallback(_findExecSql);
// this function is defined only to be able to set the return type to Observable<any>
// _findExecSqlObs via inference returns Observable<string> which is wrong
export function findExecSqlObs(filePath: string) : Observable<any> {
    return _findExecSqlObs(filePath);
}

function _writeFile(
            sorceFilePath: string,
            snippets: Array<Array<string>>,
            toDirPath: string,
            callback: (filePath: string) => void
        ) {
    const sqlFilePath = toDirPath + sorceFilePath;
    const lastSlash = sqlFilePath.lastIndexOf('/');
    const sqlFileDir = sqlFilePath.substr(0, lastSlash + 1);
    mkdirp(sqlFileDir, err => {
        if (err) {
            console.error('error in creating a directory', err);
            throw err;
        }
        let fileContent = '';
        let i = 0;
        for (const snippet of snippets) {
            i++;
            fileContent = fileContent + 'sql snippet ' + i + '\n';
            fileContent = fileContent + snippet.join('\n');
            fileContent = fileContent + '\n' + '\n' + '\n';
        }
        fs.writeFile(sqlFilePath + '.sq', fileContent, err => {
            if (err) throw err;
            callback(sqlFilePath);
        })
    });
}
const _writeFileObs = Observable.bindCallback(_writeFile);
// the following function is defined only to be able to set meaningful names to the parameters
// _writeSqlFileObs has generic names for the parameters (v1 and v2)
export function writeFileObs(filePath: string, snippets: Array<Array<string>>, toDirPath: string) {
    return _writeFileObs(filePath, snippets, toDirPath);
}


export function extractSqlSnippets(fromDirPath: string, toDirPath: string) {
    sourceFilesFromDir(fromDirPath)
        .mergeMap(file => findExecSqlObs(file))
        .filter(fileNameAndSnippets => fileNameAndSnippets[1].length > 0)
        .mergeMap(fileNameAndSnippets => writeFileObs(fileNameAndSnippets[0], fileNameAndSnippets[1], toDirPath))
        .subscribe(file => {
            console.log('sql snippets saved: ', file);
        });
}
