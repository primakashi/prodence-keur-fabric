'use strict';
const StateList = require('./../ledger-api/statelist.js');

const BodyFrame = require('./bodyframe.js');

class BodyFrameList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.prodence.bodyframelist');
        this.use(BodyFrame);
    }

    async addBodyFrame(bodyframe) {
        return this.addState(bodyframe);
    }

    async getBodyFrame(bodyframeKey) {
        return this.getState(bodyframeKey);
    }

    async updateBodyFrame(bodyframe) {
        return this.updateState(bodyframe);
    }
}

module.exports = BodyFrameList;