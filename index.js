//test this
// const { initializePassport } = require('./middleware');

// function useAuth(app, secret) {
//     const passport = initializePassport(secret);

//     app.use(passport.initialize());

//     return {
//         authenticate: passport.authenticate('jwt', { session: false }),
//     };
// }

// module.exports = {
//     useAuth,
// };
const { initializeAuth } = require('./middleware');

module.exports = {
    initializeAuth,
};
