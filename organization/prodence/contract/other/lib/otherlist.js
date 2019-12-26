'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Other = require('./other');

class OtherList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.otherlist');
        this.use(Other);
    }

    async addOther(other) {
        return this.addState(other);
    }

    async getOther(otherKey) {
        return this.getState(otherKey);
    }

    async updateOther(other) {
        return this.updateState(other);
    }
}

module.exports = OtherList;