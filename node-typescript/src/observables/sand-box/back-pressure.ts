// https://stackoverflow.com/questions/40843003/understanding-back-pressure-in-rxjs-only-cache-5-images-waiting-for-upload

import {random_0_1} from '../../utils/random-generators';

import {Observable} from 'rxjs';

export function loadImage(image: string){
    return Observable.of(image).delay(1000)
        //   .do(image => console.log(image + " loading complete"));
//   return Observable.defer(() => {
//     console.log(`Loading ${image}`);
    
//     return Observable.of(image).delay(200)
//       .do(image => console.log(image + " loading complete"))
//   });
}

export function processImage(image){
    return Observable.of(image).delay(3000 + random_0_1()*2000)
      .do(image => console.log(image + " processing complete"));
//   return Observable.defer(() => {
//     console.log(`Processing ${image}`);
    
//     return Observable.of(image).delay(4000)
//       .do(image => console.log(image + " processing complete"));
//   });
}

export var cachedImages = 0;

// Observable.range(1, 10)
//   .map(index => "image_" + index)
//   .mergeMap(image => loadImage(image), 3)
// //   .merge(2)
//   .do( () => {
//     cachedImages++;
//     console.log(`Images in memory: ${cachedImages}`);
//   })
//   .mergeMap(image => processImage(image), 3)
// //   .merge(2)
//   .do( () => {
//     cachedImages--;
//     console.log(`Images in memory: ${cachedImages}`);
//   })
//   .subscribe( item => console.log(item + " complete") );


  Observable.range(1, 10)
  .map(index => "image_" + index)
  .mergeMap(image => {
      return loadImage(image)
            .do( () => {
                cachedImages++;
                console.log(`Images in memory: ${cachedImages}`);
            })
            .mergeMap(image => processImage(image))
            .do( () => {
                cachedImages--;
                console.log(`Images in memory: ${cachedImages}`);
            })
    }, 3)
//   .merge(2)

  
//   .merge(2)
  
  .subscribe( item => console.log(item + " complete") );