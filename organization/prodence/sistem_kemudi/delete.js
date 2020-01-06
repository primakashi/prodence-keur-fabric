'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const convert = require('../../../backend/helper');
const Sistem_kemudi = require('../contract/sistem_kemudi/lib/sistem_kemudi.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const PosSistem_kemudi = () => {};

PosSistem_kemudi.deleteSistem_kemudi = (data, result) =>{
    async function main() {
        const gateway = new Gateway();
        try {
            const userName = 'User1@org1.prodence.com';
            let connectionProfile = yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
            let connectionOptions = {
                identity: userName,
                wallet: wallet,
                discovery: { enabled:false, asLocalhost: true }
            };
            await gateway.connect(connectionProfile, connectionOptions);
            const network = await gateway.getNetwork('mychannel');
            const contract = await network.getContract('sistem_kemudicontract');
            const issueResponse = await contract.submitTransaction('delete', data.no_pemeriksaan, data.no_kendaraan);
            let sistem_kemudi = Sistem_kemudi.fromBuffer(issueResponse);

            delete sistem_kemudi.class;
            delete sistem_kemudi.key;

            sistem_kemudi.roda_kemudi = convert.convertToBool(sistem_kemudi.roda_kemudi);
            sistem_kemudi.speling_roda_kemudi = convert.convertToBool(sistem_kemudi.speling_roda_kemudi);
            sistem_kemudi.batang_kemudi = convert.convertToBool(sistem_kemudi.batang_kemudi);
            sistem_kemudi.roda_gigi_kemudi = convert.convertToBool(sistem_kemudi.roda_gigi_kemudi);
            sistem_kemudi.sambungan_kemudi = convert.convertToBool(sistem_kemudi.sambungan_kemudi);
            sistem_kemudi.penyambung_sendi_peluru = convert.convertToBool(sistem_kemudi.penyambung_sendi_peluru);
            sistem_kemudi.power_steering = convert.convertToBool(sistem_kemudi.power_steering);
            sistem_kemudi.slide_slip = convert.convertToBool(sistem_kemudi.slide_slip);

            result(null, {data : sistem_kemudi});

            console.log(sistem_kemudi);

        } catch (error) {

            result(true, null);

            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);

        } finally {

            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.');
            gateway.disconnect();

        }

    }

    main().then(() => {

        console.log('Issue program complete.');

    }).catch((e) => {
        result(true, null);

        console.log('Issue program exception.');
        console.log(e);
        console.log(e.stack);
        process.exit(-1);

    });
};

module.exports = PosSistem_kemudi;