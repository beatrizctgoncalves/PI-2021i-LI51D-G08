const frisby = require('frisby');
const SERVER_URI = `http://localhost:8080/`;
const Joi = frisby.Joi;

describe('Get A Specific Game By Id', () => {
    test('Should get a specific game by id', () => {
        return frisby.get(`${SERVER_URI}games/id/1`)
        .expect('status', 200)
        .expect('json', [{
            "id":1,
            "name":"Thief II: The Metal Age",
            "summary":"The ultimate thief is back! Tread softly as you make your way through 15 new complex, non-linear levels full of loot to steal and guards to outsmart. Improved enemy AI, new gadgets and a riveting story will draw you into the world of Thief II: The Metal Age, a place of powerful new technologies, fanatical religions and corruption.",
            "total_rating":89.1590627164617,
            "url":"https://www.igdb.com/games/thief-ii-the-metal-age"
        }])
    })
});

describe('Search Game By Name', () => {
    test('Should search game by name', () => {
        return frisby.get(`${SERVER_URI}games/name/Cap`)
        .expect('status', 200)
        .expect('json', [
            {
                "id": 136516,
                "name": "Frog Fractions GotDE - Hop's Iconic Cap",
                "summary": "Experience a day in the life of a frog who is wearing a hat! This DLC hat provides you with the flair you need to face down the bugs with style, and impress the audience while you're at it! Hat not recommended for first-time players of Frog Fractions!",
                "url": "https://www.igdb.com/games/frog-fractions-gotde-hops-iconic-cap"
            },
            {
                "id": 14374,
                "name": "Cap'n Carnage",
                "summary": "This game was released as a game to advertise Cap'n Crunch cereal. In the game you raise crunchlings by playing mini-games to raise their stats, in order to defeat the boss at the end. There are 3 separate mini-games in the game.",
                "url": "https://www.igdb.com/games/capn-carnage"
            },
            {
                "id": 103844,
                "name": "Mad Caps",
                "summary": "Unbottle the fun with Mad Caps, a puzzle game gone MAD! Send bottle caps flying with every move to get your fill of tasty soda. Zap caps with Rayguns, target 'em with Rockets or use the Alien to transform them. Collect letters to spell Mystery Words along with other \"under-the-cap\" bonuses. Let Mad Caps quench your thirst for fun!",
                "url": "https://www.igdb.com/games/mad-caps"
            },
            {
                "id": 54111,
                "name": "Ice Caps",
                "url": "https://www.igdb.com/games/ice-caps"
            },
            {
                "id": 73728,
                "name": "Handy Caps",
                "summary": "Handy Caps is a DOS trivia game.",
                "url": "https://www.igdb.com/games/handy-caps"
            },
            {
                "id": 139583,
                "name": "Red Cap Zombie Hunter",
                "summary": "Human Resistence leader, hires Red Cap as ZOMBIE HUNTER. Red cap will receive information about the areas that are full of zombies and need to be \"cleaned\" and also about the most strong zombies that are starting to manage their own armies.",
                "url": "https://www.igdb.com/games/red-cap-zombie-hunter"
            },
            {
                "id": 28344,
                "name": "Cap'n Marcela parrot charmer",
                "summary": "The mighty Puffy Shirt Morgan and his band of pirates lay siege to the small Crabs Bay village and threaten to burn it entirely if people don't surrender before sunrise. Fortunately, the intrepid Marcela is determined not to give up so easily and to thwart the plans of the vile pirate. The clock is ticking and you'll have to help her to get rid of the attackers in this very nice adventure game.",
                "url": "https://www.igdb.com/games/capn-marcela-parrot-charmer"
            },
            {
                "id": 135737,
                "name": "Cap'n Crunch's Crunchling Adventure",
                "summary": "This game was released as a game to advertise Cap'n Crunch cereal. In the game you raise crunchlings by playing mini-games to raise their stats, in order to defeat the boss at the end. There are 3 separate mini-games in the game.",
                "url": "https://www.igdb.com/games/capn-crunchs-crunchling-adventure"
            },
            {
                "id": 1035,
                "name": "The Legend of Zelda: The Minish Cap",
                "summary": "When the sorcerer Vaati turns Princess Zelda to stone, the king of Hyrule sends Link on a quest to free Zelda from her curse. With the help of Ezlo, a Minish also cursed by Vaati, Link must travel through a fantastical world rife with new items, puzzles, and bosses. As Link, you can shrink down to battle large enemies from within, find or unlock secret items and solve puzzles by fusing together magic relics.",
                "total_rating": 86.78894919119544,
                "url": "https://www.igdb.com/games/the-legend-of-zelda-the-minish-cap"
            },
            {
                "id": 54433,
                "name": "The Adventures of Little Red Riding Cap",
                "summary": "A happy, easy-going girl starts on a most familiar trip to her grandmother's house, but the fairy tale doesn't tell us all the difficulties she faces on her journey. Along the way, she'll need to find and make food and visit the local village, which is inhabited by simple, sociable folk who are always ready to accept the help of a curious and kind-hearted girl.",
                "url": "https://www.igdb.com/games/the-adventures-of-little-red-riding-cap"
            }
        ])
    })
});

describe('Get All Groups', () => {
    test('Should get all groups', () => {
        return frisby.get(`${SERVER_URI}groups`)
        .expect('status', 200)
        .expect('jsonTypes', '*', [{
            "name":Joi.string().required(),
            "desc":Joi.string().required(),
            "games":Joi.array(),
            "id":Joi.string().required()
        }])
    })
});

describe('Get A Specific Group', () => {
    test('Should get a specific group', () => {
        return frisby.get(`${SERVER_URI}groups/${Joi.string()}`)
        .expect('status', 200)
        .expect('json', 'jsonTypes', '*', {
            "name":Joi.string().required(),
            "desc":Joi.string().required(),
            "games":Joi.array(),
            "id":Joi.string().required()
        })
    })
});

describe('Add Game By Name to Group', () => {
    test('Should add a game by name to a group', () => {
        return frisby.put(`${SERVER_URI}groups/TLGhaHYB19w9EKmT1MPU/games/1`)
        .expect('status', 200)
        .expect('json', `${SERVER_URI}groups/TLGhaHYB19w9EKmT1MPU`)
    })
});

describe('Get Ratings From Games From Group', () => {
    test('Should get ratings from games from group', () => {
        return frisby.get(`${SERVER_URI}groups/TLGhaHYB19w9EKmT1MPU/games/0&100`)
        .expect('status', 200)
        .expect('json', [{
            "summary": "The ultimate thief is back! Tread softly as you make your way through 15 new complex, non-linear levels full of loot to steal and guards to outsmart. Improved enemy AI, new gadgets and a riveting story will draw you into the world of Thief II: The Metal Age, a place of powerful new technologies, fanatical religions and corruption.",
            "name": "Thief II: The Metal Age",
            "total_rating": 89.1590627164617,
            "id": 1,
            "url": "https://www.igdb.com/games/thief-ii-the-metal-age"
        }])
    })
});

describe('Edit Group', () => {
    test('Should edit a group', () => {
        return frisby.put(`${SERVER_URI}groups/TLGhaHYB19w9EKmT1MPU`, {
            "name": "Test 1",
            "desc": "Description of Test",
        })
        .expect('status', 200)
        .expect('json', `${SERVER_URI}groups/TLGhaHYB19w9EKmT1MPU`)
    })
});

describe('Remove Game From Group By Id', () => {
    test('Should delete a game by id', () => {
        return frisby.delete(`${SERVER_URI}groups/TLGhaHYB19w9EKmT1MPU/games/1`)
        .expect('status', 200)
        .expect('json', "http://localhost:8080/groups/TLGhaHYB19w9EKmT1MPU")
    })
});

//TODO: finish tests
/*describe('Create Group', () => {
    test('Should create a group', () => {
        return frisby.post(`${SERVER_URI}groups`, {
            "name": "Test",
            "desc": "Description of Test 1",
        })
        .expect('status', 201)
        .expect('json', Joi.string())
    })
});

describe('Remove Group By Id', () => {
    test('Should delete a grout by id', () => {
        return frisby.delete(`${SERVER_URI}groups/`)
        .expect('status', 200)
        .expect('json', "http://localhost:8080/groups/")
    })
});*/