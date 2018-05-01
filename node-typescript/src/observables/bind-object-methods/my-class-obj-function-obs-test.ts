import {MyClass} from './my-class';
import {myClassObjFunctionObs} from './my-class';

const myClass = new MyClass();
myClass.name = 'I am your class';

myClassObjFunctionObs(myClass)
.subscribe(
    data => console.log('data', data),
    err => console.error(err),
    () => console.log('DONE')
)


