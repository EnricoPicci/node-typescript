// this is a class that contain some util functions

// Apparently the only syntax that allows the correct import of lodash is
//     import * as _ from 'lodash';
// https://stackoverflow.com/questions/39415661/what-does-resolves-to-a-non-module-entity-and-cannot-be-imported-using-this
//
// there are alternative syntaxed, linked to the property "allowSyntheticDefaultImports": true
// in tsconfig.json, but they seem NOT TO WORK even if somebody states they should
// https://stackoverflow.com/questions/34660265/importing-lodash-into-angular2-typescript-application
// Probably I have still to understand how modules are really treated and imported

import * as _ from 'lodash';
// import toUpper from 'lodash/toUpper'
// import _ from 'lodash';
// import { _ } from 'lodash';

export class TestUtil {
    toUpperCase(s: string) {
        // return toUpper(s);
        return _.toUpper(s);
    }
}
