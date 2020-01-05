'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Sistem_kemudi = require('./sistem_kemudi.js');

class Sistem_kemudiList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.sistem_kemudilist');
        this.use(Sistem_kemudi);
    }

    async addSistem_kemudi(sistem_kemudi) {
        return this.addState(sistem_kemudi);
    }

    async getSistem_kemudi(sistem_kemudiKey) {
        return this.getState(sistem_kemudiKey);
    }

    async updateSistem_kemudi(sistem_kemudi) {
        return this.updateState(sistem_kemudi);
    }
}

module.exports = Sistem_kemudiList;