// ==================    TO LAUNCH   =================
// npm run tsc  
// node ./dist/extract-sql/read-write-files.script.js
// =================================================== 

import {readDirPromise, readLinesPromise, transform, writeFilePromise} from './read-write-files';


const sourceDir = './src/fs-promises/fs-promises-test-dir/';
const targetDir = './src/fs-promises/fs-promises-test-dir-output';
readDirPromise(sourceDir)
    .then(files => {
        const promises = new Array<Promise<any>>();
        for (const file of files) {
            promises.push(
                            readLinesPromise(file)
                            .then(data => transform(data))
                            .then(data => writeFilePromise(targetDir + data.fileName, data.lines))
                        );
        }
        return promises
    })
    .then(promises => Promise.all(promises))
    .then(() => console.log('I am done'))
	.catch(err => console.error(err))


    