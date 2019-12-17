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

    async getkendaraan(ctx, no_stnk, no_kendaraan) {
        let kendaraanKey = Kendaraan.makeKey([no_stnk, no_kendaraan]);
        let kendaraan = await ctx.kendaraanList.getKendaraan(kendaraanKey);
        return kendaraan;
    }

    async create(ctx, srut, no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, nama_pemilik, merk_pabrik, tipe_kendaraan, mulai_dipergunakan, alamat_garasi, kategori_kendaraan, kategori_no_kendaraan) {
        let kendaraan = Kendaraan.createInstance(srut, no_stnk, no_kendaraan, no_ktp, no_mesin, no_rangka, nama_pemilik, merk_pabrik, tipe_kendaraan, mulai_dipergunakan, alamat_garasi, kategori_kendaraan, kategori_no_kendaraan);
        kendaraan.setCreated();
        await ctx.kendaraanList.addKendaraan(kendaraan);
        return kendaraan;
    }

    async update(ctx, no_stnk, no_kendaraan, no_ktp, newKTP, nama_pemilik, alamat_garasi) {
        let kendaraanKey = Kendaraan.makeKey([no_stnk, no_kendaraan]);
        let kendaraan = await ctx.kendaraanList.getKendaraan(kendaraanKey);
        if (kendaraan.getKTP() !== no_ktp) {
            throw new Error('Kendaraan ' + no_stnk + ' is not owned by ' + no_ktp);
        }
        if (kendaraan.isCreated()) {
            kendaraan.setUpdated();
        }
        if (kendaraan.isUpdated()) {
            kendaraan.setKTP(newKTP);
            kendaraan.setNamaPemilik(nama_pemilik);
            kendaraan.setAlamatGarasi(alamat_garasi);
        } else {
            throw new Error('Kendaraan ' + no_stnk +  ' is cant be updated. Current state = ' + kendaraan.getCurrentState());
        }
        await ctx.kendaraanList.updateKendaraan(kendaraan);
        return kendaraan;
    }

    async delete(ctx, no_stnk, no_kendaraan, no_ktp) {
        let kendaraanKey = Kendaraan.makeKey([no_stnk, no_kendaraan]);
        let kendaraan = await ctx.kendaraanList.getKendaraan(kendaraanKey);
        if (kendaraan.isDeleted()) {
            throw new Error('Paper ' + no_stnk + no_kendaraan + ' already redeemed');
        }
        if (kendaraan.getKTP() === no_ktp) {
            kendaraan.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own paper' + no_stnk + no_kendaraan);
        }
        await ctx.kendaraanList.updateKendaraan(kendaraan);
        return kendaraan;
    }

}

module.exports = KendaraanContract;
