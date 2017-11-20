
// import { expect } from 'chai';
import 'mocha';
// import * as fs from 'fs';
import * as rimraf from 'rimraf';

import {filesObs, findSnippetsObs, NumberedLine, writeFileObs} from './fs-observables';

describe('filesObs function', () => {
    
    it('reads all files from a directory and its subdirectories and returns an observable which emits for every file read', done => {
        const sourceDir = './src/utils/fs-observable-test-dir';
        const filePaths = new Array<string>();
        filesObs(sourceDir).subscribe(
            _filePath => filePaths.push(_filePath),
            error => console.error(error),
            () => {
                if (filePaths.length !== 3) {
                    console.error(filePaths);
                    return done(new Error('file count failed'));
                } else {
                    return done();
                }
            }
        )
    });

});

describe('findSnippetsObs function', () => {
    
    it('reads the snippets present in the files contained by the directory and its subdirectories', done => {
        const sourceDir = './src/utils/fs-observable-test-dir';
        const snippets = new Array<any>();
        const startSnippetToken = 'Snippet start';
        const endSnippetToken = 'Snippet end';
        findSnippetsObs(sourceDir, startSnippetToken, endSnippetToken).subscribe(
            fileAndSnippets => snippets.push(fileAndSnippets),
            error => done(error),
            () => {
                if (snippets.length !== 2) {
                    console.error(snippets);
                    return done(new Error('snippets count failed'));
                }
                const file_1_1_1_snippets = snippets.find(fileAndSnippets => 
                                                                fileAndSnippets[0] === 'src/utils/fs-observable-test-dir/dir-1/dir-1-1/file-1-1-1.txt');
                if (file_1_1_1_snippets[1].length !== 2) {
                    console.error(file_1_1_1_snippets);
                    return done(new Error('snippets in file file-1-1-1.txt count failed'));
                }
                if (file_1_1_1_snippets[1][0].length !== 3) {
                    console.error(file_1_1_1_snippets);
                    return done(new Error('first snippet in file file-1-1-1.txt line count failed'));
                }
                const numberedLine: NumberedLine = file_1_1_1_snippets[1][0][0];
                if (numberedLine.lineNumber !== 4) {
                    console.error(numberedLine);
                    return done(new Error('first line lineCount failed'));
                }
                return done();
            }
        )
    });

});

describe('writeFileObs function', () => {
    
    it('writes a file with a certain content', done => {
        const filePathDir = 'src/utils/fs-observable-test-dir-output/';
        const fileName = 'file-w.txt';
        const content = [
            'first line',
            'second line'
        ];
        rimraf(filePathDir, err => {
            if (err && err.name !== 'ENOENT') {
                console.error('code', err.name);
                console.error('err', err);
                return done(err);
            }
            const fullFileName = filePathDir + fileName;
            writeFileObs(fullFileName, content)
                .switchMap(_filePath => filesObs(filePathDir))
                .subscribe(filePath => {
                    if (filePath !== fullFileName) {
                        console.error('filePath', filePath);
                        console.error('fullFileName', fullFileName);
                        return done(new Error('write file failed'));
                    }
                    rimraf(filePathDir, err => {
                        if (err) {
                            console.error('err', err);
                            return done(err);
                        }
                    });
                    return done();
                })
        });

    });

});