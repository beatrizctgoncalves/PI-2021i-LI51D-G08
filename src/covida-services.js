module.exports = (CovidaGamesData, CovidaDB) => {
    return {
        getMostPopularGames: getMostPopularGames,
        getGame: getGame,
        postGroup: postGroup,
        putGroup: putGroup,
        getAllGroups: getAllGroups,
        getGroup: getGroup,
        putGameOnGroup: putGameOnGroup,
        deleteGameFromGroup: deleteGameFromGroup,
        getGameFromGroup: getGameFromGroup
    }
 
    
};

function getMostPopularGames(queryOrderBy, callback) {
    rsp.json(tasks)
}

function getTask(req, rsp) {
    const id = req.params.id
    const task = tasks.find(t => t.id == id)
    if(task) {
      return rsp.json(task)
    }
    sendNotFound(req, rsp)
  }
  
  function deleteTask(req, rsp) {
    const id = req.params.id
    let newTasks = tasks.filter(t => t.id != id)
  
    if(newTasks.length != tasks.length) {
      tasks = newTasks
      return sendChangeSuccess(req, rsp, id, "deleted")
    }
    sendNotFound(req, rsp)
  }
  
  function updateTask(req, rsp) {
    const id = req.params.id
    const task = tasks.find(t => t.id == id)
    if(task) {
      task.name = req.body.name
      task.description = req.body.description
      return sendChangeSuccess(req, rsp, id, "updated")
    }
    sendNotFound(req, rsp)
  }
  
  function createTask(req, rsp) {
    const task = { name: req.body.name, description: req.body.description}
    const id = task.id = ++maxId;
    //tasks.id = tasks.map(t => t.id).sort().pop()+1 // Just for fun, but extremely inefficient!!! 
  
    tasks.push(task)
    return sendChangeSuccess(req, rsp, id, "created", `/${id}`)
  }
  
  
  function Error(msg, uri) {
    this.error = msg
    this.uri = uri
  }
  
  
  function sendNotFound(req, rsp) {
    rsp.status(404).json(new Error("Resource not found", req.originalUrl))
  }
  
  function sendChangeSuccess(req, rsp, id, changeType, urlSuffix = "") {
    rsp.json({
      status : `task wit id ${id} ${changeType}`,
      uri: req.originalUrl + urlSuffix
    })
  }
    