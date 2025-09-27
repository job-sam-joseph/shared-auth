const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

function createPassportStrategy(secretOrKey) {
    return new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey,
        },
        (payload, done) => {
            try {
                return done(null, payload);
            } catch (err) {
                return done(err, false);
            }
        }
    );
}

module.exports = { createPassportStrategy };
