'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Mesin_transmisi extends State {
    constructor(obj) {
        super(Mesin_transmisi.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getKendaraa() {
        return this.obj;
    }

    getNoKendaraan() {
        return this.no_kendaraan;
    }

    setPemeriksaanMesin_transmisi(newDudukanMesin, newKondisiMesin, newTransmisi, newSistemGasBuang, newEmisiAsap, newEmisiCo, newStatus) {
        this.dudukan_mesin = newDudukanMesin;
        this.kondisi_mesin = newKondisiMesin;
        this.transmisi = newTransmisi;
        this.sistem_gas_buang = newSistemGasBuang;
        this.emisi_asap= newEmisiAsap;
        this.emisi_co = newEmisiCo;
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
        return Mesin_transmisi.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Mesin_transmisi);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, dudukan_mesin, kondisi_mesin, transmisi, sistem_gas_buang, emisi_asap, emisi_co, status) {
        return new Mesin_transmisi({ no_pemeriksaan, no_kendaraan, dudukan_mesin, kondisi_mesin, transmisi, sistem_gas_buang, emisi_asap, emisi_co, status});
    }

    static getClass() {
        return 'org.prodence.mesin_transmisi';
    }

}

module.exports = Mesin_transmisi;
