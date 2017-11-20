// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/extract-sql/extract-sql.script.js
// =================================================== 

import {extractSqlSnippets} from './extract-sql';

// extracts the sql snippets present in the directory './extract-sql-repository'
// and write them in files in the directory './sql-snippets-to-delete/'
extractSqlSnippets('./extract-sql-repository', './sql-snippets-to-delete/') .subscribe(file => {
    console.log('sql snippets saved: ', file);
});
