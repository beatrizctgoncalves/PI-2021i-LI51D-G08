const http = require('http')
const router = require('./router')
const webApi = require('./covida-web-api')
const port = 8080;

router.get('/games', webApi.getAllGames)
//TODO: router.get('/games/:id', webApi.getGame)

const server = http.createServer(router);

// listening on port 8080
server.listen(8080, () => console.log(`Listening at http://localhost:${port}`))



//https://id.twitch.tv/oauth2/token?client_id=s4fwgb8isqexk2j87n2xagqfc3hhy6&client_secret=fn8q07ysz01au8aymek0idhk0rvb4r&grant_type=client_credentials