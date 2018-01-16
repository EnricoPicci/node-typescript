
import * as dir from 'node-dir';
import * as fs from 'fs';
import * as readline from 'readline';

export function readDirPromise(dirPath: string): Promise<Array<string>> {
    return new Promise(function(resolve, reject) {
        dir.files(dirPath, function(err, data: Array<string>) {
             if(err !== null) return reject(err);
             resolve(data);
         });
    });
}

export function readLinesPromise(filePath: string): Promise<{lines: Array<string>, filePath: string}> {
    const lines = new Array<string>();
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    rl.on('line', (line: string)  => {
        lines.push(line);
    });
    return new Promise(function(resolve, _reject) {
        rl.on('close', ()  => {
            resolve({lines, filePath});
        })
    });
}

export function transform(data: {lines: Array<string>, filePath: string}) {
    const lastSlash = data.filePath.lastIndexOf('/');
    const fileName = data.filePath.substr(lastSlash);
    return {
        lines: data.lines.map((line, i) => i + ' ' + line),
        fileName: fileName
    }
}

export function writeFilePromise(
    filePath: string,
    lines: Array<string>
) {
    return new Promise(function(resolve, reject) { 
        const fileContent = lines.join('\n');
        fs.writeFile(filePath, fileContent, err => {
            if (err) return reject(err);
            resolve(filePath);
        })
    });
}
