'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Lain_lain = require('./lain_lain.js');

class Lain_lainList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.lain_lainlist');
        this.use(Lain_lain);
    }

    async addLain_lain(lain_lain) {
        return this.addState(lain_lain);
    }

    async getLain_lain(lain_lainKey) {
        return this.getState(lain_lainKey);
    }

    async updateLain_lain(lain_lain) {
        return this.updateState(lain_lain);
    }
}

module.exports = Lain_lainList;