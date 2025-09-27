const jwt = require('jsonwebtoken');

function createVerifyToken({ secret, findUserByEmail }) {
    return async function verifyToken(req, res, next) {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            req.headers['authorization'] = req.headers['authorization'].replace('Bearer ', 'JWT ');
        } else {
            req.headers['authorization'] = req.headers['authorization'].replace('JWT ', 'Bearer ');
        }
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ auth: false, message: 'No token provided.' });
            }

            try {
                const decoded = jwt.verify(token, secret);
                if (findUserByEmail) {
                    const user = await findUserByEmail(decoded.email);
                    if (!user) {
                        return res.status(401).json({ auth: false, message: 'User not found.' });
                    }
                    req.user = user;
                } else {
                    req.user = decoded;
                }
                next();
            } catch (error) {
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            }
        } else {
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        }
    };
}
module.exports = { createVerifyToken };
