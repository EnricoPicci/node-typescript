import {ValidationResponse} from './validation-response';

export class User {
    id: string;
    public name: string;

    constructor({id, name}) {
        this.id = id;
        this.name = name;
    }

    // is valid if id and name are defined
    validate() {
        const response = new ValidationResponse();
        response.isValid = true;
        if (!this.id) {
            response.isValid = false;
            response.errors.push("User id is null");
        }
        if (!this.name) {
            response.isValid = false;
            response.errors.push("User name is null");
        }
        return response
    }
    
}