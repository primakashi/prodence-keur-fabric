'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Sistem_rem = require('./sistem_rem.js');
const Sistem_remList = require('./sistem_remlist.js');

class Sistem_remContext extends Context {

    constructor() {
        super();
        this.sistem_remList = new Sistem_remList(this);
    }

}

class Sistem_remContract extends Contract {

    constructor() {
        super('org.prodence.sistem_rem');
    }

    createContext() {
        return new Sistem_remContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getSistem_rem(ctx, no_pemeriksaan, no_kendaraan) {
        let sistem_remKey = Sistem_rem.makeKey([no_pemeriksaan, no_kendaraan]);
        let sistem_rem = await ctx.sistem_remList.getSistem_rem(sistem_remKey);
        return sistem_rem;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, pedal_rem, speling_pedal, kebocoran_kelemahan, sambungan_tuas_kabel, pipa_selang, silinder_katup, terombol_cakram, porode, sistem_vakum_fungsi, sistem_vakum_kebocoran, sistem_vakum_pengisian, sistem_vakum_penggerak_rem, sistem_vakum_pengisian_kereta_gandengan, sistem_vakum_tekanan_angin, rem_parkir_tuas_tangan, rem_parkir_speling_tuas, rem_parkir_kebocoran, rem_parkir_sambungan_tuas_kabel, sistem_rem_emisi_gas_buang, efisiensi_rem_utama, efisiensi_rem_perbedaan_depan, efisiensi_rem_perbedaan_belakang, efisiensi_rem_parkir, notes, status) {
        let sistem_rem = Sistem_rem.createInstance(no_pemeriksaan, no_kendaraan, pedal_rem, speling_pedal, kebocoran_kelemahan, sambungan_tuas_kabel, pipa_selang, silinder_katup, terombol_cakram, porode, sistem_vakum_fungsi, sistem_vakum_kebocoran, sistem_vakum_pengisian, sistem_vakum_penggerak_rem, sistem_vakum_pengisian_kereta_gandengan, sistem_vakum_tekanan_angin, rem_parkir_tuas_tangan, rem_parkir_speling_tuas, rem_parkir_kebocoran, rem_parkir_sambungan_tuas_kabel, sistem_rem_emisi_gas_buang, efisiensi_rem_utama, efisiensi_rem_perbedaan_depan, efisiensi_rem_perbedaan_belakang, efisiensi_rem_parkir, notes, status);
        sistem_rem.setCreated();
        await ctx.sistem_remList.addSistem_rem(sistem_rem);
        return sistem_rem;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, newPedalRem, newSpelingPedal, newKebocoranKelemahan, newSambunganTuasKabel, newPipaSelang, newSilinderKatup, newTerombolCakram, newPorode, newSistemVakumFungsi, newSistemVakumKebocoran, newSistemVakumPengisian, newSistemVakumPenggerakRem, newSistemVakumPengisisanKeretaGandengan, newSistemVakumTekananAngin, newRemParkirTuasTangan, newRemParkirSpelingTuas, newRemParkirKebocoran, newRemParkirSambunganTuasKabel, newSistemRemGasBuang, newEfisiensiRemUtama, newEfisiensiPerbedaanRemDepan, newEfisiensiPerbedaanRemBelakang, newEfisiensiRemParkir, newNotes, newStatus) {
        let sistem_remKey = Sistem_rem.makeKey([no_pemeriksaan, no_kendaraan]);
        let sistem_rem = await ctx.sistem_remList.getSistem_rem(sistem_remKey);
        if (sistem_rem.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (sistem_rem.isCreated()) {
            sistem_rem.setUpdated();
        }
        if (sistem_rem.isUpdated()) {
            sistem_rem.setPemeriksaanSistem_rem(newPedalRem, newSpelingPedal, newKebocoranKelemahan, newSambunganTuasKabel, newPipaSelang, newSilinderKatup, newTerombolCakram, newPorode, newSistemVakumFungsi, newSistemVakumKebocoran, newSistemVakumPengisian, newSistemVakumPenggerakRem, newSistemVakumPengisisanKeretaGandengan, newSistemVakumTekananAngin, newRemParkirTuasTangan, newRemParkirSpelingTuas, newRemParkirKebocoran, newRemParkirSambunganTuasKabel, newSistemRemGasBuang, newEfisiensiRemUtama, newEfisiensiPerbedaanRemDepan, newEfisiensiPerbedaanRemBelakang, newEfisiensiRemParkir, newNotes, newStatus);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + sistem_rem.getCurrentState());
        }
        await ctx.sistem_remList.updateSistem_rem(sistem_rem);
        return sistem_rem;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let sistem_remKey = Sistem_rem.makeKey([no_pemeriksaan, no_kendaraan]);
        let sistem_rem = await ctx.sistem_remList.getSistem_rem(sistem_remKey);
        if (sistem_rem.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (sistem_rem.getNoKendaraan() === no_kendaraan) {
            sistem_rem.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own sistem_rem' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.sistem_remList.updateSistem_rem(sistem_rem);
        return sistem_rem;
    }

}

module.exports = Sistem_remContract;
