'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Sistem_kemudi = require('./sistem_kemudi');
const Sistem_kemudiList = require('./sistem_kemudilist');

class Sistem_kemudiContext extends Context {

    constructor() {
        super();
        this.sistem_kemudiList = new Sistem_kemudiList(this);
    }

}

class Sistem_kemudiContract extends Contract {

    constructor() {
        super('org.prodence.sistem_kemudi');
    }

    createContext() {
        return new Sistem_kemudiContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async get(ctx, no_pemeriksaan, no_kendaraan) {
        let sistem_kemudiKey = Sistem_kemudi.makeKey([no_pemeriksaan, no_kendaraan]);
        let sistem_kemudi = await ctx.sistem_kemudiList.getSistem_kemudi(sistem_kemudiKey);
        return sistem_kemudi;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan,  roda_kemudi, speling_roda_kemudi, batang_kemudi, roda_gigi_kemudi, sambungan_kemudi, penyambung_sendi_peluru, power_steering, slide_slip, notes, status) {
        let sistem_kemudi = Sistem_kemudi.createInstance(no_pemeriksaan, no_kendaraan,  roda_kemudi, speling_roda_kemudi, batang_kemudi, roda_gigi_kemudi, sambungan_kemudi, penyambung_sendi_peluru, power_steering, slide_slip, notes, status);
        sistem_kemudi.setCreated();
        await ctx.sistem_kemudiList.addSistem_kemudi(sistem_kemudi);
        return sistem_kemudi;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, roda_kemudi, speling_roda_kemudi, batang_kemudi, roda_gigi_kemudi, sambungan_kemudi, penyambung_sendi_peluru, power_steering, slide_slip, notes, status) {
        let sistem_kemudiKey = Sistem_kemudi.makeKey([no_pemeriksaan, no_kendaraan]);
        let sistem_kemudi = await ctx.sistem_kemudiList.getSistem_kemudi(sistem_kemudiKey);
        if (sistem_kemudi.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (sistem_kemudi.isCreated()) {
            sistem_kemudi.setUpdated();
        }
        if (sistem_kemudi.isUpdated()) {
            sistem_kemudi.setSistem_kemudi( roda_kemudi, speling_roda_kemudi, batang_kemudi, roda_gigi_kemudi, sambungan_kemudi, penyambung_sendi_peluru, power_steering, slide_slip, notes, status);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + sistem_kemudi.getCurrentState());
        }
        await ctx.sistem_kemudiList.updateSistem_kemudi(sistem_kemudi);
        return sistem_kemudi;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let sistem_kemudiKey = Sistem_kemudi.makeKey([no_pemeriksaan, no_kendaraan]);
        let sistem_kemudi = await ctx.sistem_kemudiList.getSistem_kemudi(sistem_kemudiKey);
        if (sistem_kemudi.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (sistem_kemudi.getNoKendaraan() === no_kendaraan) {
            sistem_kemudi.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own tire rim' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.sistem_kemudiList.updateSistem_kemudi(sistem_kemudi);
        return sistem_kemudi;
    }

}

module.exports = Sistem_kemudiContract;
