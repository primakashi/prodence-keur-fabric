'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Permohonan = require('./permohonan.js');

class PermohonanList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.permohonanlist');
        this.use(Permohonan);
    }

    async addPermohonan(permohonan) {
        return this.addState(permohonan);
    }

    async getPermohonan(permohonanKey) {
        return this.getState(permohonanKey);
    }

    async updatePermohonan(permohonan) {
        return this.updateState(permohonan);
    }
}

module.exports = PermohonanList;