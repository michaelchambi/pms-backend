const randomstring = require("randomstring");
module.exports = {
    passoword() {
        return GeneratePassword = randomstring.generate({
            length: 10,
            charset: 'alphabetic'
        });
    }
}