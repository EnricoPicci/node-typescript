
import 'mocha';
import * as rimraf from 'rimraf';

import {extractSqlSnippets} from './extract-sql';

describe('extractSqlSnippets function', () => {
    
    it(`extracts sql code snippets from the files from a directory and its subdirectories 
            and writes them in a parallel structure in another directory`, done => {
        const sourceDir = './src/extract-sql/extract-sql-repository-test';
        const targetDir = './src/extract-sql/sql-snippets-to-delete/';
        const filePaths = new Array<string>();
        extractSqlSnippets(sourceDir, targetDir).subscribe(
            _filePath => filePaths.push(_filePath),
            error => console.error(error),
            () => {
                if (filePaths.length !== 4) {
                    console.error(filePaths);
                    return done(new Error('written files count failed'));
                } 
                rimraf(targetDir, err => {
                    if (err) {
                        console.error('err', err);
                        return done(err);
                    }
                });
                return done();
            }
        )
    });

});
