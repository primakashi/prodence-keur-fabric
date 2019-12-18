'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Permohonan extends State {
    constructor(obj) {
        super(Permohonan.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getObj() {
        return this.obj;
    }

    getPemeriksaan() {
        return this.no_pemeriksaan;
    }

    setPemeriksaan(newPemeriksaan) {
        this.no_pemeriksaan = newPemeriksaan;
    }

    getKTP() {
        return this.no_ktp;
    }

    setKTP(newKTP) {
        this.no_ktp = newKTP;
    }

    setBukuUji(newBukuUji) {
        this.buku_uji = newBukuUji;
    }

    setStatus(newStatus) {
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
        return Permohonan.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Permohonan);
    }

    static createInstance(no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, buku_uji, no_laporan, status, jarak_pemaikaian, tgl_pemeriksaan, no_pemeriksaan, lokasi_pengujian, no_kode) {
        return new Permohonan({no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka,  buku_uji, no_laporan, status, jarak_pemaikaian, tgl_pemeriksaan, no_pemeriksaan, lokasi_pengujian, no_kode});
    }

    static getClass() {
        return 'org.prodence.permohonan';
    }

}

module.exports = Permohonan;
