'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Suspension extends State {
    constructor(obj) {
        super(Suspension.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getObj() {
        return this.obj;
    }

    getPemeriksaan() {
        return this.no_pemeriksaan;
    }

    getNoKendaraan() {
        return this.no_kendaraan;
    }

    setSuspension(newSuspensiRodaDepan, newSuspensiRodaBelakang, newSumbu, newPemasanganSumbu, newPegas, newBantalanRoda, newStatus) {
        this.suspensi_roda_depan = newSuspensiRodaDepan;
        this.suspensi_roda_belakang = newSuspensiRodaBelakang;
        this.sumbu = newSumbu;
        this.pemasangan_sumbu = newPemasanganSumbu;
        this.pegas = newPegas;
        this.bantalan_roda = newBantalanRoda;
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
        return Suspension.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Suspension);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, suspensi_roda_depan, suspensi_roda_belakang, sumbu, pemasangan_sumbu, pegas, bantalan_roda, status) {
        return new Suspension({ no_pemeriksaan, no_kendaraan, suspensi_roda_depan, suspensi_roda_belakang, sumbu, pemasangan_sumbu, pegas, bantalan_roda, status });
    }

    static getClass() {
        return 'org.prodence.suspension';
    }

}

module.exports = Suspension;