'use strict'

function webApiCreate(app, services){
    const wa = {
        getMostPopularGames: function(req, res) {
            console.log("Most Popular Games")
            services.getMostPopularGames(((err, resp) => processCallBack(err, resp, res)))
        }
    }

    app.get('/games', wa.getMostPopularGames);
   
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
    res.end(JSON.stringify(body));
}

module.exports = webApiCreate