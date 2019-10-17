'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Kendaraan = require('./kendaraan.js');
const KendaraanList = require('./kendaraanlist');

class KendaraanContext extends Context {

    constructor() {
        super();
        this.kendaraanList = new KendaraanList(this);
    }

}

class KendaraanContract extends Contract {
    constructor() {
        super('org.keurnet.kendaraan');
    }

    createContext() {
        return new KendaraanContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async create(ctx, stuk, no_ktp, no_bkpb, no_stnk, no_mesin, no_rangka, no_ijin_trayek, no_uji_tipe, no_kir) {

        let kendaraan = Kendaraan.createInstance(stuk, no_ktp, no_bkpb, no_stnk, no_mesin, no_rangka, no_ijin_trayek, no_uji_tipe, no_kir);

        // Smart contract, rather than paper, moves paper into ISSUED state
        kendaraan.setCreatedData();

        // Add the paper to the list of all similar commercial papers in the ledger world state
        await ctx.kendaraanList.addKendaraan(kendaraan);

        // Must return a serialized paper to caller of smart contract
        return kendaraan;
    }

    async update(ctx, no_bkpb, stuk, no_ktp, newKTP) {

        // Retrieve the current paper using key fields provided
        let kendaraanKey = Kendaraan.makeKey([no_bkpb, stuk]);
        let kendaraan = await ctx.kendaraanList.getKendaraan(kendaraanKey);

        // Validate current owner
        if (kendaraan.getKTP() !== no_ktp) {
            throw new Error('Kendaraan ' + no_bkpb + stuk + ' is not owned by ' + no_ktp);
        }

        // First buy moves state from ISSUED to TRADING
        if (kendaraan.isCreatedData()) {
            kendaraan.setUpdatedData();
        }

        // Check paper is not already REDEEMED
        if (kendaraan.isUpdatedData()) {
            kendaraan.setKTP(newKTP);
        } else {
            throw new Error('Kendaraan ' + no_bkpb + stuk + ' is not updated. Current state = ' +kendaraan.getCurrentState());
        }

        // Update the paper
        await ctx.kendaraanList.updateKendaraan(kendaraan);
        return kendaraan;
    }

    async delete(ctx, no_bkpb, stuk, redeemingKTP) {

        let kendaraanKey = Kendaraan.makeKey([no_bkpb, stuk]);

        let kendaraan = await ctx.kendaraanList.getKendaraan(kendaraanKey);

        // Check paper is not REDEEMED
        if (kendaraan.isDeletedData()) {
            throw new Error('Kendaraan ' + no_bkpb + stuk + ' already deleted');
        }

        // Verify that the redeemer owns the commercial paper before redeeming it
        if (kendaraan.getKTP() === redeemingKTP) {
            kendaraan.setKTP(kendaraan.getBPKB());
            kendaraan.setDeletedData();
        } else {
            throw new Error('Redeeming owner does not own paper' + no_bkpb + stuk);
        }

        await ctx.kendaraanList.updateKendaraan(kendaraan);
        return kendaraan;
    }

}


module.exports = KendaraanContract;