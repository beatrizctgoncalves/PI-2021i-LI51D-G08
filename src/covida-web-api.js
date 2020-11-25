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
        }
    }

    app.get('/games', wa.getMostPopularGames);
    app.get('/games/:id_game', wa.getGameByName);
    app.post('/groups', wa.createGroup);
    app.put('/groups/:id_group', wa.updateGroup);
    app.get('/groups', wa.getAllGroups);
    app.get('/groups/:id_group', wa.getGroupDetails);
    app.put('/groups/:id_group/games/:id_game', wa.addGameToGroup);
    app.delete('/groups/:id_group/games/:id_game', wa.deleteGameFromGroup);
    app.get('/groups/:id_group/games/:min/:max', wa.getGameFromGroup);

    return wa;
}

function processCallBack(err,resp,res){
    if(err)
      responseHandler(err.statusCode, err.body,res)
    else
      responseHandler(resp.statusCode,resp.body,res)
  }
  
function responseHandler(statusCode, body,res){
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode)
    //res.end(body);
    res.end(JSON.stringify(body));
}

module.exports = webApiCreate