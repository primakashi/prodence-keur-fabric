'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Pembayaran extends State {
    constructor(obj) {
        super(Pembayaran.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getObj() {
        return this.obj;
    }

    getPemeriksaan() {
        return this.no_pemeriksaan;
    }
    getKendaraan() {
        return this.no_kendaraan;
    }
     
    setPembayaran(newKuitansi,newSku,newStatus,newNip) {
        this.kuitansi = newKuitansi;
        this.sku = newSku;
        this.status = newStatus;
        this.nip = newNip;
    }


    setCreated() {
        this.currentState = pState.CREATED;
    }

    setUpdated() {
        this.currentState = pState.UPDATED;
    }

    setDeleted() {
        this.currentState = pState.DELETED;
    }

    isCreated() {
        return this.currentState === pState.CREATED;
    }

    isUpdated() {
        return this.currentState === pState.UPDATED;
    }

    isDeleted() {
        return this.currentState === pState.DELETED;
    }

    static fromBuffer(buffer) {
        return Pembayaran.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Pembayaran);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, no_stnk, kuitansi, sku, status, nip) {
        return new Pembayaran({no_pemeriksaan, no_kendaraan, no_stnk, kuitansi, sku, status, nip});
    }

    static getClass() {
        return 'org.prodence.pembayaran';
    }

}

module.exports = Pembayaran;
