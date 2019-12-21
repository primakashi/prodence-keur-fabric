'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Penerangan = require('./penerangan.js');
const PeneranganList = require('./peneranganlist.js');

class PeneranganContext extends Context {

    constructor() {
        super();
        this.peneranganList = new PeneranganList(this);
    }

}

class PeneranganContract extends Contract {

    constructor() {
        super('org.prodence.penerangan');
    }

    createContext() {
        return new PeneranganContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getpenerangan(ctx, no_pemeriksaan, no_kendaraan) {
        let peneranganKey = Penerangan.makeKey([no_pemeriksaan, no_kendaraan]);
        let penerangan = await ctx.peneranganList.getPenerangan(peneranganKey);
        return penerangan;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, lampu_jauh, tambahan_lampu_jauh, lampu_dekat, arah_lampu, lampu_kabut, lampu_posisi, lampu_belakang, lampu_rem, lampu_plat_nomor, lampu_mundur, lampu_kabut_belakang, lampu_peringatan, reflektor_merah, lampu_tambahan_lain, status) {
        let penerangan = Penerangan.createInstance(no_pemeriksaan, no_kendaraan, lampu_jauh, tambahan_lampu_jauh, lampu_dekat, arah_lampu, lampu_kabut, lampu_posisi, lampu_belakang, lampu_rem, lampu_plat_nomor, lampu_mundur, lampu_kabut_belakang, lampu_peringatan, reflektor_merah, lampu_tambahan_lain, status);
        penerangan.setCreated();
        await ctx.peneranganList.addPenerangan(penerangan);
        return penerangan;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, newLampuJauh, newTambahanLampuJauh, newLampuDekat, newArahLampu, newLampuKabut, newLampuPosisi, newLampuBelakang, newLampuRem, newLampuPlat, newLampuMundur, newLampuKabutBelakang, newLampuPeringatan, newReflektorMerah, newLampuTambahanLain, newStatus) {
        let peneranganKey = Penerangan.makeKey([no_pemeriksaan, no_kendaraan]);
        let penerangan = await ctx.peneranganList.getPenerangan(peneranganKey);
        if (penerangan.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (penerangan.isCreated()) {
            penerangan.setUpdated();
        }
        if (penerangan.isUpdated()) {
            penerangan.setPenerangan(newLampuJauh, newTambahanLampuJauh, newLampuDekat, newArahLampu, newLampuKabut, newLampuPosisi, newLampuBelakang, newLampuRem, newLampuPlat, newLampuMundur, newLampuKabutBelakang, newLampuPeringatan, newReflektorMerah, newLampuTambahanLain, newStatus);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + penerangan.getCurrentState());
        }
        await ctx.peneranganList.updatePenerangan(penerangan);
        return penerangan;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let peneranganKey = Penerangan.makeKey([no_pemeriksaan, no_kendaraan]);
        let penerangan = await ctx.peneranganList.getPenerangan(peneranganKey);
        if (penerangan.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (penerangan.getNoKendaraan() === no_kendaraan) {
            penerangan.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own penerangan' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.peneranganList.updatePenerangan(penerangan);
        return penerangan;
    }

}

module.exports = PeneranganContract;
