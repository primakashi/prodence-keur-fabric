'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Lain_lain extends State {
    constructor(obj) {
        super(Lain_lain.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getKendaraa() {
        return this.obj;
    }

    getNoKendaraan() {
        return this.no_kendaraan;
    }

    setPemeriksaanLain_lain(newSistemBahanBakar, newSistemKelistrikan, newStatus) {
        this.sistem_bahan_bakar = newSistemBahanBakar;
        this.sistem_kelistrikan = newSistemKelistrikan;
        this.status = newStatus;

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
        return Lain_lain.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Lain_lain);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, sistem_bahan_bakar, sistem_kelistrikan, status) {
        return new Lain_lain({ no_pemeriksaan, no_kendaraan,sistem_bahan_bakar, sistem_kelistrikan,status});
    }

    static getClass() {
        return 'org.prodence.lain_lain';
    }

}

module.exports = Lain_lain;
