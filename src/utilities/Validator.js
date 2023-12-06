module.exports = {
    stringValidate: async (input='', min=7, max=Infinity) => {
        if (input.length < min || input.length > max) {
            return false;
        }

        return true;
    }
}