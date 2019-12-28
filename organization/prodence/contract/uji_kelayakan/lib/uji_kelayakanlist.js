'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Uji_kelayakan = require('./uji_kelayakan.js');

class Uji_kelayakanList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.uji_kelayakanlist');
        this.use(Uji_kelayakan);
    }

    async addUji_kelayakan(uji_kelayakan) {
        return this.addState(uji_kelayakan);
    }

    async getUji_kelayakan(uji_kelayakanKey) {
        return this.getState(uji_kelayakanKey);
    }

    async updateUji_kelayakan(uji_kelayakan) {
        return this.updateState(uji_kelayakan);
    }
}

module.exports = Uji_kelayakanList;