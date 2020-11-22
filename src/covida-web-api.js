'use strict'

function webApiCreate(app, services){
    const wa = {
        getMostPopularGames: function(req, res) {
            console.log("Most Popular Games")
            services.getMostPopularGames(((err, resp) => processCallBack(err, resp, res)))
        },

        getGameByName: function(req, res) {
            console.log("Specific Game")
            services.getGameByName(((err, resp) => processCallBack(err, resp, res)))
        },

        postGroup: function(req, res) {
            console.log("Create Group")
            services.postGroup(/*TODO*/)
        },

        putGroup: function(req, res) {
            console.log("Update Group")
            services.putGroup(/*TODO*/)
        },

        getAllGroups: function(req, res) {
            console.log("Get All Group")
            services.getAllGroups(/*TODO*/)
        },

        getGroup: function(req, res) {
            console.log("Get Specific Group")
            services.getGroup(/*TODO*/)
        },

        putGameOnGroup: function(req, res) {
            console.log("Add Game To Group")
            services.putGameOnGroup(/*TODO*/)
        },

        deleteGameFromGroup: function(req, res) {
            console.log("Delete Game From Group")
            services.deleteGameFromGroup(/*TODO*/)
        },

        getGameFromGroup: function(req, res) {
            console.log("Get Game From Group")
            services.getGameFromGroup(/*TODO*/)
        }
    }

    app.get('/games', wa.getMostPopularGames);
    app.get('/game/:id_game', wa.getGameByName);
    app.post('/group', wa.postGroup);
    app.put('/group/:id_group', wa.putGroup);
    app.get('/group', wa.getAllGroups);
    app.get('/group/:id_group', wa.getGroup);
    app.put('/group/:id_group/game/:id_game', wa.putGameOnGroup);
    app.delete('/group/:id_group/game/:id_game', wa.deleteGameFromGroup);
    app.get('/group/:id_group/game/:min/:max', wa.getGameFromGroup);

    return wa;
}

module.exports = webapi