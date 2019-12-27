'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Sistem_rem extends State {
    constructor(obj) {
        super(Sistem_rem.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getKendaraa() {
        return this.obj;
    }

    getNoKendaraan() {
        return this.no_kendaraan;
    }

    setPemeriksaanSistem_rem(newPedalRem, newSpelingPedal, newKebocoranKelemahan, newSambunganTuasKabel, newPipaSelang, newSilinderKatup, newTerombolCakram, newPorode, newSistemVakumFungsi, newSistemVakumKebocoran, newSistemVakumPengisian, newSistemVakumPenggerakRem, newSistemVakumPengisisanKeretaGandengan, newSistemVakumTekananAngin, newRemParkirTuasTangan, newRemParkirSpelingTuas, newRemParkirKebocoran, newRemParkirSambunganTuasKabel, newSistemRemGasBuang, newEfisiensiRemUtama, newEfisiensiPerbedaanRemDepan, newEfisiensiPerbedaanRemBelakang, newEfisiensiRemParkir, newStatus) {
        this.pedal_rem = newPedalRem;
        this.speling_pedal = newSpelingPedal;
        this.keobocran_kelemahan = newKebocoranKelemahan;
        this.sambungan_tuas_kabel = newSambunganTuasKabel;
        this.pipa_selang = newPipaSelang;
        this.silinder_katup = newSilinderKatup;
        this.terombol_cakram = newTerombolCakram;
        this.porode = newPorode;
        this.sistem_vakum_fungsi = newSistemVakumFungsi;
        this.sistem_vakum_kebocoran = newSistemVakumKebocoran;
        this.sistem_vakum_pengisian = newSistemVakumPengisian;
        this.sistem_vakum_penggerak_rem = newSistemVakumPenggerakRem;
        this.sistem_vakum_pengisian_kereta_gandengan = newSistemVakumPengisisanKeretaGandengan;
        this.sistem_vakum_tekanan_angin = newSistemVakumTekananAngin;
        this.rem_parkir_tuas_tangan = newRemParkirTuasTangan;
        this.rem_parkir_speling_tuas = newRemParkirSpelingTuas;
        this.rem_parkir_kebocoran = newRemParkirKebocoran;
        this.rem_parkir_sambungan_tuas_kabel = newRemParkirSambunganTuasKabel;
        this.sistem_rem_emisi_gas_buang = newSistemRemGasBuang;
        this.efisiensi_rem_utama = newEfisiensiRemUtama;
        this.efisiensi_rem_perbedaan_depan = newEfisiensiPerbedaanRemDepan;
        this.efisiensi_rem_perbedaan_belakang = newEfisiensiPerbedaanRemBelakang;
        this.efisiensi_rem_parkir = newEfisiensiRemParkir;
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
        return Sistem_rem.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Sistem_rem);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, pedal_rem, speling_pedal, keobocran_kelemahan, sambungan_tuas_kabel, pipa_selang, silinder_katup, terombol_cakram, porode, sistem_vakum_fungsi, sistem_vakum_kebocoran, sistem_vakum_pengisian, sistem_vakum_penggerak_rem, sistem_vakum_pengisian_kereta_gandengan, sistem_vakum_tekanan_angin, rem_parkir_tuas_tangan, rem_parkir_speling_tuas, rem_parkir_kebocoran, rem_parkir_sambungan_tuas_kabel, sistem_rem_emisi_gas_buang, efisiensi_rem_utama, efisiensi_rem_perbedaan_depan, efisiensi_rem_perbedaan_belakang, efisiensi_rem_parkir, status) {
        return new Sistem_rem({ no_pemeriksaan, no_kendaraan,pedal_rem, speling_pedal, keobocran_kelemahan, sambungan_tuas_kabel, pipa_selang, silinder_katup, terombol_cakram, porode, sistem_vakum_fungsi, sistem_vakum_kebocoran, sistem_vakum_pengisian, sistem_vakum_penggerak_rem, sistem_vakum_pengisian_kereta_gandengan, sistem_vakum_tekanan_angin, rem_parkir_tuas_tangan, rem_parkir_speling_tuas, rem_parkir_kebocoran, rem_parkir_sambungan_tuas_kabel, sistem_rem_emisi_gas_buang, efisiensi_rem_utama, efisiensi_rem_perbedaan_depan, efisiensi_rem_perbedaan_belakang, efisiensi_rem_parkir, status});
    }

    static getClass() {
        return 'org.prodence.sistem_rem';
    }

}

module.exports = Sistem_rem;
