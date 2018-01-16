
import 'mocha';

import {readDirPromise, readLinesPromise} from './read-write-files';

describe('readDirPromise function', () => {
    
    it('retrieves all files from a directory and its subdirectories and returns a Promise', done => {
        const sourceDir = './src/fs-promises/fs-promises-test-dir';
        readDirPromise(sourceDir)
        .then(files => {
            if (files.length !== 2) {
                console.error(files);
                return done(new Error('file count failed'));
            }
            return done();
        })
    });

});

describe('readLinesPromise function', () => {
    
    it('reads the lines of a file and returns a Promise', done => {
        const filePath = './src/fs-promises/fs-promises-test-dir/test-1.txt';
        readLinesPromise(filePath)
        .then(data => {
            if (data.lines.length !== 3) {
                console.error(data.lines);
                return done(new Error('lines count failed'));
            }
            return done();
        })
    });

});
