'use strict';

const StateList = require('./../../ledger-api/statelist.js');

const Kendaraan = require('./kendaraan.js.js');

class KendaraanList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.keurnet.kendaraanlist');
        this.use(Kendaraan);
    }

    async addKendaraan(kendaraan) {
        return this.addState(kendaraan);
    }

    async getKendaraan(kendaraanKey) {
        return this.getState(kendaraanKey);
    }

    async updateKendaraan(kendaraan) {
        return this.updateState(kendaraan);
    }
}

module.exports = KendaraanList;
