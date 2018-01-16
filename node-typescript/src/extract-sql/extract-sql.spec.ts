
import 'mocha';
import * as rimraf from 'rimraf';

import {extractSqlSnippets, extractSqlSnippetsBlocks, extractSqlSnippetsBlocks2} from './extract-sql';

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

describe('extractSqlSnippetsBlocks function', () => {
    
    it(`extracts sql code snippets from the files from a directory and its subdirectories 
            and writes them in a parallel structure in another directory
            EACH BLOCK IS PROCESSED SEQUENTIALLY`, done => {
        const sourceDir = './src/extract-sql/extract-sql-repository-test';
        const targetDir = './src/extract-sql/sql-snippets-to-delete-blocks/';
        const blockSize = 2;
        let i = 0;
        extractSqlSnippetsBlocks(sourceDir, targetDir, blockSize).subscribe(
            emitter => {
                emitter.getObservable().subscribe(
                    fileList => {
                        i++;
                        console.log('file list ' + i, fileList);
                    },
                    err => console.error(err),
                    () => {
                        // there are 12 files considering the hidden ones such as .DS.store 
                        // since the block size is 2 we expect 6 blocks
                        if (i !== 6) {
                            console.error(i);
                            return done(new Error('block count not as expected'));
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
                emitter.next();
            },
            err => console.error(err),
            () => console.log('processing launched')
        )
    });

});



describe('extractSqlSnippetsBlocks2 function', () => {
    
    it(`extracts sql code snippets from the files from a directory and its subdirectories 
            and writes them in a parallel structure in another directory
            EACH BLOCK IS PROCESSED SEQUENTIALLY`, done => {
        const sourceDir = './src/extract-sql/extract-sql-repository-test';
        const targetDir = './src/extract-sql/sql-snippets-to-delete-2/';
        const blockSize = 2;
        let i = 0;
        extractSqlSnippetsBlocks2(sourceDir, targetDir, blockSize)
        .subscribe(
            file => {
                i++;
                console.log('file written', file, i);
            },
            err => {
                console.error('err', err);
                return done(err);
            },
            () => {
                // there are 12 files considering the hidden ones such as .DS.store 
                // but only 4 files have SQL
                if (i !== 4) {
                    console.error(i);
                    return done(new Error('block count not as expected'));
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

