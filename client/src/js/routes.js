const auth = require('./auth.js');

module.exports = {
    home: require('./home.js'),    
    search: require('./search.js'),
    signUp: auth.signUp,
    signIn: auth.signIn,
    logout: auth.logout
};