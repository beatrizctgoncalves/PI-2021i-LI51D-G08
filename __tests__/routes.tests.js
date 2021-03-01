const frisby = require('frisby');
const SERVER_URI = `http://localhost:8080/api/`;
const Joi = frisby.Joi;

const idGroup = 'keV2jHcBC0TEHSkCcvL9';
const idGame = 1;
const nameGame = 'Captivus';

describe('Get A Specific Game By Id', () => {
    test('Should get a specific game by id', () => {
        return frisby.get(`${SERVER_URI}games/id/${idGame}`)
            .expect('status', 200)
            .expect('jsonTypes', '*', [
                {
                    "id": Joi.number().required(),
                    "name": Joi.string().required(),
                    "summary": Joi.string().required(),
                    "total_rating": Joi.number().required(),
                    "url": Joi.string().required(),
                    "urlImage": Joi.string().required()
                }
            ])
    })
});

describe('Search Game By Name', () => {
    test('Should search game by name', () => {
        return frisby.get(`${SERVER_URI}games/name/${nameGame}`)
            .expect('status', 200)
            .expect('jsonTypes', '*', [
                {
                    "id": Joi.number().required(),
                    "name": Joi.string().required(),
                    "summary": Joi.string().required(),
                    "url": Joi.string().required(),
                    "urlImage": Joi.string().required()
                }
            ])
    })
});

describe('Get All Groups', () => {
    test('Should get all groups', () => {
        return frisby.get(`${SERVER_URI}groups`)
            .expect('status', 200)
            .expect('jsonTypes', '*', [
                {
                    "owner": Joi.string().required(),
                    "name": Joi.string().required(),
                    "desc": Joi.string().required(),
                    "games": Joi.array(),
                    "id": Joi.string().required()
                }
            ])
    })
});

describe('Get A Specific Group', () => {
    test('Should get a specific group', () => {
        return frisby.get(`${SERVER_URI}groups/${idGroup}`)
            .expect('status', 200)
            .expect('jsonTypes', {
                "owner": Joi.string().required(),
                "name": Joi.string().required(),
                "desc": Joi.string().required(),
                "games": Joi.array(),
                "id": Joi.string().required()
            })
    })
});

describe('Add Game By Name to Group', () => {
    test('Should add a game by name to a group', () => {
        return frisby.put(`${SERVER_URI}groups/${idGroup}/games/${idGame}`)
            .expect('status', 200)
            .expect('jsonTypes', Joi.string().required())
    })
});

describe('Get Ratings From Games From Group', () => {
    test('Should get ratings from games from group', () => {
        return frisby.get(`${SERVER_URI}groups/${idGroup}/games?min=0&max=100`)
            .expect('status', 200)
            .expect('jsonTypes', '*', [
                {
                    "id": Joi.number().required(),
                    "name": Joi.string().required(),
                    "summary": Joi.string().required(),
                    "total_rating": Joi.number(),
                    "url": Joi.string().required(),
                    "urlImage": Joi.string().required()
                }
            ])
    })
});

describe('Edit Group', () => {
    test('Should edit a group', () => {
        return frisby.put(`${SERVER_URI}groups/${idGroup}`, {
            "name": "Test 1",
            "desc": "Description of Test",
        })
            .expect('status', 200)
            .expect('jsonTypes', Joi.string().required())    
    })
});

describe('Remove Game From Group By Id', () => {
    test('Should delete a game by id', () => {
        return frisby.delete(`${SERVER_URI}groups/${idGroup}/games/${idGame}`)
            .expect('status', 200)
            .expect('jsonTypes', Joi.string().required())
    })
});
