// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/extract-sql/extract-sql-blocks-2.script.js
// =================================================== 

import {extractSqlSnippetsBlocks2} from './extract-sql';

// extracts the sql snippets present in the directory './extract-sql-repository'
// and write them in files in the directory './sql-snippets-to-delete/'
// files are transformes in blocks of the same size
// each block is processed SEQUENTIALLY to avoid having to many files open in parallel

extractSqlSnippetsBlocks2('./extract-sql-repository', './sql-snippets-to-delete/', 5).subscribe(
    file => {
        console.log('File written', file);
    },
    err => console.error(err),
    () => console.log('processing completed')
)

