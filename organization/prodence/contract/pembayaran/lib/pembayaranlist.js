'use strict';
const StateList = require('./../ledger-api/statelist.js');

const Pembayaran = require('./pembayaran.js');

class PembayaranList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.pembayaranlist');
        this.use(Pembayaran);
    }

    async addPembayaran(pembayaran) {
        return this.addState(pembayaran);
    }

    async getPembayaran(pembayaranKey) {
        return this.getState(pembayaranKey);
    }

    async updatePembayaran(pembayaran) {
        return this.updateState(pembayaran);
    }
}

module.exports = PembayaranList;