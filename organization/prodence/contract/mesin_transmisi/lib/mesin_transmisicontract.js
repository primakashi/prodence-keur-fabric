'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Mesin_transmisi = require('./mesin_transmisi.js');
const Mesin_transmisiList = require('./mesin_transmisilist.js');

class Mesin_transmisiContext extends Context {

    constructor() {
        super();
        this.mesin_transmisiList = new Mesin_transmisiList(this);
    }

}

class Mesin_transmisiContract extends Contract {

    constructor() {
        super('org.prodence.mesin_transmisi');
    }

    createContext() {
        return new Mesin_transmisiContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getMesin_transmisi(ctx, no_pemeriksaan, no_kendaraan) {
        let mesin_transmisiKey = Mesin_transmisi.makeKey([no_pemeriksaan, no_kendaraan]);
        let mesin_transmisi = await ctx.mesin_transmisiList.getMesin_transmisi(mesin_transmisiKey);
        return mesin_transmisi;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, dudukan_mesin, kondisi_mesin, transmisi, sistem_buang_gas, emisi_asap, emisi_co, status) {
        let mesin_transmisi = Mesin_transmisi.createInstance(no_pemeriksaan, no_kendaraan, dudukan_mesin, kondisi_mesin, transmisi, sistem_buang_gas, emisi_asap, emisi_co, status);
        mesin_transmisi.setCreated();
        await ctx.mesin_transmisiList.addMesin_transmisi(mesin_transmisi);
        return mesin_transmisi;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, newDudukanMesin, newKondisiMesin, newTransmisi, newSistemGasBuang, newEmisiAsap, newEmisiCo, newStatus) {
        let mesin_transmisiKey = Mesin_transmisi.makeKey([no_pemeriksaan, no_kendaraan]);
        let mesin_transmisi = await ctx.mesin_transmisiList.getMesin_transmisi(mesin_transmisiKey);
        if (mesin_transmisi.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (mesin_transmisi.isCreated()) {
            mesin_transmisi.setUpdated();
        }
        if (mesin_transmisi.isUpdated()) {
            mesin_transmisi.setPemeriksaanMesin_transmisi(newDudukanMesin, newKondisiMesin, newTransmisi, newSistemGasBuang, newEmisiAsap, newEmisiCo, newStatus);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + mesin_transmisi.getCurrentState());
        }
        await ctx.mesin_transmisiList.updateMesin_transmisi(mesin_transmisi);
        return mesin_transmisi;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let mesin_transmisiKey = Mesin_transmisi.makeKey([no_pemeriksaan, no_kendaraan]);
        let mesin_transmisi = await ctx.mesin_transmisiList.getMesin_transmisi(mesin_transmisiKey);
        if (mesin_transmisi.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (mesin_transmisi.getNoKendaraan() === no_kendaraan) {
            mesin_transmisi.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own mesin_transmisi' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.mesin_transmisiList.updateMesin_transmisi(mesin_transmisi);
        return mesin_transmisi;
    }

}

module.exports = Mesin_transmisiContract;
