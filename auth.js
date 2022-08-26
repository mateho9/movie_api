const jwtSecret = 'your_jwt_secret'; //Has to match key used in JWT Strategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: '7d', //how long the token will last
        algorithm: 'HS256' //the algorithm used to sign or encode JWT values
    });
}

/* POST Login */

module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Somthing is not right',
                    user: user
                });
            }

            req.login(user, {session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token })
            });
        })(req, res);
    });
}
