const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    console.log('Authtenticating user...');

    const token = req.header('x-auth-token'); 
    if(!token) return res.redirect('/');
 
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        console.log('decoded...');
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    } 
}

module.exports = auth;