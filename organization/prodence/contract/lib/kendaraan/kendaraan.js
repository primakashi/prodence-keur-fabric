/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../../ledger-api/state.js');

// Enumerate commercial paper state values
const cpState = {
    CREATED: 1,
    UPDATED: 2,
    DELETED: 3
};

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class ProdenceKeur extends State {

    constructor(obj) {
        super(ProdenceKeur.getClass(), [obj.issuer, obj.stuk]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    setCreatedData() {
        this.currentState = cpState.CREATED;
    }

    setUpdateData() {
        this.currentState = cpState.UPDATED;
    }

    setDeleteData() {
        this.currentState = cpState.DELETED;
    }

    isCreateData() {
        return this.currentState === cpState.CREATED;
    }

    isUpdateData() {
        return this.currentState === cpState.UPDATED;
    }

    isDeleteData() {
        return this.currentState === cpState.DELETED;
    }

    static fromBuffer(buffer) {
        return ProdenceKeur.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, ProdenceKeur);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(stuk, no_ktp, no_bkpb, no_stnk, no_mesin, no_rangka, no_ijin_trayek, no_uji_tipe, no_kir) {
        return new ProdenceKeur({ stuk, no_ktp, no_bkpb, no_stnk, no_mesin, no_rangka, no_ijin_trayek, no_uji_tipe, no_kir});
    }

    static getClass() {
        return 'org.papernet.prodencekeur';
    }
}

module.exports = ProdenceKeur;
