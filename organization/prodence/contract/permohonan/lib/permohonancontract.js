'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Permohonan = require('./permohonan.js');
const PermohonanList = require('./permohonanlist.js');

class PermohonanContext extends Context {

    constructor() {
        super();
        this.permohonanList = new PermohonanList(this);
    }

}

class PermohonanContract extends Contract {

    constructor() {
        super('org.prodence.permohonan');
    }

    createContext() {
        return new PermohonanContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getpermohonan(ctx, no_pemeriksaan, no_kendaraan) {
        let permohonanKey = Permohonan.makeKey([no_pemeriksaan, no_kendaraan]);
        let permohonan = await ctx.permohonanList.getPermohonan(permohonanKey);
        return permohonan;
    }

    async create(ctx, no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, buku_uji, no_laporan, status, jarak_pemaikaian, tgl_pemeriksaan, no_pemeriksaan, lokasi_pengujian, no_kode) {
        let permohonan = Permohonan.createInstance(no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, buku_uji, no_laporan, status, jarak_pemaikaian, tgl_pemeriksaan, no_pemeriksaan, lokasi_pengujian, no_kode);
        permohonan.setCreated();
        await ctx.permohonanList.addPermohonan(permohonan);
        return permohonan;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, status) {
        let permohonanKey = Permohonan.makeKey([no_pemeriksaan, no_kendaraan]);
        let permohonan = await ctx.permohonanList.getPermohonan(permohonanKey);
        if (permohonan.getPemeriksaan() !== no_pemeriksaan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not exist');
        }
        if (permohonan.isCreated()) {
            permohonan.setUpdated();
        }
        if (permohonan.isUpdated()) {
            permohonan.setStatus(status);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + permohonan.getCurrentState());
        }
        await ctx.permohonanList.updatePermohonan(permohonan);
        return permohonan;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let permohonanKey = Permohonan.makeKey([no_pemeriksaan, no_kendaraan]);
        let permohonan = await ctx.permohonanList.getPermohonan(permohonanKey);
        if (permohonan.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (permohonan.getPemeriksaan() === no_pemeriksaan) {
            permohonan.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own permohonan' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.permohonanList.updatePermohonan(permohonan);
        return permohonan;
    }

}

module.exports = PermohonanContract;
