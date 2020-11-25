const request  = require('request');
const assert = require('assert');
const assert = require('assert');

const MOCHA_TIMEOUT = 10000000;

describe('GET Specific Games', function() {
    this.timeout(MOCHA_TIMEOUT)

    const options = .requestServerOptions('GET', 'games/Captivus', null)
    it('Should return Captivus with the status code \'200 OK\'', function(done) {
        request.get(options, (err, res, body) => {
            assert.equal(body[0].name, "Captivus")
            assert.equal(res.statusCode, 200)
            done()
        })
    });
});

describe('GET Popular Games', function() {
    this.timeout(MOCHA_TIMEOUT)

    const options = .requestServerOptions('GET', 'games', null)
    it('Should return 10 games with the status code \'200 OK\'', function(done) {
        request.get(options, (err, res, body) => {
            assert.equal(body.length, 20)
            assert.equal(res.statusCode, 200)
            done()
        })
    });
});