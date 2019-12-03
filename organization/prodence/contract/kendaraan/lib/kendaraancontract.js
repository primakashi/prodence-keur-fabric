'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Kendaraan = require('./kendaraan.js');
const KendaraanList = require('./kendaraanlist.js');

class KendaraanContext extends Context {

    constructor() {
        super();
        this.kendaraanList = new KendaraanList(this);
    }

}

class KendaraanContract extends Contract {

    constructor() {
        super('org.prodence.kendaraan');
    }

    createContext() {
        return new KendaraanContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async create(ctx, srut, no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, nama_pemilik, merk_pabrik, tipe_kendaraan, mulai_diperginakan, alamat_garasi, kategori_kendaraan, kategori_no_kendaraan) {

        let kendaraan = Kendaraan.createInstance(srut, no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, nama_pemilik, merk_pabrik, tipe_kendaraan, mulai_diperginakan, alamat_garasi, kategori_kendaraan, kategori_no_kendaraan);

        kendaraan.setCreated();

        // Newly issued paper is owned by the issuer
        // kendaraan.setOwner(issuer);

        // Add the paper to the list of all similar commercial papers in the ledger world state
        await ctx.kendaraanList.addKendaraan(kendaraan);

        // Must return a serialized paper to caller of smart contract
        return kendaraan;
    }

    async buy(ctx, no_stnk, no_kendaraan) {

        // Retrieve the current paper using key fields provided
        let kendaraanKey = Kendaraan.makeKey([no_stnk, no_kendaraan]);
        let kendaraan = await ctx.kendaraanList.getKendaraan(kendaraanKey);

        // Validate current owner
        // if (kendaraan.getOwner() !== currentOwner) {
        //     throw new Error('Paper ' + issuer + paperNumber + ' is not owned by ' + currentOwner);
        // }

        // First buy moves state from ISSUED to TRADING
        if (kendaraan.isCreated()) {
            kendaraan.setUpdated();
        }

        // Check paper is not already REDEEMED
        // if (kendaraan.isUpdated()) {
        //     kendaraan.setOwner(newOwner);
        // } else {
        //     throw new Error('Paper ' + issuer + paperNumber + ' is not trading. Current state = ' +paper.getCurrentState());
        // }

        // Update the paper
        await ctx.kendaraanList.updateKendaraan(kendaraan);
        return kendaraan;
    }

    async delete(ctx, no_stnk, no_kendaraan, redeemingOwner, redeemDateTime) {

        let kendaraanKey = Kendaraan.makeKey([no_stnk, no_kendaraan]);

        let kendaraan = await ctx.kendaraanList.getKendaraan(kendaraanKey);

        // Check paper is not REDEEMED
        if (kendaraan.isRedeemed()) {
            throw new Error('Paper ' + no_stnk + no_kendaraan + ' already redeemed');
        }

        // Verify that the redeemer owns the commercial paper before redeeming it
        // if (paper.getOwner() === redeemingOwner) {
        //     paper.setOwner(paper.getIssuer());
        //     paper.setRedeemed();
        // } else {
        //     throw new Error('Redeeming owner does not own paper' + issuer + paperNumber);
        // }

        await ctx.kendaraanList.updateKendaraan(kendaraan);
        return kendaraan;
    }

}

module.exports = KendaraanContract;
