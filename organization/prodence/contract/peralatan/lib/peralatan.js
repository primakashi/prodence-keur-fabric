'use strict';

const State = require('./../ledger-api/state.js');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Peralatan extends State {
    constructor(obj) {
        super(Peralatan.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getKendaraa() {
        return this.obj;
    }

    getNoKendaraan() {
        return this.no_kendaraan;
    }

    setPemeriksaanPeralatan(newNoRangka, newPelatPabrik, newPelatNomor, newTulisan, newPenghapusKacaDepan, newKlakson, newKacaSpion, newPandangan, newKacaPenawarSinar, newAlatPengendalian, newLampuIndikasi, newSpeedometer, newPerlengkapan, newNotes, newStatus) {
        this.no_rangka = newNoRangka;
        this.pelat_pabrik_pembuatnya = newPelatPabrik;
        this.pelat_nomor = newPelatNomor;
        this.tulisan = newTulisan;
        this.penghapus_kaca_dapan = newPenghapusKacaDepan;
        this.klakson = newKlakson;
        this.kaca_spion = newKacaSpion;
        this.pandangan_ke_depan = newPandangan;
        this.kaca_penawar_sinar = newKacaPenawarSinar;
        this.alat_pengendalian = newAlatPengendalian;
        this.lampu_indikasi = newLampuIndikasi;
        this.speedometer = newSpeedometer;
        this.perlangkapan = newPerlengkapan;
        this.notes = newNotes;
        this.status = newStatus;

    }

    setCreated() {
        this.currentState = pState.CREATED;
    }

    setUpdated() {
        this.currentState = pState.UPDATED;
    }

    setDeleted() {
        this.currentState = pState.DELETED;
    }

    isCreated() {
        return this.currentState === pState.CREATED;
    }

    isUpdated() {
        return this.currentState === pState.UPDATED;
    }

    isDeleted() {
        return this.currentState === pState.DELETED;
    }

    static fromBuffer(buffer) {
        return Peralatan.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Peralatan);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, no_rangka, pelat_pabrik_pembuatnya, pelat_nomor, tulisan, penghapus_kaca_dapan, klakson, kaca_spion, pandangan_ke_depan, kaca_penawar_sinar, alat_pengendalian, lampu_indikasi, speedometer, perlangkapan, notes, status) {
        return new Peralatan({ no_pemeriksaan, no_kendaraan,no_rangka, pelat_pabrik_pembuatnya, pelat_nomor, tulisan, penghapus_kaca_dapan, klakson, kaca_spion, pandangan_ke_depan, kaca_penawar_sinar, alat_pengendalian, lampu_indikasi, speedometer, perlangkapan, notes, status});
    }

    static getClass() {
        return 'org.prodence.peralatan';
    }

}

module.exports = Peralatan;
