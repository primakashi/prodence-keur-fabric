'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Mesin_transmisi = require('./mesin_transmisi.js');

class Mesin_transmisiList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.mesin_transmisilist');
        this.use(Mesin_transmisi);
    }

    async addMesin_transmisi(mesin_transmisi) {
        return this.addState(mesin_transmisi);
    }

    async getMesin_transmisi(mesin_transmisiKey) {
        return this.getState(mesin_transmisiKey);
    }

    async updateMesin_transmisi(mesin_transmisi) {
        return this.updateState(mesin_transmisi);
    }
}

module.exports = Mesin_transmisiList;