// https://netbasal.com/a-smaller-bundle-with-const-enums-in-typescript-b7f786227e5e


var Colors;
(function (Colors) {
  Colors[Colors["RED"] = 0] = "RED";
  Colors[Colors["BLUE"] = 1] = "BLUE";
  Colors[Colors["GREEN"] = 2] = "GREEN";
})(Colors || (Colors = {}));

export enum Colors1 {
    RED,
    BLUE,
    GREEN
  }

const ccc = Colors1[''];

console.log(ccc)


