// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/extract-sql/extract-sql.js
// =================================================== 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {filesFromDir, findExecSqlObs, writeSqlFileObs} from './extract-sql';

filesFromDir('./src/extract-sql/extract-sql-repository-test')
    .map(files => files.filter(filePath => filePath.substr(filePath.length - 4, 4) === '.txt'))
    .switchMap(files => Observable.from(files))
    .subscribe(data => console.log(data));

// filesFromDir('./src/extract-sql/extract-sql-repository-test')
filesFromDir('./extract-sql-repository')
    .map(files => files.filter(filePath => filePath.substr(filePath.length - 4, 4) === '.txt'))
    .switchMap(files => Observable.from(files))
    .mergeMap(file => findExecSqlObs(file))
    .mergeMap(data => writeSqlFileObs(data[0], data[1]))
    .subscribe(_data => {
        console.log('done', _data)
        // console.log('data', data);
        // writeSqlFile(data[0], data[1]);
    });
