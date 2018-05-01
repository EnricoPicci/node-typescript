
import {Observable} from 'rxjs';


function getComments(params) {
    return Observable.throw(params);
}

const params = 'abc'; 

Observable.of(null)
.switchMap(_ => {
    return getComments(params)
      .map(data => ({ loading: false, data }))
      .catch(err => {
        console.log('debugging here', err);
        return Observable.empty();
    });
})
.subscribe(
    console.log,
    error => console.error('This method is not called since the error is already caught', error),
    () => console.log('DONE')
)


