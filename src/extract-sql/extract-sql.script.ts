// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/extract-sql/extract-sql.script.js
// =================================================== 

import {extractSqlSnippets} from './extract-sql';

extractSqlSnippets('./extract-sql-repository', './sql-snippets-to-delete/');
