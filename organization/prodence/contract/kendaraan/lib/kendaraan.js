'use strict';

const State = require('./../ledger-api/state.js');

const kState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Kendaraan extends State {
    constructor(obj) {
        super(Kendaraan.getClass(), [obj.no_stnk, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getKendaraa() {
        return this.obj;
    }

    getSTNK() {
        return this.no_stnk;
    }

    setSTNK(newSTNK) {
        this.no_stnk = newSTNK;
    }

    getKTP() {
        return this.no_ktp;
    }

    setKTP(newKTP) {
        this.no_ktp = newKTP;
    }

    setNamaPemilik(newPemilik) {
        this.nama_pemilik = newPemilik;
    }

    setAlamatGarasi(newGarasi) {
        this.alamat_garasi = newGarasi;
    }

    setCreated() {
        this.currentState = kState.CREATED;
    }

    setUpdated() {
        this.currentState = kState.UPDATED;
    }

    setDeleted() {
        this.currentState = kState.DELETED;
    }

    isCreated() {
        return this.currentState === kState.CREATED;
    }

    isUpdated() {
        return this.currentState === kState.UPDATED;
    }

    isDeleted() {
        return this.currentState === kState.DELETED;
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

    static createInstance(srut, no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, nama_pemilik, merk_pabrik, tipe_kendaraan, mulai_diperginakan, alamat_garasi, kategori_kendaraan, kategori_no_kendaraan) {
        return new Kendaraan({ srut, no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, nama_pemilik, merk_pabrik, tipe_kendaraan, mulai_diperginakan, alamat_garasi, kategori_kendaraan, kategori_no_kendaraan });
    }

    static getClass() {
        return 'org.prodence.kendaraan';
    }

}

module.exports = Kendaraan;
