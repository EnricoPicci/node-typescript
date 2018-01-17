// this is a class that contain some util functions

export class AnotherTestUtil {
    sum2numbers(first: number, second: number) {
        return first + second;
    }
}


export const aTestFunctionToConcatenateNumbers = (numbers: Array<number>) => {
    const reducer = (acc: string, curr: number) => {
        return acc + curr.toString();
    };
    return numbers.reduce(reducer, '');
}

