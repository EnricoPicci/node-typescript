// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/extract-sql/extract-sql.js
// =================================================== 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {filesFromDir, findExecSqlObs, writeSqlFile} from './extract-sql';

filesFromDir('./src/extract-sql/extract-sql-repository-test')
    .map(files => files.filter(filePath => filePath.substr(filePath.length - 4, 4) === '.txt'))
    .switchMap(files => Observable.from(files))
    .subscribe(data => console.log(data));

// findExecSql('./src/extract-sql/extract-sql-repository-test/sources/CC0/IKP/PROD/M00/IKP02IAU.txt',
//                 (file, snippet)  => {
//                     console.log('file', file);
//                     console.log('snippets', snippet);
//                 });


// findExecSql('./src/extract-sql/extract-sql-repository-test/sources/CC0/IKP/PROD/M00/IKP02IAU.txt')
//     .subscribe(
//         d => console.log('d', d),
//         e => console.log('error', e),
//         () => console.log('done')
//     )

filesFromDir('./src/extract-sql/extract-sql-repository-test')
    .map(files => files.filter(filePath => filePath.substr(filePath.length - 4, 4) === '.txt'))
    .switchMap(files => Observable.from(files))
    .mergeMap(file => findExecSqlObs(file))
    .subscribe(data => {
        console.log('data', data);
        writeSqlFile(data[0], data[1]);
    });
