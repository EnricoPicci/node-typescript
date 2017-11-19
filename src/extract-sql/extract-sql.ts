
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/map';
import * as fs from 'fs';
import * as readline from 'readline';
import * as dir from 'node-dir';
import * as mkdirp from 'mkdirp';

// export function extractSql() {
//     console.log('passed through here');
//     dir.files('./extract-sql-repository', (error, data) => {
//         if (error) {
//             throw error;
//         }
//         const files = data.filter(filePath => filePath.substr(filePath.length - 4, 4) === '.txt');
//         console.log(files);
//     })
// }


export const filesFromDir = Observable.bindNodeCallback(dir.files);
// export function filesFromDir(dirPath: string) {
//     return dirFiles(dirPath);
// }

// export function dirSourceFiles(dirPath: string, extensionForSourceFiles?: string) {
//     const extensionToSearchFor = extensionForSourceFiles ? extensionForSourceFiles : '.txt';
//     return filesFromDir(dirPath)
//             .map(files => files.filter(filePath => filePath.substr(filePath.length - 4, 4) === extensionToSearchFor))
// }

export function findExecSql(filePath: string, callback: (filePath: string, snippets: Array<Array<string>>) => void) {
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
        execSqlFound = execSqlFound || line[6] !== '*' && line.indexOf('EXEC SQL') > -1;
        endExecSqlFound = line[6] !== '*' && line.indexOf('END-EXEC') > -1;
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
const _findExecSqlObs = Observable.bindCallback(findExecSql);
export function findExecSqlObs(filePath: string) : Observable<any> {
    return _findExecSqlObs(filePath);
}

export function writeSqlFile(filePath: string, snippets: Array<Array<string>>) {
    const sqlFilePath = './sql' + filePath;
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
            console.log(sqlFilePath, 'saved')
        })
    });
    // mkdirp('./abc/cde', err => {
    //         if (err) {
    //             console.error('error in creating a directory', err);
    //             throw err;
    //         }
    //     })
    // let fileContent = '';
    // let i = 0;
    // for (const snippet of snippets) {
    //     i++;
    //     fileContent = fileContent + 'sql snippet ' + i + '\n';
    //     fileContent = fileContent + snippet.join('\n');
    //     fileContent = fileContent + '\n' + '\n' + '\n';
    // }
    // fs.writeFile(filePath + '.sql', fileContent, err => {
    //     if (err) throw err;
    //     console.log(sqlFilePath, 'saved')
    // })
}
