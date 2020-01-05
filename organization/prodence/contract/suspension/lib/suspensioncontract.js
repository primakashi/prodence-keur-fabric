'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Suspension = require('./suspension');
const SuspensionList = require('./suspensionlist');

class SuspensionContext extends Context {

    constructor() {
        super();
        this.suspensionList = new SuspensionList(this);
    }

}

class SuspensionContract extends Contract {

    constructor() {
        super('org.prodence.suspension');
    }

    createContext() {
        return new SuspensionContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async get(ctx, no_pemeriksaan, no_kendaraan) {
        let suspensionKey = Suspension.makeKey([no_pemeriksaan, no_kendaraan]);
        let suspension = await ctx.suspensionList.getSuspension(suspensionKey);
        return suspension;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, suspensi_roda_depan, suspensi_roda_belakang, sumbu, pemasangan_sumbu, pegas, bantalan_roda, notes, status) {
        let suspension = Suspension.createInstance(no_pemeriksaan, no_kendaraan, suspensi_roda_depan, suspensi_roda_belakang, sumbu, pemasangan_sumbu, pegas, bantalan_roda, notes, status);
        suspension.setCreated();
        await ctx.suspensionList.addSuspension(suspension);
        return suspension;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, suspensi_roda_depan, suspensi_roda_belakang, sumbu, pemasangan_sumbu, pegas, bantalan_roda, notes, status) {
        let suspensionKey = Suspension.makeKey([no_pemeriksaan, no_kendaraan]);
        let suspension = await ctx.suspensionList.getSuspension(suspensionKey);
        if (suspension.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (suspension.isCreated()) {
            suspension.setUpdated();
        }
        if (suspension.isUpdated()) {
            suspension.setSuspension(suspensi_roda_depan, suspensi_roda_belakang, sumbu, pemasangan_sumbu, pegas, bantalan_roda, notes, status);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + suspension.getCurrentState());
        }
        await ctx.suspensionList.updateSuspension(suspension);
        return suspension;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let suspensionKey = Suspension.makeKey([no_pemeriksaan, no_kendaraan]);
        let suspension = await ctx.suspensionList.getSuspension(suspensionKey);
        if (suspension.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (suspension.getNoKendaraan() === no_kendaraan) {
            suspension.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own tire rim' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.suspensionList.updateSuspension(suspension);
        return suspension;
    }

}

module.exports = SuspensionContract;
