const frisby = require('frisby');
const Joi = frisby.Joi;
const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;
const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/`;

describe('Get A Specific Game By Name', () => {
    test('Should get a specific game by name', () => {
        return frisby.get(`${SERVER_URI}games/name/Captivus`)
        .expect('status', 200)
        .expect('json', [{
            "id": 68841,
            "name": "Captivus",
            "summary": "Join the movement! Build a deck, equip your ship, and take on others in intense 1v1 card battles!",
            "url": "https://www.igdb.com/games/captivus"
        }])
    })
});

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
        .expect('json', "Group created successfully")
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

describe('Add Game By Name to Group', () => {
    test('Should add a game by name to a group', () => {
        return frisby.put(`${SERVER_URI}groups/Test/games/name/新流星搜劍錄`)
        .expect('status', 200)
        .expect('json', "Game added successfully to the group!")
    })
});

describe('Add Game By ID to Group', () => {
    test('Should add a game by id to a group', () => {
        return frisby.put(`${SERVER_URI}groups/Test/games/id/1`)
        .expect('status', 200)
        .expect('json', "Game added successfully to the group!")
    })
});

describe('Get Ratings From Games From Group', () => {
    test('Should get ratings from games from group', () => {
        return frisby.get(`${SERVER_URI}groups/Test/games/0&70`)
        .expect('status', 200)
        .expect('json', [{
            "id": 81419, 
            "name": "新流星搜劍錄", 
            "summary": "\" Master of Meteor Blades \" is a cold weapon battle game built by Titans studio, is the \"meteor butterfly sword. Net\" authentic sequel, the game is used of the original Chinese martial arts cold weapon rub tactics play , this game at the E3 exhibition, won the \"best game creative play\" award.",
            "total_rating": 50}])
    })
});

describe('Edit Group', () => {
    test('Should edit a group', () => {
        return frisby.put(`${SERVER_URI}groups/Test`, {
            "name": "Test 1",
            "desc":"Description of Test",
        })
        .expect('status', 200)
        .expect('json', "Group edited successfully!")
    })
});

describe('Remove Game By ID', () => {
    test('Should delete a game by id', () => {
        return frisby.delete(`${SERVER_URI}groups/Test 1/games/1`)
        .expect('status', 200)
        .expect('json', "Game deleted successfully!")
    })
});