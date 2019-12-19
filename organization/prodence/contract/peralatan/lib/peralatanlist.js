'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Peralatan = require('./peralatan.js');

class PeralatanList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.peralatanlist');
        this.use(Peralatan);
    }

    async addPeralatan(peralatan) {
        return this.addState(peralatan);
    }

    async getPeralatan(peralatanKey) {
        return this.getState(peralatanKey);
    }

    async updatePeralatan(peralatan) {
        return this.updateState(peralatan);
    }
}

module.exports = PeralatanList;