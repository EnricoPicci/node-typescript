
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindNodeCallback';

import * as request from 'request';

// how to invoke and http request
export const callWikipedia = () => {
    request('https://en.wikipedia.org/w/api.php?action=opensearch&search=pentole&namespace=0&limit=10', { json: true }, (err, _res, body) => {
        if (err) { return console.log(err); }
        console.log(_res);
        console.log('body', body);
        return body;
      });
}



export const httpGetRequestAsObs = (uri: string) => {
    return requestAsObs(uri, { json: true });
}
// https://stackoverflow.com/questions/43462628/cannot-create-observable-from-observable-bindnodecallbackfs-readfile-in-typesc
const requestFunction = (uri: string, 
                            options: {}, 
                            callback: (err: Error, _res, body) => void) => request(uri, options, callback);
const requestAsObs = Observable.bindNodeCallback(requestFunction, toResponseOnly);
function toResponseOnly(_res, _body) {
    return _body;
}
