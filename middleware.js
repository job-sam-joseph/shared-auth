const passport = require('passport');
const { createPassportStrategy } = require('./passportStrategy');
const { createVerifyToken } = require('./verifyToken');

function initializeAuth({ secret, usePassport = false, findUserByEmail }) {
    if (usePassport) {
        passport.use(createPassportStrategy(secret));
        return {
            init: passport.initialize(),
            authenticate: passport.authenticate('jwt', { session: false }),
        };
    }

    return {
        init: (req, res, next) => next(),
        authenticate: createVerifyToken({ secret, findUserByEmail }),
    };
}

module.exports = { initializeAuth };
