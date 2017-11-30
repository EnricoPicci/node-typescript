
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {findSnippetsObs, writeFileObs} from '../utils/fs-observables';

function findExecSqlObs(fromDirPath: string) {
    return findSnippetsObs(fromDirPath, 'EXEC SQL', 'END-EXEC', line => line[6] === '*');
}

// toDirPath needs to end with '/' char
export function extractSqlSnippets(fromDirPath: string, toDirPath: string) {
    return findExecSqlObs(fromDirPath)
        .map(filePathAndSnippets => {
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
        })
        .mergeMap(filePathAndContent => writeFileObs(filePathAndContent.filePath, filePathAndContent.content))
}
