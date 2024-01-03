const bcrypt = require("bcrypt");

const salt = 10;

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, encryptedPassword) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(encryptedPassword);
        });
    });
}

function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(
            password,
            encryptedPassword,
            (err, isPasswordCorrect) => {
                if (!!err) {
                    reject(err);
                    return;
                }
                resolve(isPasswordCorrect);
            }
        );
    });
}
module.exports = { encryptPassword, checkPassword };
