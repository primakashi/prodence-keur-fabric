'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Penerangan = require('./penerangan.js');

class PeneranganList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.peneranganlist');
        this.use(Penerangan);
    }

    async addPenerangan(penerangan) {
        return this.addState(penerangan);
    }

    async getPenerangan(peneranganKey) {
        return this.getState(peneranganKey);
    }

    async updatePenerangan(penerangan) {
        return this.updateState(penerangan);
    }
}

module.exports = PeneranganList;