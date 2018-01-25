import {isEmailValid} from './utils';

export interface Customer {
    id: string;
    firstName?: string;
    lastName: string;
    email: string;
}

// checks that mandatory fields are present - in this exapmple id and email are mandatory
// checks also that email is formatted correctly
export const validateCustomer = (customer: Customer) => {
    const ret = {isValid: true, errors: new Array<string>()};
    if (!customer.id) {
        ret.isValid = false;
        ret.errors.push("property id has to be defined");
    }
    if (!customer.email) {
        ret.isValid = false;
        ret.errors.push("property email has to be defined");
    } else {
        if (!isEmailValid(customer.email)) {
            ret.isValid = false;
            ret.errors.push("email is not valid");
        }
    }
    return ret;
}

