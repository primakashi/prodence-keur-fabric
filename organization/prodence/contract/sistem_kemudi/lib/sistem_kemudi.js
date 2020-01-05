'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Sistem_kemudi extends State {
    constructor(obj) {
        super(Sistem_kemudi.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
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

    setSistem_kemudi(newRodaKemudi, newSpelingRodaKemudi, newBatangKemudi, newRodaGigiKemudi, newSambunganKemudi, newPenyambungSendiPeluru, newPowerSteering, newSlideSlip, newNotes, newStatus) {
        this.roda_kemudi = newRodaKemudi;
        this.speling_roda_kemudi = newSpelingRodaKemudi;
        this.batang_kemudi = newBatangKemudi;
        this.roda_gigi_kemudi = newRodaGigiKemudi;
        this.sambungan_kemudi = newSambunganKemudi;
        this.penyambung_sendi_peluru = newPenyambungSendiPeluru;
        this.power_steering = newPowerSteering;
        this.slide_slip = newSlideSlip;
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
        return Sistem_kemudi.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Sistem_kemudi);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, roda_kemudi, speling_roda_kemudi, batang_kemudi, roda_gigi_kemudi, sambungan_kemudi, penyambung_sendi_peluru, power_steering, slide_slip, notes, status) {
        return new Sistem_kemudi({ no_pemeriksaan, no_kendaraan, roda_kemudi, speling_roda_kemudi, batang_kemudi, roda_gigi_kemudi, sambungan_kemudi, penyambung_sendi_peluru, power_steering, slide_slip, notes, status });
    }

    static getClass() {
        return 'org.prodence.sistem_kemudi';
    }

}

module.exports = Sistem_kemudi;