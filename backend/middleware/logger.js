function log(req, res, next) {
    console.log('logging request....');
    next();
}
module.exports = log;