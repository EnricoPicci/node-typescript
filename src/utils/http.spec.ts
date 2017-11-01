
import { expect } from 'chai';
import 'mocha';

import {httpGetRequestAsObs} from './http'

describe('httpGetRequestAsObs function', () => {
    
      it('issues an http get request to wikipedia - returns an observable', () => {
        const uri = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=pentole&namespace=0&limit=10';
        httpGetRequestAsObs(uri).subscribe(
          data => expect(data.length).to.greaterThan(0),
          error => console.error(error)
        )
      });
    
    });
