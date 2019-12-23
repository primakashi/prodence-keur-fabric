'use strict';
const StateList = require('./../ledger-api/statelist.js');

const TireRim = require('./tirerim.js');

class TireRimList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.tirerimlist');
        this.use(TireRim);
    }

    async addTireRim(tirerim) {
        return this.addState(tirerim);
    }

    async getTireRim(tirerimKey) {
        return this.getState(tirerimKey);
    }

    async updateTireRim(tirerim) {
        return this.updateState(tirerim);
    }
}

module.exports = TireRimList;