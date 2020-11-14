
const reqMethods = {
    get: [],
    post: [],
    put: [],
    delete: []
}

function router(req,res) {
    const reqHandler = pathHandlers[req.method.toLowerCase()]
    const url = parse(req.url, true); // returns an object {pathname, query, host}
    const {pathname} = url;
    let newPathName = pathname.split('/')

    const arrPathHandler = reqHandler.find(arrayPathHandler => arrayPathHandler.path.length === newPathName.length &&
        arrayPathHandler.path.every((elementGiven, idx) => elementGiven.indexOf(':') === 0 ||
            elementGiven === newPathName[idx]))
    if (arrPathHandler) arrPathHandler.handler(req, res)
    else {
        res.status = 404
        res.end()
    }
}

//GET
router.get = function(path, handler) {
    let pathSplit = path.split('/').slice(1)
    reqMethods.get.push({
        path: pathSplit,
        handler: handler
    })
}

//POST
router.post = function(path, handler) {
    //TODO
}

//PUT
router.put = function(path, handler) {
    //TODO
}

//DELETE
router.delete = function(path, handler) {
    //TODO
}

module.exports = router


