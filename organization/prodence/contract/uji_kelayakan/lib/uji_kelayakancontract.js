'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Uji_kelayakan = require('./uji_kelayakan.js');
const Uji_kelayakanList = require('./uji_kelayakanlist.js');

class Uji_kelayakanContext extends Context {

    constructor() {
        super();
        this.uji_kelayakanList = new Uji_kelayakanList(this);
    }

}

class Uji_kelayakanContract extends Contract {

    constructor() {
        super('org.prodence.uji_kelayakan');
    }

    createContext() {
        return new Uji_kelayakanContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getuji_kelayakan(ctx, no_pemeriksaan, no_kendaraan) {
        let uji_kelayakanKey = Uji_kelayakan.makeKey([no_pemeriksaan, no_kendaraan]);
        let uji_kelayakan = await ctx.uji_kelayakanList.getUji_kelayakan(uji_kelayakanKey);
        return uji_kelayakan;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, side_slip, rem_utama, rem_parkir, gaya_rem_s11, gaya_rem_s12, gaya_rem_s21, gaya_rem_s22, gaya_rem_s31, gaya_rem_s32, gaya_rem_s41, gaya_rem_s42, speedometer, notes, status) {
        let uji_kelayakan = Uji_kelayakan.createInstance(no_pemeriksaan, no_kendaraan, side_slip,rem_utama, rem_parkir, gaya_rem_s11, gaya_rem_s12, gaya_rem_s21, gaya_rem_s22, gaya_rem_s31, gaya_rem_s32, gaya_rem_s41, gaya_rem_s42, speedometer, notes, status);
        uji_kelayakan.setCreated();
        await ctx.uji_kelayakanList.addUji_kelayakan(uji_kelayakan);
        return uji_kelayakan;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, side_slip,rem_utama, rem_parkir, gaya_rem_s11, gaya_rem_s12, gaya_rem_s21, gaya_rem_s22, gaya_rem_s31, gaya_rem_s32, gaya_rem_s41, gaya_rem_s42, speedometer, notes, status) {
        let uji_kelayakanKey = Uji_kelayakan.makeKey([no_pemeriksaan, no_kendaraan]);
        let uji_kelayakan = await ctx.uji_kelayakanList.getUji_kelayakan(uji_kelayakanKey);
        if (uji_kelayakan.getPemeriksaan() !== no_pemeriksaan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not exist');
        }
        if (uji_kelayakan.isCreated()) {
            uji_kelayakan.setUpdated();
        }
        if (uji_kelayakan.isUpdated()) {
            uji_kelayakan.setUji_kelayakan(side_slip, rem_utama, rem_parkir, gaya_rem_s11, gaya_rem_s12, gaya_rem_s21, gaya_rem_s22, gaya_rem_s31, gaya_rem_s32, gaya_rem_s41, gaya_rem_s42, speedometer, notes, status);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + uji_kelayakan.getCurrentState());
        }
        await ctx.uji_kelayakanList.updateUji_kelayakan(uji_kelayakan);
        return uji_kelayakan;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let uji_kelayakanKey = Uji_kelayakan.makeKey([no_pemeriksaan, no_kendaraan]);
        let uji_kelayakan = await ctx.uji_kelayakanList.getUji_kelayakan(uji_kelayakanKey);
        if (uji_kelayakan.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (uji_kelayakan.getPemeriksaan() === no_pemeriksaan) {
            uji_kelayakan.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own uji_kelayakan' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.uji_kelayakanList.updateUji_kelayakan(uji_kelayakan);
        return uji_kelayakan;
    }

}

module.exports = Uji_kelayakanContract;
