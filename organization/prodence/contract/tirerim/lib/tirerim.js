'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class TireRim extends State {
    constructor(obj) {
        super(TireRim.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
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

    setTireRim(newUkuranJenisBan, newKeadaanBan, newKedalamanKembangBan, newUkuranJenisPelek, newPelek, newPenguatanBan, newNotes, newStatus) {
        this.ukuran_dan_jenis_ban = newUkuranJenisBan;
        this.keadaan_ban = newKeadaanBan;
        this.kedalaman_kembang_ban = newKedalamanKembangBan;
        this.ukuran_dan_jenis_pelek = newUkuranJenisPelek;
        this.keadaan_pelek = newPelek;
        this.penguatan_ban = newPenguatanBan;
        this.notes = newNotes;
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
        return TireRim.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, TireRim);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, ukuran_dan_jenis_ban, keadaan_ban, kedalaman_kembang_ban, ukuran_dan_jenis_pelek, keadaan_pelek, penguatan_ban, status) {
        return new TireRim({ no_pemeriksaan, no_kendaraan, ukuran_dan_jenis_ban, keadaan_ban, kedalaman_kembang_ban, ukuran_dan_jenis_pelek, keadaan_pelek, penguatan_ban, status });
    }

    static getClass() {
        return 'org.prodence.tirerim';
    }

}

module.exports = TireRim;
