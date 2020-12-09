const frisby = require('frisby');
const Joi = frisby.Joi;
const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;
const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/`;

describe('Get A Specific Game By ID', () => {
    test('Should get a specific game by id', () => {
        return frisby.get(`${SERVER_URI}games/id/1`)
        .expect('status', 200)
        .expect('json', [{
            "id": 1,
            "name": "Thief II: The Metal Age",
            "summary": "The ultimate thief is back! Tread softly as you make your way through 15 new complex, non-linear levels full of loot to steal and guards to outsmart. Improved enemy AI, new gadgets and a riveting story will draw you into the world of Thief II: The Metal Age, a place of powerful new technologies, fanatical religions and corruption.",
            "total_rating": 89.1590627164617,
            "url": "https://www.igdb.com/games/thief-ii-the-metal-age"
        }])
    })
});

describe('Create Group', () => {
    test('Should create a group', () => {
        return frisby.post(`${SERVER_URI}groups`, {
            "name": "Test",
            "desc":"Description of Test 1",
        })
        .expect('status', 201)
        .expect('json', {"message": "Group created successfully!"})
    })
});

describe('Get All Groups', () => {
    test('Should get all groups', () => {
        return frisby.get(`${SERVER_URI}groups`)
        .expect('status', 200)
        .expect('json', [{"name":"Test","desc":"Description of Test 1","games":[]}]
        )
    })
});

describe('Get A Specific Group', () => {
    test('Should get a specific group', () => {
        return frisby.get(`${SERVER_URI}groups/Test`)
        .expect('status', 200)
        .expect('json', [{
            "name":"Test",
            "desc":"Description of Test 1",
            "games":[]
        }])
    })
});

describe('Add Game By ID to Group', () => {
    test('Should add a game by id to a group', () => {
        return frisby.put(`${SERVER_URI}groups/Test/games/1`)
        .expect('status', 200)
        .expect('json', {"message": "Game added successfully to the group!"})
    })
});

describe('Get Ratings From Games From Group', () => {
    test('Should get ratings from games from group', () => {
        return frisby.get(`${SERVER_URI}groups/Test/games/0&100`)
        .expect('status', 200)
        .expect('json', [{
            "id": 1,
            "name": "Thief II: The Metal Age",
            "summary": "The ultimate thief is back! Tread softly as you make your way through 15 new complex, non-linear levels full of loot to steal and guards to outsmart. Improved enemy AI, new gadgets and a riveting story will draw you into the world of Thief II: The Metal Age, a place of powerful new technologies, fanatical religions and corruption.",
            "total_rating": 89.1590627164617
        }])
    })
});

describe('Edit Group', () => {
    test('Should edit a group', () => {
        return frisby.put(`${SERVER_URI}groups/Test`, {
            "name": "Test 1",
            "desc": "Description of Test",
        })
        .expect('status', 200)
        .expect('json', {"message": "Group edited successfully!"})
    })
});

describe('Remove Game By ID', () => {
    test('Should delete a game by id', () => {
        return frisby.delete(`${SERVER_URI}groups/Test 1/games/1`)
        .expect('status', 200)
        .expect('json', {"message":"Game deleted successfully!"})
    })
});