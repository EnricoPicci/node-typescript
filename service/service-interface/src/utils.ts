// checks that an email is formally correct
// https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript
export const isEmailValid = (email: string) => {
    if (!email) {
        return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
