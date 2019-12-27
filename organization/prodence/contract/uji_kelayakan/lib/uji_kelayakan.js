'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Uji_kelayakan extends State {
    constructor(obj) {
        super(Uji_kelayakan.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
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
    setUji_kelayakan(newSideSlip, newRemUtama, newRemParkir, newGayaRemS11, newGayaRemS12, newGayaRemS21, newGayaRemS22, newGayaRemS31, newGayaRemS32, newGayaRemS41, newGayaRemS42, newSpeedometer, newNotes, newStatus) {
        this.side_slip = newSideSlip;
        this.rem_utama = newRemUtama;
        this.rem_parkir = newRemParkir;
        this.gaya_rem_s11 = newGayaRemS11;
        this.gaya_rem_s12 = newGayaRemS12;
        this.gaya_rem_s21 = newGayaRemS21;
        this.gaya_rem_s22 = newGayaRemS22;
        this.gaya_rem_s31 = newGayaRemS31;
        this.gaya_rem_s32 = newGayaRemS32;
        this.gaya_rem_s41 = newGayaRemS41;
        this.gaya_rem_s42 = newGayaRemS42;
        this.speedometer = newSpeedometer;
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
        return Uji_kelayakan.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Uji_kelayakan);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, side_slip,rem_utama, rem_parkir, gaya_rem_s11, gaya_rem_s12, gaya_rem_s21, gaya_rem_s22, gaya_rem_s31, gaya_rem_s32, gaya_rem_s41, gaya_rem_s42, speedometer, notes, status) {
        return new Uji_kelayakan({no_pemeriksaan, no_kendaraan, side_slip,rem_utama, rem_parkir, gaya_rem_s11, gaya_rem_s12, gaya_rem_s21, gaya_rem_s22, gaya_rem_s31, gaya_rem_s32, gaya_rem_s41, gaya_rem_s42, speedometer, notes, status});
    }

    static getClass() {
        return 'org.prodence.uji_kelayakan';
    }

}

module.exports = Uji_kelayakan;
