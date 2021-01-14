const auth = require('./auth.js');

module.exports = {
    home: require('./home.js'),    
    search: require('./search.js'),
    signUp: auth.signUp,
    signIn: auth.signIn,
    logout: auth.logout,
    account: require('./account.js'),
    groups: require('./groups/groups.js'),
    editGroup: require('./groups/editGroup.js'),
    removeGroup: require('./groups/removeGroup.js'),
    detailsGroup: require('./groups/detailsGroup.js'),
    searchGame: require('./groups/searchGameToAdd.js'),
    addGame: require('./groups/addGame.js'),
    removeGame: require('./groups/removeGame.js')
};