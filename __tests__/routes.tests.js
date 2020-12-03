const frisby = require('frisby');
const Joi = frisby.Joi;
const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;
const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/`;

describe('Get A Specific Game', () => {
    test('Should get a specific game', () => {
        return frisby.get(`${SERVER_URI}games/Captivus`)
        .expect('status', 200)
        .expect('json', [{
            "id": 68841,
            "name": "Captivus",
            "summary": "Join the movement! Build a deck, equip your ship, and take on others in intense 1v1 card battles!"
        }])
    })
});

describe('Create Group', () => {
    test('Should create a group', () => {
        return frisby.post(`${SERVER_URI}groups`, {
            "name": "Test",
            "desc":"Description of Test 1",
        })
        .expect('status', 200)
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

describe('Add Game to Group', () => {
    test('Should add a game to a group', () => {
        return frisby.put(`${SERVER_URI}groups/Test/games/新流星搜劍錄`)
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

describe('Remove Game', () => {
    test('Should delete a game', () => {
        return frisby.delete(`${SERVER_URI}groups/Test 1/games/新流星搜劍錄`)
        .expect('status', 200)
        .expect('json', "Game deleted successfully!")
    })
});