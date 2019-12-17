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

Vehicle.deleteVehicle = (data, result) =>{
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
            console.log('Connect to Fabric gateway.');
            await gateway.connect(connectionProfile, connectionOptions);

            console.log('Use network channel: mychannel.');
            const network = await gateway.getNetwork('mychannel');

            console.log('Use org.prodence.kendaraan smart contract.');
            const contract = await network.getContract('kendaraancontract');

            console.log('Submit commercial paper redeem transaction.');
            const redeemResponse = await contract.submitTransaction('delete', data.no_stnk, data.no_kendaraan, data.no_ktp);

            console.log('Process redeem transaction response.');

            let kendaraan = Kendaraan.fromBuffer(redeemResponse);
            delete kendaraan.class;
            delete kendaraan.key;
            delete kendaraan.currentState;

            result(null, {data : kendaraan});

            console.log(`${kendaraan.no_stnl} commercial paper : ${kendaraan.no_kendaraan} successfully redeemed with ${kendaraan.no_ktp}`);
            console.log('Transaction complete.');

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

        console.log('Redeem program complete.');

    }).catch((e) => {
        result(true, null);

        console.log('Redeem program exception.');
        console.log(e);
        console.log(e.stack);
        process.exit(-1);

    });
}

module.exports = Vehicle;