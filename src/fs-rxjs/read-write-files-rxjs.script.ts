
// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/bindCallback';
// import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/filter';

import {readDirObservable, readFilesObservable, transform, writeFileObservable, writeLogObservable} from './read-write-files-rxjs';


const sourceDir = './src/fs-rxjs/fs-rxjs-test-dir/';
const targetDir = './src/fs-rxjs/fs-rxjs-test-dir-output';
readDirObservable(sourceDir)
.switchMap(fileList => readFilesObservable(fileList))
.map(file_content => transform(file_content))
.mergeMap(file_content => writeFileObservable(file_content, targetDir))
.mergeMap(file => writeLogObservable(file))
.subscribe(
    file => console.log(file + ' logged'),
    err => { console.error(err) }, 
    () => console.log('I am done')
)
