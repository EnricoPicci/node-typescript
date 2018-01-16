import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/bindNodeCallback';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/filter';
import * as fs from 'fs';
import * as readline from 'readline';
import * as dir from 'node-dir';
import * as mkdirp from 'mkdirp';



// returns and Observable which emits once with the list of files found in the directory and all its subdirectories
export function readDirObservable(fromDirPath: string) {
    return _readDirObservable(fromDirPath);
}
const _readDirObservable = Observable.bindNodeCallback(dir.files);

// =============================  Read a list of files =========================================
// returns and Observable which emits every time a file is read - emitted values are:
//    - the name of the file read
//    - an array containing the lines of the file as strings
export function readFilesObservable(fileList: Array<string>) {
    return Observable.from(fileList)
            .mergeMap(file => _readFileObservable(file))
}
const _readFileObservable = Observable.bindCallback(_readLines, (fileFullName: string, lines: Array<string>) => ({fileFullName, lines}));
function _readLines(fileFullName: string, callback: (file: string, lines: Array<string>) => void) {
    const lines = new Array<string>();
    const rl = readline.createInterface({
        input: fs.createReadStream(fileFullName),
        crlfDelay: Infinity
    });
    rl.on('line', (line: string)  => {
        lines.push(line);
    });
    rl.on('close', ()  => {
        callback(fileFullName, lines);
    })
}


// =============================  Performs the transformation of the content  ===============================
// adds a sequence number at the beginning of each line
export function transform(data: {fileFullName: string, lines: Array<string>}) {
    const lastSlash = data.fileFullName.lastIndexOf('/');
    const fileFullName = data.fileFullName.substr(lastSlash);
    return {
        fileFullName,
        lines: data.lines.map((line, i) => i + ' ' + line)
    }
}


// ======================  Writes a file with a given content =========================
// Writes a file with a specific content
// Returns an Observable which emits the name of the file written when the write operation is completed
export function writeFileObservable(file_content: {fileFullName: string, lines: Array<string>}, targetDir?: string) {
    return _writeFileObservable(file_content, targetDir);
}
const _writeFileObservable = Observable.bindCallback(_writeFile);
function _writeFile(
    file_content: {fileFullName: string, lines: Array<string>},
    targetDir: string,
    callback: (fileFullName: string) => void
) {
    const fileFullName = targetDir ? targetDir + file_content.fileFullName : file_content.fileFullName;
    const lines = file_content.lines;
    // const lastSlash = fileFullName.lastIndexOf('/');
    // const fileDir = fileFullName.substr(0, lastSlash + 1);
    mkdirp(targetDir, err => {
        if (err) {
            console.error('error in creating a directory', err);
            throw err;
        }
        const fileContent = lines.join('\n');
        fs.writeFile(fileFullName, fileContent, err => {
            if (err) throw err;
            callback(fileFullName);
        })
    });
}


// ======================  Writes a line in the log =========================
// Appends a line in the log - the line contains the name of the file
export function writeLogObservable(fileFullName: string) {
    const logFileFullName = './src/fs-rxjs/fs-rxjs-test-dir-output/log.txt';
    return appendLineObservable(logFileFullName, fileFullName);
}

export function appendLineObservable(file: string, line: string) {
    return _appendFileObservable(file, line);
}
function _appendFile(file: string, line: string, callback: (line: string) => string) {
    const newLine = line + '\n';
    fs.appendFile(file, newLine, err => {
        if (err) throw err;
        callback(line);
    })
}
const _appendFileObservable = Observable.bindCallback(_appendFile, (line: string) => line);

