// this is a class that contain some util functions

// To undestand how import works it is useful to read the TypeScript docomentation
// https://www.typescriptlang.org/docs/handbook/modules.html
//
// The syntax that allows the correct import of lodash is
//      import * as _ from 'lodash';
//      import _ = require('lodash');
//      import toUpper = require('lodash/toUpper');
// https://stackoverflow.com/questions/48317789/how-to-import-a-js-module-with-types-definitions-in-typescript-example-with-l
// https://stackoverflow.com/questions/39415661/what-does-resolves-to-a-non-module-entity-and-cannot-be-imported-using-this
//
// there are alternative syntaxed, linked to the property "allowSyntheticDefaultImports": true
// in tsconfig.json, but they seem NOT TO WORK even if somebody states they should
// https://stackoverflow.com/questions/34660265/importing-lodash-into-angular2-typescript-application
// Probably I have still to understand how modules are really treated and imported

// THESE FORMS OF IMPORT WORK
// import * as _ from 'lodash';
import _ = require('lodash');
import toUpper = require('lodash/toUpper');

// *****************************************
// THESE FORMS OF IMPORT DO NOT WORK
// import toUpper from 'lodash/toUpper'
// import {toUpper} from 'lodash/toUpper';
// import _ from 'lodash';
// import { _ } from 'lodash';
// *****************************************

export class TestUtil {
    toUpperCase(s: string) {
        // return toUpper(s);
        return _.toUpper(s);
    }
}


export class TestUtilGranular {
    toUpperCase(s: string) {
        return toUpper(s);
    }
}
