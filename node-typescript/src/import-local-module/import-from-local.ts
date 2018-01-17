
import {TestUtil, AnotherTestUtil, aTestFunctionToConcatenateNumbers} from 'local-module-typescript';

export function toUpperCaseFromLocalUtil(aString: string) {
    const util = new TestUtil();
    return util.toUpperCase(aString);
}

export function sum2numbersFromLocalUtil(oneNumber: number, aSecondNumber: number) {
    const util = new AnotherTestUtil();
    return util.sum2numbers(oneNumber, aSecondNumber);
}

export function concatenateNumbersFromLocalUtil(numbers: Array<number>) {
    return aTestFunctionToConcatenateNumbers(numbers);
}
