/* eslint-disable no-undef */
'use strict'

const db = require('./../covida-db');
const data = require('./../igdb-data');

const servicesCreator = require('./../covida-services');
const services = servicesCreator(data, db);

describe('it-services operations test', itServicesOperationsTests)

function itServicesOperationsTests() {
    describe("getGameByName", getGameByName)

function getGameByName(){
    it('Should Display a valid Array of Games', function(done) {
        services.getGameByName('', function(err, data) {
            // Assert
            const res = [
                {
                    "id": 70,
                    "name": "Terra Nova: Strike Force Centauri",
                    "summary": "Lead an elite fighting team battling for freedom from the sinister forces of the Earth Hegemony. Engage in combat on the bloody battlefields of four unique worlds. Encased in your Powered Battle Armour (PBA) you are an unstoppable fighting force."
                },
                {
                    "id": 40104,
                    "name": "Dogou Souken",
                    "summary": "An overhead-view shoot'em up game."
                }
            ]
            console.log(typeof(data.body));
            console.log(typeof(res));

            expect(err).not.to.be.an('error')
            expect(data.body).to.eql(res)
            if(err) {
              throw new Error("Invalid Game Name")
            }
            done()

        })
      })
}
}

