const Validator = require('../Validator.js');

module.exports = class LoginForm {
    constructor() {
        let errors = {};

        this.setError = (key, error) => {
            errors[key] = error;
        };

        this.getErrors = () => {
            return errors;
        };
    }

    validate(email, password) {
        if (!Validator.emailValidate(email)) {
            this.setError("email", "Please enter a valid email address.");
        }

        if (!Validator.stringValidate(password)) {
            this.setError("password", "Please enter at least 7 characters for a password.");
        }
        
        return this.getErrors();
    }
}