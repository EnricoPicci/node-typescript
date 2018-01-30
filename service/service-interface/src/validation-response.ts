
export class ValidationResponse {
    isValid: boolean;
    errors = new Array<string>();

    getErrorMessage() {
        return this.errors.reduce((message, error) => message + '\n' + error, '');
    }
}

