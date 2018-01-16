import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concatMap';

import {findSnippetsObs, writeFileObs} from '../utils/fs-observables/fs-observables';
import {fileListObs, NumberedLine, readFileSnippetsObs} from '../utils/fs-observables/fs-observables';
import {BlockEmitter} from './block-emitter';


// toDirPath needs to end with '/' char
export function extractSqlSnippets(fromDirPath: string, toDirPath: string) {
    return findExecSqlObs(fromDirPath)
        .map(filePathAndSnippets => createFileContent(filePathAndSnippets, toDirPath))
        .mergeMap(filePathAndContent => writeFileObs(filePathAndContent.filePath, filePathAndContent.content))
}
function findExecSqlObs(fromDirPath: string) {
    return findSnippetsObs(fromDirPath, 'EXEC SQL', 'END-EXEC', line => line[6] === '*');
}


// toDirPath needs to end with '/' char
// divide the list of files in blocks of a certain size
// each block is processed SEQUENTIALLY to avoid to open to many files in parallel
export function extractSqlSnippetsBlocks(fromDirPath: string, toDirPath: string, block_size: number) {
    let i = 0;
    let emitter: BlockEmitter;
    return fileListObs(fromDirPath)
            .switchMap(
                fileList => {
                    emitter = new BlockEmitter(fileList, block_size);
                    console.log('file list', emitter.blocks);
                    emitter.getObservable()
                    .subscribe(
                        fileListChunk => {
                            i++;
                            readFileSnippetsObs(fileListChunk, 'EXEC SQL', 'END-EXEC', line => line[6] === '*')
                            .filter(fileAndSnippet => fileAndSnippet.snippets.length > 0)
                            .map(filePathAndSnippets => createFileContent(filePathAndSnippets, toDirPath))
                            .mergeMap(filePathAndContent => writeFileObs(filePathAndContent.filePath, filePathAndContent.content))
                            .subscribe(
                                file => console.log('file written', file),
                                err => console.error(err),
                                () => {
                                    console.log('block written', i, fileListChunk);
                                    emitter.next();
                                }
                            )
                        },
                        err => console.error(err),
                        () => console.log('processing done')
                    );
                    return Observable.of(emitter);
                }
            )
}


function createFileContent(filePathAndSnippets: {filePath: string, snippets: Array<Array<NumberedLine>>}, toDirPath: string) {
    const filePath = toDirPath + filePathAndSnippets.filePath;
    const snippets = filePathAndSnippets.snippets;
    let content = new Array<string>();
    let i = 0;
    for (const snippet of snippets) {
        i++;
        content.push('sql snippet ' + i + '\n');
        content = content.concat(snippet.map(numberedLine => numberedLine.line));
        content.push('\n' + '\n' + '\n');
    }
    return {filePath, content}
}



// toDirPath needs to end with '/' char
// divide the list of files in blocks of a certain size
// each block is processed SEQUENTIALLY to avoid to open to many files in parallel
let iterationB =0;
export function extractSqlSnippetsBlocks2(fromDirPath: string, toDirPath: string, blockSize: number) {
    return fileListObs(fromDirPath)
            .switchMap(fileList => Observable.from(fileList))
            .bufferCount(blockSize)
            .concatMap(fileListChunk => extractSqlSnippetsFromFiles(fileListChunk, toDirPath))
}
function extractSqlSnippetsFromFiles(fileList: Array<string>, toDirPath: string) {
    iterationB++;
    console.log('iterationB', iterationB);
    return readFileSnippetsObs(fileList, 'EXEC SQL', 'END-EXEC', line => line[6] === '*')
            .filter(fileAndSnippet => fileAndSnippet.snippets.length > 0)
            .map(filePathAndSnippets => createFileContent(filePathAndSnippets, toDirPath))
            .mergeMap(filePathAndContent => writeFileObs(filePathAndContent.filePath, filePathAndContent.content))
}


