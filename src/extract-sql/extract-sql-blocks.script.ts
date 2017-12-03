// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/extract-sql/extract-sql-blocks.script.js
// =================================================== 

import {extractSqlSnippetsBlocks} from './extract-sql';

// extracts the sql snippets present in the directory './extract-sql-repository'
// and write them in files in the directory './sql-snippets-to-delete/'
// files are transformes in blocks of the same size
// each block is processed SEQUENTIALLY to avoid having to many files open in parallel

extractSqlSnippetsBlocks('./extract-sql-repository', './sql-snippets-to-delete/', 5).subscribe(
    emitter => {
        emitter.next();
        emitter.getObservable().subscribe(
            _d => console.log('I passed here'),
            err => console.error(err),
            () => console.log('I should be done')
        )
    },
    err => console.error(err),
    () => console.log('processing launched')
)

