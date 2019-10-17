'use strict';

const State = require('../../ledger-api/state.js');

const kendaraanState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};


class Kendaraan extends State {
    constructor(obj) {
        super(Kendaraan.getClass(), [obj.stuk, obj.no_bkpb]);
        Object.assign(this, obj);
    }

    getBPKB() {
        return this.no_ktp;
    }

    setBPKB(newBPKB) {
        this.no_ktp = newBPKB;
    }

    getKTP() {
        return this.no_ktp;
    }

    setKTP(newKTP) {
        this.no_ktp = newKTP;
    }

    setCreatedData() {
        this.currentState = kendaraanState.CREATED;
    }

    setUpdatedData() {
        this.currentState = kendaraanState.UPDATED;
    }

    setDeletedData() {
        this.currentState = kendaraanState.DELETED;
    }

    isCreatedData() {
        return this.currentState === kendaraanState.CREATED;
    }

    isUpdatedData() {
        return this.currentState === kendaraanState.UPDATED;
    }

    isDeletedData() {
        return this.currentState === kendaraanState.DELETED;
    }

    static fromBuffer(buffer) {
        return Kendaraan.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Kendaraan);
    }

    static createInstance(stuk, no_ktp, no_bkpb, no_stnk, no_mesin, no_rangka, no_ijin_trayek, no_uji_tipe, no_kir) {
        return new Kendaraan({ stuk, no_ktp, no_bkpb, no_stnk, no_mesin, no_rangka, no_ijin_trayek, no_uji_tipe, no_kir });
    }

    static getClass() {
        return 'org.keurnet.kendaraan';
    }
}

module.exports = Kendaraan;