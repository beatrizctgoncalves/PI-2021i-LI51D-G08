const frisby = require('frisby');

const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;
const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/`;

describe('Get A Specific Game', () => {
    test('Should get a specific game', () => {
        return frisby.get(`${SERVER_URI}/games/Captivus`)
        .expect('status', 200)
        .expect('json', {
            "id": 68841,
            "name": "Captivus",
            "summary": "Join the movement! Build a deck, equip your ship, and take on others in intense 1v1 card battles!"
        })
    })
});

describe('Create Group', () => {
    test('Should create a group', () => {
        return frisby.post(`${SERVER_URI}/groups`, {
            "name": "Test 1",
            "desc": "Description of Test 1",
        })
        .expect('status', 200)
        .expect('text', "Group created successfully")
    })
});

describe('Get All Groups', () => {
    test('Should get all groups', () => {
        return frisby.get(`${SERVER_URI}/groups`)
        .expect('status', 200)
        .expect('json', {
            "name": "Test 1",
            "desc": "Description of Test 1",
            "games": "[]"
        })
    })
});