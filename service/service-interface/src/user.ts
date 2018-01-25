export class User {
    enabled: false;

    constructor(public id: string, public name: string) {}

    // is valid if id and name are defined
    isValid() {
        return !(!this.id || !this.name);
    }

    asServiceInput() {
        return JSON.stringify(this);
    }
    
}