'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Kendaraan = require('../contract/kendaraan/lib/kendaraan.js');
const path = require('path');
let yamlPath =  path.resolve(__dirname,'../gateway/networkConnection.yaml');
let walletPath =  path.resolve(__dirname,'../identity/user/adminkeur/wallet');

const wallet = new FileSystemWallet(walletPath);
const Vehicle = () => {};

Vehicle.createVehicle = (data, result) =>{
    // Main program function
    async function main () {
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
            const contract = await network.getContract('kendaraancontract');
            const updateResponse = await contract.submitTransaction('update', data.no_stnk,data.no_kendaraan,data.no_ktp,data.no_ktp_baru,data.nama_pemilik,data.alamat_garasi);
            let kendaraan = Kendaraan.fromBuffer(updateResponse);

            delete kendaraan.class;
            delete kendaraan.key;
            delete kendaraan.currentState;

            result(null, {data : kendaraan});

            console.log(kendaraan);

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

        console.log('Buy program complete.');

    }).catch((e) => {
        result(true, null);

        console.log('Buy program exception.');
        console.log(e);
        console.log(e.stack);
        process.exit(-1);

    });
};

module.exports = Vehicle;