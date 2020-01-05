'use strict';

const State = require('../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class BodyFrame extends State {
    constructor(obj) {
        super(BodyFrame.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
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

    setBodyFrame(newRangkaPenopang, newBemper, newTempatRoda, newKeamananBodi, newKondisiBody, newRuangPengemudi, newTempatDuduk, newSambunganKereta, newNotes, newStatus) {
        this.rangka_penopang = newRangkaPenopang;
        this.bemper = newBemper;
        this.tempat_roda_cadangan = newTempatRoda;
        this.keamanan_bodi = newKeamananBodi;
        this.kondisi_bodi = newKondisiBody;
        this.ruang_pengemudi = newRuangPengemudi;
        this.tempat_duduk = newTempatDuduk;
        this.sambungan_kereta_gandengan = newSambunganKereta;
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
        return BodyFrame.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, BodyFrame);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, rangka_penopang, bemper, tempat_roda_cadangan, keamanan_bodi, kondisi_bodi, ruang_pengemudi, tempat_duduk, sambungan_kereta_gandengan, notes, status) {
        return new BodyFrame({ no_pemeriksaan, no_kendaraan, rangka_penopang, bemper, tempat_roda_cadangan, keamanan_bodi, kondisi_bodi, ruang_pengemudi, tempat_duduk, sambungan_kereta_gandengan, notes, status });
    }

    static getClass() {
        return 'org.prodence.bodyframe';
    }

}

module.exports = BodyFrame;
