'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Lain_lain = require('./lain_lain.js');
const Lain_lainList = require('./lain_lainlist.js');

class Lain_lainContext extends Context {

    constructor() {
        super();
        this.lain_lainList = new Lain_lainList(this);
    }

}

class Lain_lainContract extends Contract {

    constructor() {
        super('org.prodence.lain_lain');
    }

    createContext() {
        return new Lain_lainContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getlain_lain(ctx, no_pemeriksaan, no_kendaraan) {
        let lain_lainKey = Lain_lain.makeKey([no_pemeriksaan, no_kendaraan]);
        let lain_lain = await ctx.lain_lainList.getLain_lain(lain_lainKey);
        return lain_lain;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, sistem_bahan_bakar, sistem_kelistrikan, status) {
        let lain_lain = Lain_lain.createInstance(no_pemeriksaan, no_kendaraan, sistem_bahan_bakar, sistem_kelistrikan, status);
        lain_lain.setCreated();
        await ctx.lain_lainList.addLain_lain(lain_lain);
        return lain_lain;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan,newSistemBahanBakar, newSistemKelistrikan, newStatus) {
        let lain_lainKey = lain_lain.makeKey([no_pemeriksaan, no_kendaraan]);
        let lain_lain = await ctx.lain_lainList.getlain_lain(lain_lainKey);
        if (lain_lain.getPemeriksaan() !== no_pemeriksaan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not exist');
        }
        if (lain_lain.isCreated()) {
            lain_lain.setUpdated();
        }
        if (lain_lain.isUpdated()) {
            lain_lain.setPemeriksaanLain_lain(newSistemBahanBakar, newSistemKelistrikan, newStatus);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + lain_lain.getCurrentState());
        }
        await ctx.lain_lainList.updateLain_lain(lain_lain);
        return lain_lain;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let lain_lainKey = Lain_lain.makeKey([no_pemeriksaan, no_kendaraan]);
        let lain_lain = await ctx.lain_lainList.getLain_lain(lain_lainKey);
        if (lain_lain.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (lain_lain.getPemeriksaan() === no_pemeriksaan) {
            lain_lain.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own lain_lain' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.lain_lainList.updateLain_lain(lain_lain);
        return lain_lain;
    }

}

module.exports = Lain_lainContract;
