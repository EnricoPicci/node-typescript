import {MyClass} from './my-class';
// import {myClassObjFunctionWithParamObs} from './my-class';
import {myClassObjFunctionWithParamObs} from './my-class';

const myClass = new MyClass();
myClass.name = 'I am your class';

const param = 'I am a param';

myClassObjFunctionWithParamObs(param, myClass)
.subscribe(
    data => console.log('data', data),
    err => console.error(err),
    () => console.log('DONE')
)


