'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Peralatan = require('./peralatan.js');
const PeralatanList = require('./peralatanlist.js');

class PeralatanContext extends Context {

    constructor() {
        super();
        this.peralatanList = new PeralatanList(this);
    }

}

class PeralatanContract extends Contract {

    constructor() {
        super('org.prodence.peralatan');
    }

    createContext() {
        return new PeralatanContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async getPeralatan(ctx, no_pemeriksaan, no_kendaraan) {
        let peralatanKey = Peralatan.makeKey([no_pemeriksaan, no_kendaraan]);
        let peralatan = await ctx.peralatanList.getPeralatan(peralatanKey);
        return peralatan;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, no_rangka, pelat_pabrik_pembuatnya, pelat_nomor, tulisan, penghapus_kaca_dapan, klakson, kaca_spion, pandangan_ke_depan, kaca_penawar_sinar, alat_pengendalian, lampu_indikasi, speedometer, perlangkapan, notes, status) {
        let peralatan = Peralatan.createInstance(no_pemeriksaan, no_kendaraan, no_rangka, pelat_pabrik_pembuatnya, pelat_nomor, tulisan, penghapus_kaca_dapan, klakson, kaca_spion, pandangan_ke_depan, kaca_penawar_sinar, alat_pengendalian, lampu_indikasi, speedometer, perlangkapan, notes, status);
        peralatan.setCreated();
        await ctx.peralatanList.addPeralatan(peralatan);
        return peralatan;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan, newNoRangka, newPelatPabrik, newPelatNomor, newTulisan, newPenghapusKacaDepan, newKlakson, newKacaSpion, newPandangan, newKacaPenawarSinar, newAlatPengendalian, newLampuIndikasi, newSpeedometer, newPerlengkapan, newNotes, newStatus) {
        let peralatanKey = Peralatan.makeKey([no_pemeriksaan, no_kendaraan]);
        let peralatan = await ctx.peralatanList.getPeralatan(peralatanKey);
        if (peralatan.getNoKendaraan() !== no_kendaraan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not owned by ' + no_kendaraan);
        }
        if (peralatan.isCreated()) {
            peralatan.setUpdated();
        }
        if (peralatan.isUpdated()) {
            peralatan.setPemeriksaanPeralatan(newNoRangka, newPelatPabrik, newPelatNomor, newTulisan, newPenghapusKacaDepan, newKlakson, newKacaSpion, newPandangan, newKacaPenawarSinar, newAlatPengendalian, newLampuIndikasi, newSpeedometer, newPerlengkapan, newNotes, newStatus);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + peralatan.getCurrentState());
        }
        await ctx.peralatanList.updatePeralatan(peralatan);
        return peralatan;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let peralatanKey = Peralatan.makeKey([no_pemeriksaan, no_kendaraan]);
        let peralatan = await ctx.peralatanList.getPeralatan(peralatanKey);
        if (peralatan.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (peralatan.getNoKendaraan() === no_kendaraan) {
            peralatan.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own peralatan' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.peralatanList.updatePeralatan(peralatan);
        return peralatan;
    }

}

module.exports = PeralatanContract;
