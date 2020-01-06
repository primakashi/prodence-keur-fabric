'use strict';

const { Contract, Context } = require('fabric-contract-api');

const BodyFrame = require('./bodyframe.js');
const BodyFrameList = require('./bodyframelist.js');

class BodyFrameContext extends Context {

    constructor() {
        super();
        this.bodyframeList = new BodyFrameList(this);
    }

}

class BodyFrameContract extends Contract {

    constructor() {
        super('org.prodence.bodyframe');
    }

    createContext() {
        return new BodyFrameContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async get(ctx, no_pemeriksaan, no_kendaraan) {
        let bodyframeKey = BodyFrame.makeKey([no_pemeriksaan, no_kendaraan]);
        let bodyframe = await ctx.bodyframeList.getBodyFrame(bodyframeKey);
        return bodyframe;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, rangka_penopang, bemper, tempat_roda_cadangan, keamanan_bodi, kondisi_bodi, ruang_pengemudi, tempat_duduk, sambungan_kereta_gandengan, notes, status) {
        let bodyframe = BodyFrame.createInstance(no_pemeriksaan, no_kendaraan, rangka_penopang, bemper, tempat_roda_cadangan, keamanan_bodi, kondisi_bodi, ruang_pengemudi, tempat_duduk, sambungan_kereta_gandengan, notes, status);
        bodyframe.setCreated();
        await ctx.bodyframeList.addBodyFrame(bodyframe);
        return bodyframe;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, rangka_penopang, bemper, tempat_roda_cadangan, keamanan_bodi, kondisi_bodi, ruang_pengemudi, tempat_duduk, sambungan_kereta_gandengan, notes, status) {
        let bodyframeKey = BodyFrame.makeKey([no_pemeriksaan, no_kendaraan]);
        let bodyframe = await ctx.bodyframeList.getBodyFrame(bodyframeKey);
        if (bodyframe.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (bodyframe.isCreated()) {
            bodyframe.setUpdated();
        }
        if (bodyframe.isUpdated()) {
            bodyframe.setBodyFrame(rangka_penopang, bemper, tempat_roda_cadangan, keamanan_bodi, kondisi_bodi, ruang_pengemudi, tempat_duduk, sambungan_kereta_gandengan, notes, status);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + bodyframe.getCurrentState());
        }
        await ctx.bodyframeList.updateBodyFrame(bodyframe);
        return bodyframe;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let bodyframeKey = BodyFrame.makeKey([no_pemeriksaan, no_kendaraan]);
        let bodyframe = await ctx.bodyframeList.getBodyFrame(bodyframeKey);
        if (bodyframe.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (bodyframe.getNoKendaraan() === no_kendaraan) {
            bodyframe.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own tire rim' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.bodyframeList.updateBodyFrame(bodyframe);
        return bodyframe;
    }

}

module.exports = BodyFrameContract;
