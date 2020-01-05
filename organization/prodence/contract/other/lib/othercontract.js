'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Other = require('./other');
const OtherList = require('./otherlist');

class OtherContext extends Context {

    constructor() {
        super();
        this.otherList = new OtherList(this);
    }

}

class OtherContract extends Contract {

    constructor() {
        super('org.prodence.other');
    }

    createContext() {
        return new OtherContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async get(ctx, no_pemeriksaan, no_kendaraan) {
        let otherKey = Other.makeKey([no_pemeriksaan, no_kendaraan]);
        let other = await ctx.otherList.getOther(otherKey);
        return other;
    }

    async create(ctx, no_pemeriksaan, no_kendaraan, sistem_bahan_bakar, sistem_kelistrikan, notes, status) {
        let other = Other.createInstance(no_pemeriksaan, no_kendaraan, sistem_bahan_bakar, sistem_kelistrikan, notes, status);
        other.setCreated();
        await ctx.otherList.addOther(other);
        return other;
    }

    async update(ctx, no_pemeriksaan, no_kendaraan,newSistemBahanBakar, newSistemKelistrikan, newNotes, newStatus) {
        let otherKey = Other.makeKey([no_pemeriksaan, no_kendaraan]);
        let other = await ctx.otherList.getOther(otherKey);
        if (other.getPemeriksaan() !== no_pemeriksaan) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' is not exist');
        }
        if (other.isCreated()) {
            other.setUpdated();
        }
        if (other.isUpdated()) {
            other.setOther(newSistemBahanBakar, newSistemKelistrikan, newNotes, newStatus);
        } else {
            throw new Error('Pemeriksaan ' + no_pemeriksaan +  ' is cant be updated. Current state = ' + other.getCurrentState());
        }
        await ctx.otherList.updateOther(other);
        return other;
    }

    async delete(ctx, no_pemeriksaan, no_kendaraan,) {
        let otherKey = Other.makeKey([no_pemeriksaan, no_kendaraan]);
        let other = await ctx.otherList.getOther(otherKey);
        if (other.isDeleted()) {
            throw new Error('Pemeriksaan ' + no_pemeriksaan + ' already redeemed');
        }
        if (other.getPemeriksaan() === no_pemeriksaan) {
            other.setDeleted();
        } else {
            throw new Error('Redeeming owner does not own other' + no_pemeriksaan + no_kendaraan);
        }
        await ctx.otherList.updateOther(other);
        return other;
    }

}

module.exports = OtherContract;
