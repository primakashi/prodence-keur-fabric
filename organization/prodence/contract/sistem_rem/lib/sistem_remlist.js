'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Sistem_rem = require('./sistem_rem.js');

class Sistem_remList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.sistem_remlist');
        this.use(Sistem_rem);
    }

    async addSistem_rem(sistem_rem) {
        return this.addState(sistem_rem);
    }

    async getSistem_rem(sistem_remKey) {
        return this.getState(sistem_remKey);
    }

    async updateSistem_rem(sistem_rem) {
        return this.updateState(sistem_rem);
    }
}

module.exports = Sistem_remList;