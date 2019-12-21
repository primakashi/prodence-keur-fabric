'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Penerangan extends State {
    constructor(obj) {
        super(Penerangan.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
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

    setPenerangan(newLampuJauh, newTambahanLampuJauh, newLampuDekat, newArahLampu, newLampuKabut, newLampuPosisi, newLampuBelakang, newLampuRem, newLampuPlat, newLampuMundur, newLampuKabutBelakang, newLampuPeringatan, newReflektorMerah, newLampuTambahanLain, newStatus) {
        this.lampu_jauh = newLampuJauh;
        this.tambahan_lampu_jauh = newTambahanLampuJauh;
        this.lampu_dekat = newLampuDekat;
        this.arah_lampu = newArahLampu;
        this.lampu_kabut = newLampuKabut;
        this.lampu_posisi = newLampuPosisi;
        this.lampu_belakang = newLampuBelakang;
        this.lampu_rem = newLampuRem;
        this.lampu_plat_nomor = newLampuPlat;
        this.lampu_mundur = newLampuMundur;
        this.lampu_kabut_belakang = newLampuKabutBelakang;
        this.lampu_peringatan = newLampuPeringatan;
        this.reflektor_merah = newReflektorMerah;
        this.lampu_tambahan_lain = newLampuTambahanLain;
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
        return Penerangan.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Penerangan);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, lampu_jauh, tambahan_lampu_jauh, lampu_dekat, arah_lampu, lampu_kabut, lampu_posisi, lampu_belakang, lampu_rem, lampu_plat_nomor, lampu_mundur, lampu_kabut_belakang, lampu_peringatan, reflektor_merah, lampu_tambahan_lain, status) {
        return new Penerangan({ no_pemeriksaan, no_kendaraan, lampu_jauh, tambahan_lampu_jauh, lampu_dekat, arah_lampu, lampu_kabut, lampu_posisi, lampu_belakang, lampu_rem, lampu_plat_nomor, lampu_mundur, lampu_kabut_belakang, lampu_peringatan, reflektor_merah, lampu_tambahan_lain, status });
    }

    static getClass() {
        return 'org.prodence.penerangan';
    }

}

module.exports = Penerangan;
