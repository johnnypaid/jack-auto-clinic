function auth(req, res, next) {
    console.log('Authtenticating user...');
    next();
}

module.exports = auth;