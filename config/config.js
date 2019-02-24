var env = require('./config.json');

exports.config = function () {
    const environment = process.env.NODE_ENV || 'development';
    console.log('emvioment : ' + environment);
    return env[environment];
};