'use strict';

const { Contract, Context } = require('fabric-contract-api');

const TireRim = require('./tirerim.js');
const TireRimList = require('./tirerimlist.js');

class TireRimContext extends Context {

    constructor() {
        super();
        this.tirerimList = new TireRimList(this);
    }

}

class TireRimContract extends Contract {

    constructor() {
        super('org.prodence.tirerim');
    }

    createContext() {
        return new TireRimContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async gettirerim(ctx, no_pemeriksaan, no_kendaraan) {
        let tirerimKey = TireRim.makeKey([no_pemeriksaan, no_kendaraan]);
        let tirerim = await ctx.tirerimList.getTireRim(tirerimKey);
        return tirerim;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, ukuran_dan_jenis_ban, keadaan_ban, kedalaman_kembang_ban, ukuran_dan_jenis_pelek, keadaan_pelek, penguatan_ban, notes, status) {
        let tirerim = TireRim.createInstance(no_pemeriksaan, no_kendaraan, ukuran_dan_jenis_ban, keadaan_ban, kedalaman_kembang_ban, ukuran_dan_jenis_pelek, keadaan_pelek, penguatan_ban, notes, status);
        tirerim.setCreated();
        await ctx.tirerimList.addTireRim(tirerim);
        return tirerim;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, ukuran_dan_jenis_ban, keadaan_ban, kedalaman_kembang_ban, ukuran_dan_jenis_pelek, keadaan_pelek, penguatan_ban, notes, status) {
        let tirerimKey = TireRim.makeKey([no_pemeriksaan, no_kendaraan]);
        let tirerim = await ctx.tirerimList.getTireRim(tirerimKey);
        if (tirerim.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (tirerim.isCreated()) {
            tirerim.setUpdated();
        }
        if (tirerim.isUpdated()) {
            tirerim.setTireRim(ukuran_dan_jenis_ban, keadaan_ban, kedalaman_kembang_ban, ukuran_dan_jenis_pelek, keadaan_pelek, penguatan_ban, notes, status);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + tirerim.getCurrentState());
        }
        await ctx.tirerimList.updateTireRim(tirerim);
        return tirerim;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let tirerimKey = TireRim.makeKey([no_pemeriksaan, no_kendaraan]);
        let tirerim = await ctx.tirerimList.getTireRim(tirerimKey);
        if (tirerim.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (tirerim.getNoKendaraan() === no_kendaraan) {
            tirerim.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own tire rim' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.tirerimList.updateTireRim(tirerim);
        return tirerim;
    }

}

module.exports = TireRimContract;
