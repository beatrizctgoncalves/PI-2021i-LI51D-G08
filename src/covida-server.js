const http = require('http')
const router = require('./router')
const webApi = require('./covida-web-api')
const port = 8080;

router.get('/games', webApi.getAllGames)
//TODO: router.get('/games/:id', webApi.getGame)

const server = http.createServer(router);

// listening on port 8080
server.listen(8080, () => console.log(`Listening on port ${port}`))
