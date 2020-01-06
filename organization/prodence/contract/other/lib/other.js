'use strict';

const State = require('../ledger-api/state');

const pState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

class Other extends State {
    constructor(obj) {
        super(Other.getClass(), [obj.no_pemeriksaan, obj.no_kendaraan]);
        Object.assign(this, obj);
    }

    getKendaraa() {
        return this.obj;
    }

    getNoKendaraan() {
        return this.no_kendaraan;
    }

    getPemeriksaan() {
        return this.no_pemeriksaan;
    }

    setOther(newSistemBahanBakar, newSistemKelistrikan, newNotes, newStatus) {
        this.sistem_bahan_bakar = newSistemBahanBakar;
        this.sistem_kelistrikan = newSistemKelistrikan;
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
        return Other.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, Other);
    }

    static createInstance(no_pemeriksaan, no_kendaraan, sistem_bahan_bakar, sistem_kelistrikan, notes, status) {
        return new Other({ no_pemeriksaan, no_kendaraan,sistem_bahan_bakar, sistem_kelistrikan, notes, status});
    }

    static getClass() {
        return 'org.prodence.other';
    }

}

module.exports = Other;
