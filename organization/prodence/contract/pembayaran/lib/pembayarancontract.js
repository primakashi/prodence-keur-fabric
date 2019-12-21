'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Pembayaran = require('./pembayaran.js');
const PembayaranList = require('./pembayaranlist.js');

class PembayaranContext extends Context {

    constructor() {
        super();
        this.pembayaranList = new PembayaranList(this);
    }

}

class PembayaranContract extends Contract {

    constructor() {
        super('org.prodence.pembayaran');
    }

    createContext() {
        return new PembayaranContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getpembayaran(ctx, no_pemeriksaan, no_kendaraan) {
        let pembayaranKey = Pembayaran.makeKey([no_pemeriksaan, no_kendaraan]);
        let pembayaran = await ctx.pembayaranList.getPembayaran(pembayaranKey);
        return pembayaran;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, no_stnk, kuitansi, sku, status, nip) {
        let pembayaran = Pembayaran.createInstance(no_pemeriksaan, no_kendaraan, no_stnk, kuitansi, sku, status, nip);
        pembayaran.setCreated();
        await ctx.pembayaranList.addPembayaran(pembayaran);
        return pembayaran;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, kuitansi, sku, status, nip) {
        let pembayaranKey = Pembayaran.makeKey([no_pemeriksaan, no_kendaraan]);
        let pembayaran = await ctx.pembayaranList.getPembayaran(pembayaranKey);
        if (pembayaran.getPemeriksaan() !== no_pemeriksaan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not exist');
        }
        if (pembayaran.isCreated()) {
            pembayaran.setUpdated();
        }
        if (pembayaran.isUpdated()) {
            pembayaran.setPembayaran(kuitansi,sku,status,nip);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + pembayaran.getCurrentState());
        }
        await ctx.pembayaranList.updatePembayaran(pembayaran);
        return pembayaran;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let pembayaranKey = Pembayaran.makeKey([no_pemeriksaan, no_kendaraan]);
        let pembayaran = await ctx.pembayaranList.getPembayaran(pembayaranKey);
        if (pembayaran.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (pembayaran.getPemeriksaan() === no_pemeriksaan) {
            pembayaran.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own pembayaran' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.pembayaranList.updatePembayaran(pembayaran);
        return pembayaran;
    }

}

module.exports = PembayaranContract;
