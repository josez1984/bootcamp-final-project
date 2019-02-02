// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    // hashPassword(password) {
    //     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    // },
    comparePassword(hashPassword, password) {
        // return bcrypt.compareSync(password, hashPassword);
        return hashPassword === password;
    },
    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    },
    generateToken(id) {
        return jwt.sign({
            userId: id
        }, process.env.SECRET, { expiresIn: '7d' })
    }
}