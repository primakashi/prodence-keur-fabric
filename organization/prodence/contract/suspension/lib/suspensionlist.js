'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Suspension = require('./suspension.js');

class SuspensionList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.suspensionlist');
        this.use(Suspension);
    }

    async addSuspension(suspension) {
        return this.addState(suspension);
    }

    async getSuspension(suspensionKey) {
        return this.getState(suspensionKey);
    }

    async updateSuspension(suspension) {
        return this.updateState(suspension);
    }
}

module.exports = SuspensionList;